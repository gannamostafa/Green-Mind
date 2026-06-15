"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import NotificationBell from "@/components/NotificationBell";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/AuthContext";
import Sidebar from "@/app/_components/Sidebar";
import { toast } from "sonner";
import { storage } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AiScanPage() {
  const { user, userData, loading, updateUserData } = useAuth();
  const router = useRouter();

  const [recentScans, setRecentScans] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);
  const [aiStatus, setAiStatus] = useState("unknown");

  // 🔐 Route Protection
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  // Load album from userData (Firestore) or fallback to localStorage
  useEffect(() => {
    if (loading) return;
    try {
      if (userData && userData.progress && Array.isArray(userData.progress.album)) {
        // Prefer server-stored album tied to the active child
        setRecentScans(userData.progress.album);
        // also sync to localStorage for offline fallback
        localStorage.setItem("album", JSON.stringify(userData.progress.album));
      } else {
        const saved = JSON.parse(localStorage.getItem("album") || "[]");
        setRecentScans(saved);
      }
    } catch (e) {
      console.error("Error loading album:", e);
      const saved = JSON.parse(localStorage.getItem("album") || "[]");
      setRecentScans(saved);
    }
  }, [loading, userData]);

  // Migrate any blob: URLs in localStorage album to Firebase Storage (best-effort)
  useEffect(() => {
    if (loading || !user) return;
    const migrate = async () => {
      try {
        const local = JSON.parse(localStorage.getItem("album") || "[]");
        if (!Array.isArray(local) || local.length === 0) return;

        let changed = false;
        const updated = [...local];

        for (let i = 0; i < updated.length; i++) {
          const item = updated[i];
          const img = item?.image || "";

          // If already a remote URL (http/https), nothing to migrate
          if (typeof img === "string" && (img.startsWith("http:") || img.startsWith("https:"))) continue;

          // Blob or data URLs are not reliably fetchable across sessions.
          // Skip migration for these to avoid network errors; they will remain in localStorage
          // until the original client session can perform an explicit upload.
          if (typeof img === "string" && (img.startsWith("blob:") || img.startsWith("data:"))) {
            console.info("Skipping migration for non-fetchable image URL:", img);
            continue;
          }

          // Other unexpected formats — attempt best-effort fetch/upload
          try {
            const res = await fetch(img);
            if (!res.ok) {
              console.warn("Skipping migration, fetch failed for:", img);
              continue;
            }
            const blob = await res.blob();
            const fileName = `migrated_${Date.now()}_${i}.png`;
            const path = `users/${user.uid}/album/${fileName}`;
            const sRef = storageRef(storage, path);
            const snap = await uploadBytes(sRef, blob);
            const downloadUrl = await getDownloadURL(snap.ref);
            updated[i] = { ...item, image: downloadUrl };
            changed = true;
          } catch (err) {
            console.error("Failed migrating image (skipped):", err);
          }
        }

        if (changed) {
          localStorage.setItem("album", JSON.stringify(updated));
          // persist to Firestore under active child's progress.album
          if (updateUserData && userData) {
            await updateUserData({ progress: { ...userData.progress, album: updated } });
            setRecentScans(updated);
          }
        }
      } catch (e) {
        console.error("Migration error:", e);
      }
    };
    migrate();
  }, [loading, user, updateUserData, userData]);

  // Check AI server status
  useEffect(() => {
    const checkAI = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/", { method: "GET" });
        setAiStatus(res.ok ? "online" : "offline");
      } catch {
        setAiStatus("offline");
      }
    };
    checkAI();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await scanImage(file);
  };

  const scanImage = async (file) => {
    setIsLoading(true);
    const previewUrl = URL.createObjectURL(file);

    try {
      // 1) Call AI predict endpoint first (fast response path).
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);
      const predictForm = new FormData();
      predictForm.append("image", file);

      const predictRes = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: predictForm,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!predictRes.ok) {
        let errDetail = "Server error";
        try {
          const j = await predictRes.json();
          errDetail = j.detail || j.message || errDetail;
        } catch {
          // ignore malformed response body from predict endpoint
        }
        throw new Error(errDetail);
      }

      const data = await predictRes.json();

      const newItem = {
        id: Date.now(),
        image: previewUrl,
        result: {
          title: data.title,
          description: data.description,
          advice: data.advice,
        },
        date: new Date().toLocaleString(),
      };

      setRecentScans((prev) => {
        const updated = [newItem, ...prev];
        localStorage.setItem("album", JSON.stringify(updated));
        if (updateUserData && userData) {
          updateUserData({ progress: { ...userData.progress, album: updated } })
            .catch((err) => console.error("Error saving album to Firestore:", err));
        }
        return updated;
      });

      if (userData) {
        const currentProgress = userData.progress || {
          scansCount: 0,
          lessonsCompleted: [],
          quizScores: {},
          gamesProgress: { puzzle: 0, memory: 0, sundew_vally: 0 },
          treeLevel: 1,
          weeklyProgress: [0, 0, 0, 0, 0, 0, 0],
          xp: 0
        };

        const newScansCount = (currentProgress.scansCount || 0) + 1;
        const xpGained = 20;
        const currentXp = currentProgress.xp || 0;
        const newXp = currentXp + xpGained;
        const newTreeLevel = Math.min(5, Math.floor(newXp / 100) + 1);
        const todayIndex = new Date().getDay();
        const newWeeklyProgress = [...(currentProgress.weeklyProgress || [0, 0, 0, 0, 0, 0, 0])];
        newWeeklyProgress[todayIndex] = Math.min(100, (newWeeklyProgress[todayIndex] || 0) + 10);

        await updateUserData({
          progress: {
            ...currentProgress,
            scansCount: newScansCount,
            xp: newXp,
            treeLevel: newTreeLevel,
            weeklyProgress: newWeeklyProgress
          }
        });
      }

      setAiStatus("online");
      toast.success("Plant identified! 🌿");

      if (user) {
        (async () => {
          try {
            const path = `users/${user.uid}/album/${Date.now()}_${file.name}`;
            const sRef = storageRef(storage, path);
            const snapshot = await uploadBytes(sRef, file);
            const finalUrl = await getDownloadURL(snapshot.ref);

            const current = JSON.parse(localStorage.getItem("album") || "[]");
            const replaced = current.map((it) =>
              it.id === newItem.id ? { ...it, image: finalUrl } : it
            );
            localStorage.setItem("album", JSON.stringify(replaced));
            setRecentScans(replaced);
            if (updateUserData && userData) {
              await updateUserData({ progress: { ...userData.progress, album: replaced } });
            }
          } catch (uploadErr) {
            console.error("Firebase background upload failed:", uploadErr);
          }
        })();
      }

    } catch (err) {
      console.error(err);
      const errMsg = err.message?.includes("fetch")
        ? "❌ Cannot connect to AI server. Make sure it's running on port 8000."
        : `❌ Error: ${err.message}`;
      console.warn(errMsg);
      setAiStatus("offline");
      toast.error("Scanning failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) return null;

  return (
    <div
      className="w-full min-h-screen flex bg-cover bg-center relative"
      style={{ backgroundImage: "url('/SCreen/growth.png')" }}
    >
     
      <div className="relative z-10 flex w-full h-screen">
        <Sidebar />

        {/* Main Section */}
        <div className="flex-1 p-6 overflow-y-auto h-full">
          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow relative z-[999]">
            <Link href="/" className="hover:text-green-600 transition">Home</Link>
            
            <NotificationBell />

            <div className="relative">
              <IoSettingsOutline
                className="text-2xl cursor-pointer hover:rotate-90 transition"
                onClick={() => setOpenDropdown(!openDropdown)}
              />
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => { setShowLogoutPopup(true); setOpenDropdown(false); }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                  >
                    <IoLogOutOutline /> Logout
                  </button>
                </div>
              )}
            </div>

            <Image 
              src={userData?.avatar || "/SCreen/cute.png"} 
              width={45} 
              height={45} 
              alt="avatar" 
              className="rounded-full border-2 border-green-400 object-cover h-[45px] w-[45px]" 
            />
          </div>

          <h1 className="text-2xl font-bold text-center mb-4">AI Plant Scan 🌱</h1>

          {/* AI Status Banner */}
          <div className={`text-center text-sm mb-6 py-2 px-4 rounded-xl font-medium ${
            aiStatus === "online" ? "bg-green-100 text-green-700" :
            aiStatus === "offline" ? "bg-red-100 text-red-700" :
            "bg-gray-100 text-gray-500"
          }`}>
            {aiStatus === "online" && "🟢 AI Server is ready"}
            {aiStatus === "offline" && "🔴 AI Server is offline — Please run the Python server"}
            {aiStatus === "unknown" && "⏳ Checking status..."}
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 flex flex-col items-center mb-10 relative">
             <Image src="/SCreen/camera-ai.png" width={100} height={100} alt="camera" className="mb-4" />
             <p className="text-gray-500 mb-6">Upload a photo to identify your plant</p>
             
             <label className={`px-10 py-4 rounded-2xl font-bold text-white transition shadow-lg ${
               isLoading || aiStatus === "offline" ? "bg-gray-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:scale-105"
             }`}>
               {isLoading ? "Analyzing..." : "Pick a Photo"}
               <input type="file" hidden accept="image/*" onChange={handleUpload} disabled={isLoading || aiStatus === "offline"} />
             </label>
          </div>

          {/* Recent Album */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h3 className="font-bold mb-6">Your Recent Scans</h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentScans.map((item) => (
                <div key={item.id} onClick={() => setSelectedScan(item)} className="flex-shrink-0 cursor-pointer group">
                  {typeof item.image === "string" && (item.image.startsWith("http:") || item.image.startsWith("https:")) ? (
                    <Image src={item.image} width={96} height={96} alt={item.result?.title || "Plant scan"} className="rounded-2xl border-2 border-transparent group-hover:border-green-500 transition" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image} alt={item.result?.title || "Plant scan"} className="w-24 h-24 object-cover rounded-2xl border-2 border-transparent group-hover:border-green-500 transition" />
                  )}
                  <p className="text-[10px] text-center mt-1 text-gray-500 truncate w-24">{item.result.title}</p>
                </div>
              ))}
              {recentScans.length === 0 && <p className="text-gray-400">No photos yet.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Result Popup */}
      {selectedScan && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-6 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[40px] max-w-md w-full relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedScan(null)} className="absolute top-4 right-6 text-2xl">✕</button>
            {typeof selectedScan.image === "string" && (selectedScan.image.startsWith("http:") || selectedScan.image.startsWith("https:")) ? (
              <Image src={selectedScan.image} width={640} height={320} alt={selectedScan.result?.title || "Plant scan"} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-md" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedScan.image} alt={selectedScan.result?.title || "Plant scan"} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-md" />
            )}
            <h2 className="text-2xl font-bold text-green-700 mb-2">{selectedScan.result.title}</h2>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{selectedScan.result.description}</p>
            <div className="bg-green-50 p-4 rounded-2xl">
              <p className="font-bold text-green-800 mb-2 text-sm">Advice:</p>
              <ul className="text-xs text-green-700 space-y-1">
                {Array.isArray(selectedScan.result.advice) ? selectedScan.result.advice.map((a, i) => <li key={i}>• {a}</li>) : <li>• {selectedScan.result.advice}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[1000]">
          <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-[480px] text-center relative">
            <div className="flex justify-center mb-4"><Image src="/SCreen/Group 45.png" width={120} height={120} alt="character" className="animate-bounce" /></div>
            <h2 className="text-3xl font-bold text-green-700 mb-3">Logout?</h2>
            <div className="flex justify-center gap-6 mt-8">
              <button onClick={handleLogout} className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold">Yes</button>
              <button onClick={() => setShowLogoutPopup(false)} className="bg-gray-200 px-8 py-3 rounded-xl font-bold">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}