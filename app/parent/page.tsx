"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= Edit Profile Popup ================= */

function EditProfilePopup({ onClose }) {
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = [
    "/SCreen/cute.png",
    "/SCreen/cute.png",
    "/SCreen/cute.png",
    "/SCreen/cute.png",
    "/SCreen/cute.png",
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-[400px] p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          Edit Child Profile
        </h2>

        <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <Image
            src={avatars[selectedAvatar]}
            width={90}
            height={90}
            alt="profile"
            className="rounded-full border-2 border-green-500"
          />
        </div>

        {/* Name */}
        <label className="font-semibold mb-1 block">Child Name</label>
        <input
          type="text"
          defaultValue="Adam"
          className="w-full border rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Age */}
        <label className="font-semibold mb-1 block">Age</label>
        <select className="w-full border rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-green-500">
          <option>7 Years</option>
          <option>8 Years</option>
          <option>9 Years</option>
        </select>

        {/* Avatars */}
        <label className="font-semibold mb-2 block">Avatar</label>

        <div className="flex justify-between mb-6">
          {avatars.map((src, index) => (
            <Image
              key={index}
              src={src}
              width={60}
              height={60}
              alt="avatar"
              className={`rounded-full cursor-pointer border-2 ${
                selectedAvatar === index
                  ? "border-green-500"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedAvatar(index)}
            />
          ))}
        </div>

        {/* Save */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl hover:scale-105 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ================= Main Dashboard ================= */

export default function ParentDashboard() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showEdit, setShowEdit] = useState(false);

  const data = [
    { name: "week 1", progress: 60 },
    { name: "week 2", progress: 55 },
    { name: "week 3", progress: 58 },
    { name: "week 4", progress: 70 },
    { name: "week 5", progress: 75 },
    { name: "week 6", progress: 65 },
  ];

  return (
    <div className="w-full min-h-screen flex bg-[#F5F5F5] relative">

      <div className="absolute inset-0 backdrop-blur-md z-0"></div>

      <div className="relative z-10 flex w-full h-screen">

        {/* Sidebar */}
        <div
          className="w-[350px] h-full bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 
          backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30"
        >
          <div className="flex items-center gap-3 mb-8">
            <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
            <h2 className="text-xl font-semibold">Green Mind</h2>
          </div>

          <div className="flex flex-col gap-5">
            <MenuItem
              title="Dashboard"
              icon="/SCreen/dash.png"
              active={activeMenu === "dashboard"}
              onClick={() => setActiveMenu("dashboard")}
            />
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 p-6 overflow-y-auto h-full">

          {/* Navbar */}
          <div className="flex justify-end items-center gap-4 mb-8 backdrop-blur-md p-4 rounded-xl shadow">
            <li>
              <Link href="/">Home</Link>
            </li>

            <IoNotificationsOutline className="text-2xl cursor-pointer" />
            <IoSettingsOutline className="text-2xl cursor-pointer" />

            <Image
              src="/SCreen/cute.png"
              width={45}
              height={45}
              alt="avatar"
              className="rounded-full cursor-pointer"
            />
          </div>

          <h1 className="text-2xl font-semibold text-center mb-8">
            Parent Hub
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <StatCard
              title="Quizzes"
              subtitle="Score Avg"
              value="40%"
              icon="/SCreen/check.png"
            />

            <StatCard
              title="Lessons"
              subtitle="Completed"
              value="5"
              icon="/SCreen/book.png"
            />

            <StatCard
              title="Plants"
              subtitle="Scanned"
              value="1"
              icon="/SCreen/plant.png"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

            <div className="md:col-span-2 bg-white rounded-3xl shadow-md p-6">

              <h3 className="font-semibold text-center mb-4">
                Learning Performance
              </h3>

              <div className="w-full h-[260px]">

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#22C55E"
                      strokeWidth={2}
                    />
                  </LineChart>

                </ResponsiveContainer>

              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 text-center">

              <h3 className="font-semibold mb-6">Quiz Score</h3>

              <div className="flex justify-between items-end h-[200px]">

                <AnimatedBar label="Quiz 1" value={60} />
                <AnimatedBar label="Quiz 2" value={90} />
                <AnimatedBar label="Quiz 3" value={20} />
                <AnimatedBar label="Quiz 4" value={60} />

              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">

            <div className="md:col-span-2 bg-white rounded-3xl shadow p-6">

              <h3 className="font-semibold mb-4">Recent Activity</h3>

              <input
                type="text"
                placeholder="Write Your Feedback"
                className="w-full border rounded-xl p-3 mb-4"
              />

              <button className="w-full bg-green-500 text-white py-2 rounded-full">
                Submit
              </button>
            </div>

            {/* Profile */}
            <div className="bg-white rounded-3xl shadow p-6 text-center">

              <Image
                src="/SCreen/cute.png"
                width={80}
                height={80}
                alt="child"
                className="mx-auto rounded-full mb-3"
              />

              <h3 className="font-semibold">Adam</h3>

              <p className="text-gray-500 mb-3">Age: 7 Years</p>

              <button
                onClick={() => setShowEdit(true)}
                className="w-full bg-gray-200 py-2 rounded-xl hover:bg-gray-300"
              >
                Edit Profile
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showEdit && (
        <EditProfilePopup onClose={() => setShowEdit(false)} />
      )}

    </div>
  );
}

/* ================= Components ================= */

function MenuItem({ title, icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 rounded-xl cursor-pointer flex items-center gap-3
      ${active ? "bg-green-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
    >
      <Image src={icon} width={26} height={26} alt={title} />
      {title}
    </div>
  );
}

function StatCard({ title, subtitle, value, icon }) {
  return (
    <div className="bg-white rounded-3xl shadow p-6 flex items-center gap-4">

      <Image src={icon} width={40} height={40} alt="icon" />

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="text-lg font-bold text-green-600">{value}</p>
      </div>

    </div>
  );
}

function AnimatedBar({ value, label }) {
  const [height, setHeight] = useState("0%");

  useEffect(() => {
    setTimeout(() => setHeight(`${value}%`), 200);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1">

      <span className="text-xs">{value}%</span>

      <div
        className="w-10 bg-green-500 rounded-full"
        style={{ height }}
      ></div>

      <span className="text-sm">{label}</span>

    </div>
  );
}