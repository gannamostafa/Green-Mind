"use client";

import { useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import Link from "next/link";
import Image from "next/image";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

// ----------------------------
// Example dynamic data
// ----------------------------
const totalPlants = 5;
const initialDonePlants = 3;

const initialTimeData = [
  { name: "part1", value: 30 },
  { name: "part2", value: 30 },
  { name: "part3", value: 40 },
];

// Colors
const scanColors = ["#147c00", "#E5E7EB"];
const timeColors = ["#147c00", "#f6416c", "#E5E7EB"];

// ----------------------------
// Main Dashboard
// ----------------------------
export default function Dashboard() {
  const [donePlants, setDonePlants] = useState(initialDonePlants);
  const [timeData, setTimeData] = useState(initialTimeData);

  // Dynamic Scan Data
  const scanData = [
    { name: "done", value: donePlants },
    { name: "left", value: totalPlants - donePlants },
  ];

  return (
    <div className="w-full h-screen bg-[#F5F5F5] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[260px] h-full bg-gradient-to-b from-[#00c9ff] via-[#6ee7b7] to-[#92fe9d] text-white shadow-md rounded-tr-3xl rounded-br-3xl p-6 flex flex-col overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/screen/logo.png" width={48} height={48} alt="logo" />
          <h2 className="text-xl font-semibold">Green Mind</h2>
        </div>

        <div className="flex flex-col gap-3">
          <MenuItem title="Dashboard" icon="/sCreen/dash.png" href="/dashboard" active />
          <MenuItem title="Lessons" icon="/sCreen/start lesson.png" href="/lessons" />
          <MenuItem title="Games" icon="/sCreen/games.png" href="/games" />
          <MenuItem title="AI Scan" icon="/sCreen/ai-scan.png" href="/ai-scan" />
          <MenuItem title="Tree Growth" icon="/sCreen/tree-gro.png" href="/growth" />
          <MenuItem title="Album" icon="/sCreen/album.png" href="/album" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <div className="relative flex items-center mb-6">
          <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">
            Dashboard
          </h1>

          <div className="ml-auto flex items-center gap-6">
             <li>
              <Link href="/">Home</Link>
            </li>
            <IoNotificationsOutline className="text-2xl cursor-pointer" />
             <IoSettingsOutline className="text-2xl cursor-pointer hover:rotate-90 transition" />
           

            <Image
              src="/screen/cute.png"
              width={48}
              height={48}
              alt="avatar"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="h-px bg-gray-300 mb-6" />

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center mb-9">
          <div>
            <h2 className="text-2xl font-bold">Welcome Back Adam!</h2>
            <p className="text-gray-500 mb-3">Let’s Grow Your Tree Today</p>

            <ProgressItem percentage={20} />

            <div className="flex gap-3 mt-4">
             
<Link href="/lessons">
  <button className="bg-green-600 text-white px-4 py-2 rounded-xl cursor-pointer">
    Start Lesson
  </button>
</Link>

             <Link href="/games">
  <button className="bg-green-500 text-white px-4 py-2 rounded-xl cursor-pointer">
    Play Game
  </button>
</Link>
            </div>
          </div>

          <div className="flex justify-center md:mr-[90px]">
            <Image
              src="/screen/Group 45.png"
              width={170}
              height={170}
              alt="character"
              className="hidden md:block"
            />
          </div>
        </div>

        {/* Outer White Box with 3 Cards */}
        <div className="bg-white rounded-3xl p-6 shadow-md mb-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* My Tree */}
            <div className="bg-[#f9f9f9] p-6 rounded-2xl flex flex-col items-center">
              <h3 className="font-semibold mb-3">My Tree</h3>
              <Image src="/screen/tree.png" width={110} height={110} alt="tree" />
              <p className="text-gray-500 text-sm mt-3">Level 3</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#f9f9f9] rounded-2xl p-6">
              <h3 className="font-semibold mb-6 text-center">Quick Actions</h3>
              <div className="flex gap-8 justify-center">
                <ActionCard imgSrc="/sCreen/start lesson.png" title="Start Lesson" />
                <ActionCard imgSrc="/screen/camera.png" title="Scan Plant" />
              </div>
            </div>

            {/* Games Progress */}
            <div className="bg-[#f9f9f9] rounded-2xl p-6">
              <h3 className="font-semibold mb-6 text-center">Games Progress</h3>
              <div className="space-y-4">
                <ProgressItem title="Puzzle" percentage={70} />
                <ProgressItem title="Memory" percentage={50} />
                <ProgressItem title="Matching" percentage={90} />
              </div>
            </div>

          </div>
        </div>

        {/* Continue Learning + Today's Activity */}
        <div className="w-full flex justify-center -mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <ContinueLearning />
            <TodaysActivity
              scanData={scanData}
              scanColors={scanColors}
              timeData={timeData}
              timeColors={timeColors}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// ----------------------------
// Menu Item Component
// ----------------------------
function MenuItem({ title, icon, active, href }) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 rounded-xl flex items-center gap-3 text-sm cursor-pointer
        ${active ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Image src={icon} width={22} height={22} alt={title} />
        {title}
      </div>
    </Link>
  );
}

// ----------------------------
// Action Card Component
// ----------------------------
function ActionCard({ imgSrc, title }) {
  return (
    <button className="bg-yellow-100 hover:bg-yellow-200 px-4 py-3 rounded-xl flex flex-col items-center gap-1">
      <Image src={imgSrc} width={40} height={40} alt={title} />
      <span className="text-sm">{title}</span>
    </button>
  );
}

// ----------------------------
// Progress Item Component
// ----------------------------
function ProgressItem({ title, percentage }) {
  return (
    <div className="mb-3">
      {title && <p className="text-sm mb-1">{title}</p>}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ----------------------------
// Continue Learning Component
// ----------------------------
function ContinueLearning() {
  return (
    <div className="bg-white rounded-2xl p-10 shadow-md w-fit self-start">
      <h3 className="font-semibold mb-8 text-center">Continue Learning</h3>

      <div className="flex gap-2 items-center mb-3">
        <Image src="/SCreen/boy-girl.png" width={100} height={100} alt="lesson" />
        <div className="flex flex-col">
          <span className="font-semibold text-sm ">Continue</span>
          <span className="text-sm text-gray-600">Parts of A Plant</span>
        </div>
      </div>


<Link href="/ai-scan">
      <button className="mt-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm block mx-auto cursor-pointer">
        Continue
      </button>
      </Link>
    </div>
  );
}

// ----------------------------
// TodaysActivity Component
// ----------------------------
function TodaysActivity({ scanData, scanColors, timeData, timeColors }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md w-fit self-start">
      <h3 className="font-semibold mb-4 text-center">Today’s Activity</h3>

      <div className="flex gap-6 justify-center">
        {/* Scan Pie */}
        <div className="relative">
          <PieChart width={130} height={130}>
            <Pie
              data={scanData}
              innerRadius={42}
              outerRadius={58}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {scanData.map((_, i) => (
                <Cell key={i} fill={scanColors[i]} />
              ))}
            </Pie>
          </PieChart>

          {/* Dynamic text on edge */}
          <span className="absolute top-1/2 right-0 -translate-y-1/2 text-xs px-2 rounded-full">
            {scanData[0].value} Plants
          </span>
        </div>

        {/* Time Pie */}
        <div className="relative">
          <PieChart width={130} height={130}>
            <Pie
              data={timeData}
              innerRadius={42}
              outerRadius={58}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {timeData.map((_, i) => (
                <Cell key={i} fill={timeColors[i]} />
              ))}
            </Pie>
          </PieChart>

          {/* Dynamic text on edges */}
          <span className="absolute top-1/2 left-0 -translate-y-1/2 text-xs px-2 rounded-full">
            {timeData[0].value} Min
          </span>
          <span className="absolute top-1/2 right-0 -translate-y-1/2 text-xs px-2 rounded-full">
            {timeData[2].value} Min
          </span>
        </div>
      </div>

      {/* Legends */}
      <div className="mt-4 text-sm space-y-1 text-center flex flex-col items-center">
        <Legend color="linear-gradient(to bottom, #0dff49, #27661e)" text="Scan 3 Plants" />
        <Legend color="#f9a7d0" text="Lesson" />
        <Legend color="linear-gradient(to bottom, #65e66a, #38803b)" text="Games" />
      </div>
    </div>
  );
}

// ----------------------------
// Legend Component
// ----------------------------
function Legend({ color, text }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span
        className="w-3 h-3 "
        style={{ background: color }} 
      />
      <span>{text}</span>
    </div>
  );
}