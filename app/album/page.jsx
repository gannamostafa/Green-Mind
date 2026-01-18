"use client";
import Image from "next/image";
import { IoNotificationsOutline, IoSearch } from "react-icons/io5";

export default function AlbumPage() {
  return (
    <div className="w-full h-screen bg-[#F5F5F5] flex overflow-hidden">

      {/* Sidebar */}
      <div className="w-[260px] h-full bg-white shadow-md rounded-tr-3xl rounded-br-3xl p-6 mt-5">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
          <h2 className="text-xl font-semibold">Green Mind</h2>
        </div>

        <div className="flex flex-col gap-5">
          <MenuItem title="Dashboard" icon="/SCreen/dash.png" href="/child" />
          <MenuItem title="Lessons" icon="/SCreen/start lesson.png" href="/lessons" />
          <MenuItem title="Games" icon="/SCreen/games.png" href="/games" />
          <MenuItem title="AI Scan" icon="/SCreen/ai.png" href="/ai-scan" />
          <MenuItem title="Tree Growth" icon="/SCreen/tree-gro.png" href="/growth" />
          <MenuItem title="Album" icon="/SCreen/album.png" href="/album" active />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
            My Plant Album
          </h1>

          <div className="flex items-center gap-6 ml-auto">
            <IoNotificationsOutline className="text-2xl" />
            <Image
              src="/screen/cute.png"
              width={45}
              height={45}
              alt="avatar"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

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
        <div className="relative mb-8 w-[60%]">
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Plant Name"
            className="w-full pl-12 pr-4 py-3 rounded-full border outline-none"
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">

          {/* Left Cards */}
          <div className="col-span-2 grid grid-cols-2 gap-6">

            <PlantCard status="Healthy" statusColor="green" />
            <TreeXPCard />

            <PlantCard status="SICK" statusColor="red" />
            <PlantCard status="Healthy" statusColor="green" />

          </div>

          {/* Right Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
            <Image src="/SCreen/Group 45.png" width={100} height={100} alt="green child" />
            <div>
              <h3 className="font-semibold text-lg text-green-600">Aloevera</h3>
              <p className="text-sm text-gray-600">Scanned: 12 Nov 2025</p>
              <span className="inline-block mt-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                Healthy
              </span>
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
    <a href={href}>
      <div
        className={`px-4 py-2 rounded-xl cursor-pointer text-sm flex items-center gap-3
        ${active ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Image src={icon} width={22} height={22} alt={title} />
        {title}
      </div>
    </a>
  );
}

function PlantCard({ status, statusColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
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
    <div className="bg-green-100 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center">
      <Image src="/SCreen/big-tree.png" width={120} height={120} alt="tree" />
      <h3 className="mt-2 font-semibold text-green-700">Tree Growth</h3>
      <p className="text-sm text-gray-600">From Album</p>
      <span className="text-green-700 font-bold mt-1">+6 XP</span>
    </div>
  );
}
