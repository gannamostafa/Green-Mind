"use client";

import { useState } from "react";
import Image from "next/image";

export default function EditProfilePopup({ onClose }) {
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
      
      {/* Box */}
      <div className="bg-white rounded-3xl shadow-2xl w-[400px] p-6 relative animate-fadeIn">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Title */}
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
        <label className="font-semibold mb-1 block">
          Child Name
        </label>

        <input
          type="text"
          placeholder="Adam"
          className="w-full border rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Age */}
        <label className="font-semibold mb-1 block">
          Age
        </label>

        <select className="w-full border rounded-md px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-green-500">
          <option>7 Years</option>
          <option>8 Years</option>
          <option>9 Years</option>
        </select>

        {/* Avatars */}
        <label className="font-semibold mb-2 block">
          Avatar
        </label>

        <div className="flex justify-between mb-6">
          {avatars.map((src, index) => (
            <Image
              key={index}
              src={src}
              width={65}
              height={65}
              alt={`avatar-${index}`}
              className={`rounded-full cursor-pointer border-2 transition
                ${
                  selectedAvatar === index
                    ? "border-green-500 scale-105"
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
