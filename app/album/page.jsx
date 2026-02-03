"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSettingsOutline,
  IoSearch,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";

export default function AlbumPage() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="w-full min-h-screen flex bg-[#F5F5F5] relative overflow-hidden">
      {/* Overlay Blur */}
      <div className="absolute inset-0 backdrop-blur-md z-0"></div>

      {/* Page Content */}
      <div className="relative z-10 flex w-full h-full">
        {/* Sidebar */}
        <div className="w-[350px] h-screen bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30">
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
            <MenuItem title="AI Scan" icon="/SCreen/ai.png" href="/ai-scan" />
            <MenuItem
              title="Tree Growth"
              icon="/SCreen/tree-gro.png"
              href="/growth"
            />
            <MenuItem
              title="Album"
              icon="/SCreen/album.png"
              href="/album"
              active
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto h-screen">
          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow relative z-[999]">
            <Link href="/landing" className="hover:text-green-600 transition">
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
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border border-gray-100 py-2 z-[9999]">
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

                  <button
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
              className="rounded-full cursor-pointer border-2 border-green-400"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-6">
            My Plant Album
          </h1>

          {/* Title + Points */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">My Plant Album</h2>
              <p className="text-gray-600 text-sm">
                All The Real Plants You’ve Scanned With Green Mind.
              </p>
            </div>

            <div className="border border-green-500 text-green-600 px-4 py-1 rounded-full font-medium">
              3 Points
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8 w-[60%] mx-auto">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Plant Name"
              className="w-full pl-12 pr-4 py-3 rounded-full border outline-none shadow-sm"
            />
          </div>

          {/* Content */}
          <div className="grid grid-cols-3 gap-6 pb-20">
            {/* Left Cards */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <PlantCard status="Healthy" statusColor="green" />
              <TreeXPCard />
              <PlantCard status="SICK" statusColor="red" />
              <PlantCard status="Healthy" statusColor="green" />
            </div>

            {/* Right Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition">
              <Image
                src="/SCreen/Group 45.png"
                width={100}
                height={100}
                alt="green child"
              />
              <div>
                <h3 className="font-semibold text-lg text-green-600">
                  Aloevera
                </h3>
                <p className="text-sm text-gray-600">Scanned: 12 Nov 2025</p>
                <span className="inline-block mt-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function MenuItem({ title, icon, active, href }) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 rounded-xl cursor-pointer text-sm flex items-center gap-3 transition
        ${
          active
            ? "bg-green-500 text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Image src={icon} width={30} height={22} alt={title} />
        {title}
      </div>
    </Link>
  );
}

function PlantCard({ status, statusColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:scale-105 transition">
      <Image src="/SCreen/tree-album.png" width={70} height={70} alt="plant" />
      <div className="flex-1">
        <h3 className="font-semibold text-green-600">Aloevera</h3>
        <p className="text-sm text-gray-500">Scanned: 12 Nov 2025</p>

        <span
          className={`inline-block mt-2 px-4 py-1 rounded-full text-white text-sm
          ${statusColor === "green" ? "bg-green-500" : "bg-red-500"}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

function TreeXPCard() {
  return (
    <div className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition">
      <Image src="/SCreen/big-tree.png" width={120} height={120} alt="tree" />
      <h3 className="mt-2 font-semibold text-green-700">Tree Growth</h3>
      <p className="text-sm text-gray-600">From Album</p>
      <span className="text-green-700 font-bold mt-1">+6 XP</span>
    </div>
  );
}
