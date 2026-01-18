"use client";
import Link from "next/link";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";

export default function GamesPage() {
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
          <MenuItem title="Games" icon="/SCreen/games.png" href="/games" active />
          <MenuItem title="AI Scan" icon="/SCreen/ai.png" href="/ai-scan" />
          <MenuItem title="Tree Growth" icon="/SCreen/tree-gro.png" href="/growth" />
          <MenuItem title="Album" icon="/SCreen/album.png" href="/album" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
            Games
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

        <div className="w-full h-[1px] bg-gray-300 mb-8"></div>

        {/* Banner */}
        <div className="bg-[#7a4a00] text-white text-center py-3 px-6 rounded-xl mb-10 w-fit mx-auto">
          Choose A Fun Eco-Friendly Game And Earn XP To Grow Your Tree
        </div>

        {/* Games Cards */}
        <div className="flex flex-col items-center gap-8">

          <div className="flex gap-8">
            {/* Puzzle */}
            <div className="bg-[#00AEEF] w-74 h-86 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 hover:scale-105 transition cursor-pointer">
              <Image src="/SCreen/puzzel.png" width={220} height={120} alt="Puzzle" />
              <span className="text-white text-xl font-semibold">Puzzle</span>
            </div>

            {/* Memory */}
            <div className="bg-[#FF6F6F] w-74 h-86 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 hover:scale-105 transition cursor-pointer">
              <div className="flex gap-2">
                <Image src="/SCreen/tree-memory.png" width={100} height={60} alt="Memory" />
                <Image src="/SCreen/tree-me2.png" width={100} height={60} alt="Memory" />
              </div>
              <span className="text-white text-xl font-semibold">Memory Card</span>
            </div>
          </div>

          {/* Awareness Farm */}
          <div className="bg-[#57D93F] w-[660px] h-58 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-4 hover:scale-105 transition cursor-pointer">
            <Image src="/SCreen/farm-ge.png" width={220} height={120} alt="Farm" />
            <span className="text-white text-2xl font-semibold">
              Awareness Farm
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

/* Menu Item Component */
function MenuItem({ title, icon, active, href }) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 rounded-xl cursor-pointer text-sm flex items-center gap-3
        ${active ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Image src={icon} width={22} height={22} alt={title} />
        {title}
      </div>
    </Link>
  );
}
