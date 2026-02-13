"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoNotificationsOutline, IoSettingsOutline, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

// Sidebar MenuItem Component
function MenuItem({ title, icon, href, active }) {
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

export default function LessonsPage() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // ✅ Added
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const lessons = [
    {
      title: "Recycling Basics",
      level: "Level 1 - 2 Min",
      img: "/screen/recycle1.png",
      button: "Continue",
      video: "https://www.youtube.com/embed/FpOWG4GDvx4",
    },
    {
      title: "Recycling Basics",
      level: "Level 1 - 2 Min",
      img: "/screen/recycle2.png",
      button: "Continue",
      video: "https://www.youtube.com/embed/V_1vpEEnXW0",
    },
    {
      title: "Recycling Basics",
      level: "Level 1 - 2 Min",
      img: "/SCreen/recycle3.jpg",
      button: "Continue",
      video: "https://www.youtube.com/embed/aLY46g18hWk",
    },
    {
      title: "Parts of Plant",
      level: "Level 2 - 4 Min",
      img: "/SCreen/recycle4.jpg",
      button: "Start Lesson",
      video: "https://www.youtube.com/embed/tNbTppAbEVc",
    },
    {
      title: "Parts of Plant",
      level: "Level 2 - 4 Min",
      img: "/SCreen/recycle5.jpg",
      button: "Start Lesson",
      video: "https://www.youtube.com/embed/AltruHFIBAQ",
    },
    {
      title: "Parts of Plant",
      level: "Level 2 - 4 Min",
      img: "/screen/boy-girl.png",
      button: "Start Lesson",
      video: "https://www.youtube.com/embed/VIDEO4",
    },
  ];

  return (
    <div className="w-full min-h-screen flex bg-[#F5F5F5] relative">
      {/* Blur Background */}
      <div className="absolute inset-0 backdrop-blur-md z-0"></div>

      <div className="relative z-10 flex w-full h-screen">
        {/* ================= Sidebar ================= */}
        <div className="w-[350px] h-full bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
            <h2 className="text-xl font-semibold">Green Mind</h2>
          </div>

          <div className="flex flex-col gap-5">
            <MenuItem title="Dashboard" icon="/SCreen/dash.png" href="/dashboard" />
            <MenuItem title="Lessons" icon="/SCreen/start lesson.png" href="/lessons" active />
            <MenuItem title="Games" icon="/SCreen/games.png" href="/games" />
            <MenuItem title="AI Scan" icon="/SCreen/ai.png" href="/ai-scan" />
            <MenuItem title="Tree Growth" icon="/SCreen/tree-gro.png" href="/growth" />
            <MenuItem title="Album" icon="/SCreen/album.png" href="/album" />
          </div>
        </div>

        {/* ================= Main ================= */}
        <div className={`${poppins.className} flex-1 p-6 overflow-y-auto h-full`}>
          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow relative z-[999]">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>

            <IoNotificationsOutline className="text-2xl cursor-pointer" />

           {/* ====== Settings Dropdown ====== */}
            <div className="relative">
              <IoSettingsOutline
                className="text-2xl cursor-pointer hover:rotate-90 transition"
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              {openDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-50">
                  

                  {/* ✅ زرار Logout يفتح البوب أب */}
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
          <h1 className="text-3xl font-semibold mb-4 text-center">Lessons</h1>

          <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lessons.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-3 hover:shadow-md transition">
                <Image
                  src={item.img}
                  width={200}
                  height={200}
                  className="w-full h-[170px] object-cover rounded-2xl"
                  alt={item.title}
                />

                <div className="text-center mt-3">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.level}</p>

                  <Link
                    href={`/lesson-page?video=${encodeURIComponent(item.video)}&title=${encodeURIComponent(item.title)}&level=${encodeURIComponent(item.level)}`}
                    className="mt-3 px-5 py-2 rounded-2xl font-medium inline-block text-white text-[18px] bg-[#3EF772] hover:bg-green-500 transition"
                  >
                    {item.button}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= LOGOUT POPUP ================= */}
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

          {/* حركة للكائن الأخضر */}
          <style jsx global>{`
            @keyframes bounce {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            .animate-bounce-fast {
              animation: bounce 1s infinite;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
