"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "200", "600", "700"],
});

// Sidebar MenuItem Component
function MenuItem({ title, icon, href, active }: any) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded-lg transition ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      <Image src={icon} width={24} height={24} alt={title} />
      <span className="text-white font-medium">{title}</span>
    </Link>
  );
}



export default function LessonsPage() {
  const lessons = [
    {
      title: "recycling basics",
      level: "Level 1 - 2 Min",
      img: "/screen/recycle1.png",
      button: "Continue",
      video: "https://www.youtube.com/embed/FpOWG4GDvx4",
    },
   {
  title: "recycling basics",
  level: "Level 1 - 2 Min",
  img: "/screen/recycle2.png",
  button: "Continue",
  video: "https://www.youtube.com/embed/V_1vpEEnXW0",
},

{
  title: "recycling basics",
  level: "Level 1 - 2 Min",
  img: "/screen/recycle3.png",
  button: "Continue",
  video: "https://www.youtube.com/embed/aLY46g18hWk",
},

   {
  title: "parts of plant",
  level: "Level 2 - 4 Min",
  img: "/screen/plant1.png",
  button: "Start Lesson",
  video: "https://www.youtube.com/embed/tNbTppAbEVc",
},

 

    {
  title: "parts of plant",
  level: "Level 2 - 4 Min",
  img: "/screen/plant2.png",
  button: "Start Lesson",
  video: "https://www.youtube.com/embed/AltruHFIBAQ", // تم تعديل الرابط ليعمل داخل iframe
},

     {
      title: "parts of plant",
      level: "Level 2 - 4 Min",
      img: "/screen/boy-girl.png",
      button: "Start Lesson",
      video: "https://www.youtube.com/embed/VIDEO4",
    },
  ];


  return (
    
    <div className="relative z-10 flex w-full h-screen">
        {/* Sidebar */}
        <div className="w-[350px] h-full bg-gradient-to-b from-[#00C9FF]/70 to-[#92FE9D]/70 backdrop-blur-lg shadow-lg rounded-tr-3xl rounded-br-3xl p-6 border border-white/30">
          <div className="flex items-center gap-3 mb-9">
            <Image src="/SCreen/logo.png" width={48} height={48} alt="logo" />
            <h2 className="text-xl font-semibold">Green Mind</h2>
          </div>

          <div className="flex flex-col gap-5">
            <MenuItem title="Dashboard" icon="/SCreen/dash.png" href="/child" />
            <MenuItem
              title="Lessons"
              icon="/SCreen/start lesson.png"
              href="/lessons" active
            />
            <MenuItem
              title="Games"
              icon="/SCreen/games.png"
              href="/games"
             
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


      {/* Main Content */}
      <div className={`${poppins.className} flex-1 min-h-screen bg-[#F5F5F5] p-8`}>
        <h1 className="text-3xl font-semibold mb-2 w-[34%] mx-auto text-center">
          Lessons
        </h1>

        <div className="w-full h-[1px] bg-gray-300 mb-2"></div>

        <div className="text-sm text-gray-500 flex gap-1 mb-6">
          
          <span className="text-black">lessons</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {lessons.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-2 hover:shadow-md transition"
            >
              <Image
                src={item.img}
                width={200}
                height={200}
                className="w-full h-[170px] object-cover rounded-2xl"
                alt={item.title}
              />

              <div className="text-center mt-2">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.level}</p>

                <Link
                  href={`/lesson-page?video=${encodeURIComponent(
                    item.video
                  )}&title=${encodeURIComponent(
                    item.title
                  )}&level=${encodeURIComponent(item.level)}`}
                  className="mt-2 px-4 py-1 rounded-2xl font-medium inline-block text-white text-[21px] bg-[#3EF772]"
                >
                  {item.button}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}