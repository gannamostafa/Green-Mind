"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function AiScanPage() {
  /* ================= States ================= */
  const [recentScans, setRecentScans] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);

  /* ================= Load Album ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("album")) || [];
    setRecentScans(saved);
  }, []);

  /* ================= Upload ================= */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await scanImage(file);
  };

  /* ================= AI ================= */
  const scanImage = async (file) => {
    try {
      setLoading(true);

      const url = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail);

      const newItem = {
        id: Date.now(),
        image: url,
        result: {
          title: data.title,
          description: data.description,
          advice: data.advice,
        },
        date: new Date().toLocaleString(),
      };

      /* ✅ FIX HERE */
      setRecentScans((prev) => {
        const updated = [newItem, ...prev];
        localStorage.setItem("album", JSON.stringify(updated));
        return updated;
      });

      const aiMessage = `
🌿 Disease: ${data.title}

📌 Description:
${data.description}

✅ Advice:
${data.advice.join(" • ")}
`;

      setChat((prev) => [...prev, { user: "ai", text: aiMessage }]);
    } catch (err) {
      console.log(err);

      setChat((prev) => [
        ...prev,
        { user: "ai", text: "❌ Error connecting to AI model." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= Chat ================= */
  const sendMessage = () => {
    if (!message.trim()) return;

    setChat((prev) => [
      ...prev,
      { user: "child", text: message },
      { user: "ai", text: "🌱 Upload a plant image to analyze it!" },
    ]);

    setMessage("");
  };

  /* ================= Logout ================= */
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="w-full min-h-screen flex bg-[#F5F5F5] relative">
      <div className="absolute inset-0 backdrop-blur-md z-0"></div>

      <div className="relative z-10 flex w-full h-screen">
        {/* Sidebar */}
        <div className="w-[350px] h-full bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
            <h2 className="text-xl font-semibold">Green Mind</h2>
          </div>

          <div className="flex flex-col gap-5">
            <MenuItem title="Dashboard" icon="/SCreen/dash.png" href="/dashboard" />
            <MenuItem
              title="Lessons"
              icon="/SCreen/start lesson.png"
              href="/lessons"
            />
            <MenuItem title="Games" icon="/SCreen/games.png" href="/games" />
            <MenuItem
              title="AI Scan"
              icon="/SCreen/ai.png"
              href="/ai-scan"
              active
            />
            <MenuItem
              title="Tree Growth"
              icon="/SCreen/tree-gro.png"
              href="/growth"
            />
            <MenuItem title="Album" icon="/SCreen/album.png" href="/album" />
          </div>
        </div>

        {/* Main Section */}
        <div className="flex-1 p-6 overflow-y-auto h-full">
          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow relative z-[999]">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>

            <IoNotificationsOutline className="text-2xl cursor-pointer hover:text-green-600 transition" />

            {/* Dropdown */}
            <div className="relative">
              <IoSettingsOutline
                className="text-2xl cursor-pointer hover:rotate-90 transition"
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              {openDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
                  <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <IoLogOutOutline />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Image
              src="/SCreen/cute.png"
              width={45}
              height={45}
              alt="avatar"
              className="rounded-full"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-6">
            AI Plant Scan 🌱
          </h1>

          {/* Upload Section */}
          <div className="relative flex flex-col items-center mb-12">
            <Image
              src="/SCreen/Group 45.png"
              width={190}
              height={190}
              alt="green character"
              className="absolute -top-[110px] right-[120px] opacity-90 z-0 animate-bounce-fast"
            />

            <div className="bg-[#EFFFF4] border-4 border-dashed border-green-600 rounded-3xl p-12 flex flex-col items-center text-center w-[70%] shadow relative z-20">
              <Image
                src="/SCreen/camera-ai.png"
                width={80}
                height={80}
                alt="camera"
              />

              <p className="mt-3 text-gray-600">Upload Plant Photo</p>

              <label className="mt-3 bg-green-600 text-white px-6 py-2 rounded-xl cursor-pointer hover:scale-105 transition">
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>

              {loading && (
                <p className="mt-3 text-green-700">Scanning... ⏳</p>
              )}
            </div>
          </div>

          {/* Chat Section */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-10">
            <h3 className="font-semibold mb-4">Talk With AI 🤖</h3>

            <div className="h-[220px] overflow-y-auto border rounded-xl p-3 mb-3 space-y-2">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm max-w-[75%] ${
                    msg.user === "child"
                      ? "bg-green-100 ml-auto"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-xl p-2 focus:outline-none"
                placeholder="Ask about plants..."
              />

              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-4 rounded-xl hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>

          {/* Recent Section */}
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h3 className="font-semibold mb-4">Recent Plants</h3>

            <div className="flex gap-4 flex-wrap">
              {recentScans.slice(0, 4).map((item) => (
                <Image
                  key={item.id}
                  src={item.image}
                  width={90}
                  height={70}
                  className="rounded-xl cursor-pointer"
                  alt="plant"
                  onClick={() => setSelectedScan(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {selectedScan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-8 rounded-3xl max-w-[500px] w-full relative">
            <button
              onClick={() => setSelectedScan(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ✖
            </button>

            <Image
              src={selectedScan.image}
              width={300}
              height={200}
              className="rounded-xl mx-auto"
              alt="plant"
            />

            <h2 className="text-xl font-bold mt-4 text-center">
              {selectedScan.result.title}
            </h2>

            <p className="mt-2 text-gray-600 text-sm">
              {selectedScan.result.description}
            </p>

            <ul className="mt-3 list-disc pl-5 text-sm">
              {selectedScan.result.advice.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            <p className="text-xs mt-3 text-gray-400 text-center">
              {selectedScan.date}
            </p>
          </div>
        </div>
      )}

      {/* Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[1000]">
          <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-[480px] text-center relative">
            <div className="flex justify-center mb-4">
              <Image
                src="/SCreen/Group 45.png"
                width={120}
                height={120}
                alt="green character"
                className="animate-bounce-fast"
              />
            </div>

            <h2 className="text-3xl font-bold text-green-700 mb-3">
              Are you sure you want to logout?
            </h2>

            <p className="text-gray-600 mb-8">
              You’ll be redirected to the login page.
            </p>

            <div className="flex justify-center gap-6">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-medium text-lg"
              >
                Yes, Logout
              </button>

              <button
                onClick={() => setShowLogoutPopup(false)}
                className="bg-gray-300 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-400 transition font-medium text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Menu Component */
function MenuItem({ title, icon, active, href }) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-3 rounded-xl flex items-center gap-3 text-sm transition ${
          active
            ? "bg-green-500 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Image src={icon} width={26} height={26} alt={title} />
        {title}
      </div>
    </Link>
  );
}
 