"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

interface EditProfilePopupProps {
  onClose: () => void;
  userData?: any;
  updateUserData?: any;
}

export default function EditProfilePopup({
  onClose,
  userData,
  updateUserData,
}: EditProfilePopupProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(
    userData?.avatar || "/SCreen/cute.png"
  );
  const [childName, setChildName] = useState(userData?.childName || "Adam");
  const [age, setAge] = useState(userData?.age || "7 Years");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatars = [
    "/SCreen/boy-avatar.png",
    "/SCreen/girl-avatar.png",
    "/SCreen/cute.png",
    "/SCreen/child.png",
    "/SCreen/boy-girl.png",
  ];

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (updateUserData) {
        await updateUserData({
          childName,
          age,
          avatar: selectedAvatar,
        });
      }
      toast.success("Profile updated successfully! ✅");
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result as string);
        toast.success("Custom photo uploaded! 📸");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      {/* Box */}
      <div className="bg-white rounded-[40px] shadow-2xl w-[450px] p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-2xl transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>

        <div className="w-full h-[1px] bg-gray-100 mb-6"></div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src={selectedAvatar}
              width={120}
              height={120}
              alt="profile"
              className="rounded-full border-4 border-green-500 shadow-xl object-cover h-[120px] w-[120px]"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition">
              ✨
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Child Name */}
          <div>
            <label className="font-bold text-gray-700 mb-2 block text-left">
              Child Name
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 outline-none focus:border-green-500 transition text-left"
            />
          </div>

          {/* Age */}
          <div>
            <label className="font-bold text-gray-700 mb-2 block text-left">
              Age
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 outline-none focus:border-green-500 transition text-left appearance-none"
            >
              {["6 Years", "7 Years", "8 Years", "9 Years", "10 Years", "11 Years", "12 Years"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Pick Avatar & Custom Upload */}
          <div>
            <label className="font-bold text-gray-700 mb-3 block text-left">
              Choose Avatar
            </label>
            
            {/* Cute Avatars List */}
            <div className="flex gap-2 justify-between mb-4">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  width={55}
                  height={55}
                  alt="avatar option"
                  onClick={() => setSelectedAvatar(src)}
                  className={`rounded-full cursor-pointer border-2 object-cover h-[55px] w-[55px] transition ${
                    selectedAvatar === src ? "border-green-500 scale-110 shadow-md" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                />
              ))}
            </div>

            {/* Custom Upload Button */}
            <div className="flex flex-col items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-green-50 text-green-700 py-3 rounded-2xl border-2 border-green-200 hover:bg-green-100 transition font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Upload from Device 📁
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg mt-6 shadow-lg hover:bg-green-700 transition active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
