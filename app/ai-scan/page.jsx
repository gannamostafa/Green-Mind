"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function AiScanPage() {
  /* ================= States ================= */
  const [image, setImage] = useState(null);
  const [recentScans, setRecentScans] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  /* ================= Load Album ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("album")) || [];
    setRecentScans(saved);
  }, []);

  /* ================= Upload Image ================= */
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newAlbum = [url, ...recentScans];

    setImage(url);
    setRecentScans(newAlbum);
    localStorage.setItem("album", JSON.stringify(newAlbum));
  };

  /* ================= Send Chat ================= */
  const sendMessage = () => {
    if (!message.trim()) return;

    const newChat = [
      ...chat,
      { user: "child", text: message },
      { user: "ai", text: "Good job! 🌱 Keep learning about plants!" },
    ];

    setChat(newChat);
    setMessage("");
  };

  return (
    <div className="w-full min-h-screen flex bg-[#F5F5F5] relative">
      {/* Blur */}
      <div className="absolute inset-0 backdrop-blur-md z-0"></div>

      <div className="relative z-10 flex w-full h-screen">
        {/* ================= Sidebar ================= */}
        <div className="w-[350px] h-full bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
            <h2 className="text-xl font-semibold">Green Mind</h2>
          </div>

          <div className="flex flex-col gap-5">
            <MenuItem title="Dashboard" icon="/SCreen/dash.png" href="/child" />
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

        {/* ================= Main ================= */}
        <div className="flex-1 p-6 overflow-y-auto h-full">
          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow relative z-[999]">
            <Link href="/landing" className="hover:text-green-600 transition">
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
                  <Link
                    href="/parent/edit-profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <IoPersonOutline />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    <IoSettingsOutline />
                    Settings
                  </Link>

                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
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

          {/* ================= Title ================= */}
          <h1 className="text-2xl font-semibold text-center mb-6">
            AI Plant Scan 🌱
          </h1>

          {/* ================= Upload ================= */}
          <div className="relative flex flex-col items-center mb-12">
            {/* Upload Box */}
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
            </div>

            {/* Green Character */}
            <Image
              src="/SCreen/Group 45.png"
              width={190}
              height={190}
              alt="green character"
              className="absolute -top-[110px] right-[120px] z-10"
            />
          </div>

          {/* ================= Chat ================= */}
          <div className="bg-white rounded-3xl shadow-md p-6 mb-10">
            <h3 className="font-semibold mb-4">Talk With AI 🤖</h3>

            <div className="h-[200px] overflow-y-auto border rounded-xl p-3 mb-3 space-y-2">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl text-sm w-fit max-w-[70%] ${
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
                placeholder="Ask about plants..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                onClick={sendMessage}
                className="bg-green-600 text-white px-4 rounded-xl hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>

          {/* ================= Bottom ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {/* XP */}
            <div className="bg-white rounded-3xl shadow-md p-8 flex items-center gap-5">
              <Image
                src="/SCreen/tree.png"
                width={120}
                height={90}
                alt="tree"
              />

              <div>
                <h3 className="text-green-600 font-bold text-lg">+2 XP!</h3>
                <p className="text-sm text-gray-600">
                  Scnning your Real Plants Help You Grow Your Tree 🌳
                </p>
              </div>
            </div>

            {/* Recent */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <h3 className="font-semibold mb-4">Recent Plant You Scanned</h3>

              <div className="flex gap-4 flex-wrap">
                {recentScans.slice(0, 4).map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    width={90}
                    height={70}
                    className="rounded-xl object-cover"
                    alt="plant"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= Menu ================= */
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