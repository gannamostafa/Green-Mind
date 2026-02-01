"use client";
import Link from "next/link";
import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";

export default function ChildDashboard() {
  return (
    <div className="w-full overflow-hidden h-screen bg-[#F5F5F5] flex">

      {/* Sidebar */}
      <div className="w-[260px] h-full bg-white shadow-md rounded-tr-3xl rounded-br-3xl p-6 flex flex-col mt-5 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/screen/logo.png" width={48} height={48} alt="logo" />
          <h2 className="text-xl font-semibold">Green Mind</h2>
        </div>

        <div className="flex flex-col gap-3 menu">
          <MenuItem 
            title="Dashboard" 
            icon="/icons/dashboard.png" 
            href="/dashboard" 
            active 
          />
          <MenuItem 
            title="Lessons" 
            icon="/icons/lessons.png" 
            href="/lessons" 
          />
          <MenuItem 
            title="Games" 
            icon="/icons/games.png" 
            href="/games" 
          />
          <MenuItem 
            title="AI Scan" 
            icon="/icons/ai-scan.png" 
            href="/ai-scan" 
          />
          <MenuItem 
            title="Tree Growth" 
            icon="/icons/growth.png" 
            href="/growth" 
          />
          <MenuItem 
            title="Album" 
            icon="/icons/album.png" 
            href="/album" 
          />
          <MenuItem 
            title="Achievements" 
            icon="/icons/achievements.png" 
            href="/achievements" 
          />
          <MenuItem 
            title="Settings" 
            icon="/icons/settings.png" 
            href="/settings" 
          />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
          <h1 className="text-2xl font-semibold absolute left-1/2 -translate-x-1/2">
            Dashboard
          </h1>

          <div className="flex items-center gap-9 ml-auto">
            <IoNotificationsOutline className="text-black text-2xl" />
            <div className="w-13 h-13 rounded-full overflow-hidden">
              <Image
                src="/screen/cute.png"
                alt="avatar"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-300 mb-2"></div>

        {/* Welcome Card */}
        <div className="rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Welcome Back Adam!</h2>
            <p>Let’s Grow Your Tree Today</p>
            <ProgressItem title="" percentage={20} />

            <div className="flex gap-3 mt-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-xl">Start Lesson</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-xl">Play Game</button>
            </div>
          </div>

          <Image src="/screen/Group 45.png" width={170} height={170} className="mr-80" alt="character" />
        </div>

        {/* GRID 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

          <div className="bg-white p-6 shadow-md flex flex-col items-center rounded-2xl w-[220px] h-[220px] justify-center">
            <h3 className="font-semibold mb-3 text-lg">My Tree</h3>
            <Image src="/screen/tree.png" width={110} height={110} alt="tree" />
            <p className="text-gray-500 text-sm mt-3">Level 3</p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md flex flex-col items-center w-full">
            <h3 className="font-semibold mb-8 text-center w-full">Quick Actions</h3>
            <div className="flex gap-3 flex-wrap justify-center w-full">
              <ActionCard imgSrc="/screen/start lesson.png" title="Start Lesson" />
              <ActionCard imgSrc="/screen/camera.png" title="Scan Plant" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-2 shadow-md">
            <h3 className="font-semibold mb-3">Games Progress</h3>
            <ProgressItem title="Puzzle" percentage={70} />
            <ProgressItem title="Memory" percentage={50} />
            <ProgressItem title="Matching" percentage={90} />
          </div>

        </div>

        {/* GRID 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">

          <div className="bg-white rounded-2xl p-1 shadow-md">
            <h3 className="font-semibold mb-3">Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              <Achievement imgSrc="/screen/ai-scan.png" text="First Plant Scanned" />
              <Achievement imgSrc="/screen/task-done-01.png" text="Completed 3 Quizzes" />
              <Achievement imgSrc="/screen/video.png" text="Watched 5 Videos" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-1 shadow-md">
            <h3 className="font-semibold mb-3">Continue Learning</h3>
            <div className="flex items-center gap-3">
              <Image src="/screen/lesson list.png" width={75} height={75} className="rounded-xl" alt="lesson" />
              <div>
                <p className="font-semibold text-sm">Continue: Parts of A Plant</p>
                <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded-lg text-sm">Continue</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-1 shadow-md">
            <h3 className="font-semibold mb-3">Today's Activity</h3>
            <div className="flex items-center gap-3">
              <Image src="/screen/Group.png" width={75} height={75} alt="chart" />
              <div className="flex flex-col gap-1 text-sm">
                <span className="flex items-center gap-2">🟢 Scan 3 Plants</span>
                <span className="flex items-center gap-2">🔵 Lessons</span>
                <span className="flex items-center gap-2">🟡 Games</span>
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
        className={`px-4 py-2 rounded-xl cursor-pointer text-sm flex items-center gap-3
        ${active ? "bg-green-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Image
          src={icon}
          width={24}
          height={24}
          alt={title}
          className={`${active ? "brightness-125" : "brightness-90"}`}
        />
        {title}
      </div>
    </Link>
  );
}

function ActionCard({ imgSrc, title }) {
  return (
    <button className="bg-yellow-100 hover:bg-yellow-200 transition px-4 py-2 rounded-xl flex-1 text-center flex flex-col items-center gap-1">
      <Image src={imgSrc} width={40} height={40} alt={title} />
      <span className="text-sm">{title}</span>
    </button>
  );
}

function ProgressItem({ title, percentage }) {
  return (
    <div className="mb-3 flex justify-between text-sm text-gray-700">
      <span>{title}</span>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}

function Achievement({ imgSrc, text }) {
  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-xl p-3 text-sm">
      <Image src={imgSrc} width={45} height={45} alt={text} />
      <p className="mt-1">{text}</p>
    </div>
  );
}
