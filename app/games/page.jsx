"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function GamesPage() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      className="w-full min-h-screen flex bg-cover bg-center relative"
      style={{ backgroundImage: "url('/SCreen/back-gam.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/40 z-0"></div>

      {/* Page Content */}
      <div className="relative z-10 flex w-full h-screen">
        {/* Sidebar */}
        <div className="w-[350px] h-full bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-9">
            <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
            <h2 className="text-xl font-semibold">Green Mind</h2>
          </div>

          <div className="flex flex-col gap-5">
            <MenuItem
              title="Dashboard"
              icon="/SCreen/dash.png"
              href="/dashboard"
            />
            <MenuItem
              title="Lessons"
              icon="/SCreen/start lesson.png"
              href="/lessons"
            />
            <MenuItem
              title="Games"
              icon="/SCreen/games.png"
              href="/games"
              active
            />
            <MenuItem title="AI Scan" icon="/SCreen/ai.png" href="/ai-scan" />
            <MenuItem
              title="Tree Growth"
              icon="/SCreen/tree-gro.png"
              href="/growth"
            />
            <MenuItem title="Album" icon="/SCreen/album.png" href="/album" />
          </div>
        </div>

        {/* Main Content (Scrollable) */}
        <div className="flex-1 p-6 overflow-y-auto h-full">
          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow relative z-[999]">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>

            <IoNotificationsOutline className="text-2xl cursor-pointer hover:text-green-600 transition" />

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
          <h1 className="text-2xl font-semibold text-center mb-6">Games</h1>

          {/* Banner */}
          <div className="bg-[#7a4a00] text-white text-center py-6 px-12 rounded-3xl mb-12 text-xl font-semibold max-w-4xl mx-auto shadow-xl">
            Choose A Fun Eco-Friendly Game And Earn XP To Grow Your Tree
          </div>

          {/* Games Cards */}
          <div className="flex flex-col items-center gap-10 pb-20">
            {/* Top Cards */}
            <div className="flex flex-wrap justify-center gap-8">
              {/* Puzzle */}
              <div
                onClick={() =>
                  window.open("/puzzle-game-main/start2.html", "_blank")
                }
                className="bg-[#00AEEF] w-[480px] h-[360px] rounded-3xl shadow-xl flex flex-col items-center justify-center gap-6 hover:scale-105 transition cursor-pointer"
              >
                <Image
                  src="/SCreen/puzzel.png"
                  width={300}
                  height={140}
                  alt="Puzzle"
                />
                <span className="text-white text-2xl font-semibold">
                  Puzzle
                </span>
              </div>

              {/* Memory */}
              <Link href="othergames/start.html" target="_blank">
              <div className="bg-[#FF6F6F] w-[480px] h-[360px] rounded-3xl shadow-xl flex flex-col items-center justify-center gap-6 hover:scale-105 transition cursor-pointer">
                <div className="flex gap-4">
                  <Image
                    src="/SCreen/tree-memory.png"
                    width={180}
                    height={80}
                    alt="Memory"
                  />
                  <Image
                    src="/SCreen/tree-me2.png"
                    width={180}
                    height={80}
                    alt="Memory"
                  />
                </div>
                <span className="text-white text-2xl font-semibold">
                  Memory Card
                </span>
              </div>
              </Link>
            </div>

            {/* Awareness Farm */}
            <Link href="SundewValley-master-main/index.html" target="_blank">
              <div className="bg-[#57D93F] w-[720px] h-[260px] rounded-3xl shadow-xl flex flex-col items-center justify-center gap-6 hover:scale-105 transition cursor-pointer">
                <Image
                  src="/SCreen/farm-ge.png"
                  width={240}
                  height={140}
                  alt="Farm"
                />
                <span className="text-white text-3xl font-semibold tracking-wide">
                  Sundew Valley
                </span>
              </div>
            </Link>
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
              0%,
              100% {
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

/* Menu Item */
function MenuItem({ title, icon, active, href }) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-3 rounded-xl cursor-pointer text-sm flex items-center gap-3 transition
        ${
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
