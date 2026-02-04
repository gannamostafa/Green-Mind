// "use client";
// import Image from "next/image";
// import Link from "next/link";


// export default function LessonPage() {
//   const quizzes = [
//     { id: 1, questions: 5 },
//     { id: 2, questions: 5 },
//     { id: 3, questions: 5 },
//   ];

//   const relatedLessons = [
//     {
//       id: 1,
//       title: "Environment",
//       level: 1,
//       duration: "2 min",
//       image: "/lesson1.png",
//     },
//     {
//       id: 2,
//       title: "Environment",
//       level: 1,
//       duration: "2 min",
//       image: "/lesson1.png",
//     },
//     {
//       id: 3,
//       title: "Environment",
//       level: 1,
//       duration: "2 min",
//       image: "/lesson1.png",
//     },
//     {
//       id: 4,
//       title: "Environment",
//       level: 1,
//       duration: "2 min",
//       image: "/lesson1.png",
//     },
//   ];

//   return (
//     <div className="bg-[#F5F5F5] min-h-screen">
//       {/* <Navbar /> */}

//       <div className="max-w-6xl mx-auto p-6 md:p-10">
//         {/* Video */}
//         <div className="rounded-xl overflow-hidden shadow-lg">
//           <Image
//             src="/recycling.jpg"
//             alt="Lesson Video"
//             width={1200}
//             height={500}
//             className="w-full h-auto"
//           />
//         </div>

//         {/* Title & Info */}
//         <div className="mt-6">
//           <h1 className="text-3xl font-semibold">Recycling Basics - Lesson 1</h1>
//           <p className="text-gray-600 mt-1">
//             Level 1 • Duration: 2 minutes
//           </p>
//         </div>

//         {/* Overview */}
//         <div className="mt-6 bg-white p-5 rounded-xl shadow-sm">
//           <h2 className="font-semibold text-xl">Overview</h2>
//           <p className="text-gray-600 mt-2 leading-6">
//             Learn how recycling helps protect our planet! In this video, kids will
//             discover what recycling means, why its important, and how simple actions
//             like sorting plastic, paper, and metal ♻️
//           </p>
//         </div>

//         {/* What You Will Learn */}
//         <div className="mt-4 bg-white p-5 rounded-xl shadow-sm">
//           <h2 className="font-semibold text-xl">What you will learn</h2>
//           <ul className="mt-2 text-gray-600 space-y-1 list-disc list-inside">
//             <li>What Recycling Means</li>
//             <li>How To Sort Waste</li>
//             <li>Recyclable Materials</li>
//             <li>Why Recycling Helps Earth</li>
//             <li>Simple Eco Habits</li>
//           </ul>
//         </div>

//         {/* Quizzes */}
//         <div className="mt-6">
//           <h2 className="font-semibold mb-3 text-xl">Quizzes</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {quizzes.map((quiz) => (
//               <div
//                 key={quiz.id}
//                 className={`p-5 rounded-xl shadow-md text-center ${
//                   quiz.id === 1 ? "bg-gray-100" : "bg-yellow-50"
//                 }`}
//               >
//                 <h3 className="font-bold mb-1">Quiz {quiz.id}</h3>
//                 <p className="text-gray-600 mb-3">{quiz.questions} Questions</p>
//                 <Link
//                   href={`/quiz/${quiz.id}`}
//                   className="bg-[#00B467] text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition"
//                 >
//                   Start
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Related Lessons */}
//         <div className="mt-10">
//           <h2 className="font-semibold mb-4 text-xl">Related Lessons</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {relatedLessons.map((lesson) => (
//               <div
//                 key={lesson.id}
//                 className="bg-green-50 p-3 rounded-xl flex flex-col items-center text-center"
//               >
//                 <Image
//                   src={lesson.image}
//                   width={150}
//                   height={150}
//                   alt={lesson.title}
//                   className="rounded-xl"
//                 />
//                 <h3 className="mt-2 font-semibold">{lesson.title}</h3>
//                 <p className="text-gray-600 text-sm">
//                   Level {lesson.level} • {lesson.duration}
//                 </p>
//                 <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded-full text-sm hover:scale-105 transition">
//                   Watch
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* <Footer /> */}
//     </div>
//   );
// }


"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LessonPage() {
  const quizzes = [
    { id: 1, questions: 5 },
    { id: 2, questions: 5 },
    { id: 3, questions: 5 },
  ];

  const relatedLessons = [
    { id: 1, title: "Environment", level: 1, duration: "2 min", video: "https://www.youtube.com/embed/FpOWG4GDvx4", image: "/screen/environment.png" },
    { id: 2, title: "Recycling", level: 1, duration: "3 min", video: "https://www.youtube.com/embed/VIDEO2", image: "/screen/environment.png" },
    { id: 3, title: "Plastic Waste", level: 1, duration: "4 min", video: "https://www.youtube.com/embed/VIDEO3", image: "/screen/environment.png" },
    { id: 4, title: "Paper & Metal", level: 1, duration: "2 min", video: "https://www.youtube.com/embed/VIDEO4", image: "/screen/environment.png" },
  ];

  // ✅ حالة الفيديو الحالي
  const [currentVideo, setCurrentVideo] = useState(relatedLessons[0].video);

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        
        {/* Video Section */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={currentVideo}
              title="Lesson Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">

          {/* Left Column */}
          <div className="flex flex-col gap-6 md:w-[100%]">
            <div>
              <h1 className="font-poppins font-medium text-[38px] text-[#0B3D00]">
                Recycling Basics - Lesson 1
              </h1>
              <p className="font-poppins font-normal text-[30px] mt-1 text-[#333333]">
                Level 1 • Duration: 2 minutes
              </p>
            </div>

            <div className="p-5">
              <h2 className="text-[30px] text-[#333333] font-poppins font-medium">Overview</h2>
              <div className="mt-5 text-[#000000] font-poppins font-medium text-[25px] leading-6 space-y-2">
                <p>Learn how recycling helps protect our planet!</p>
                <p>In this video, kids will discover what recycling means,</p>
                <p>why it's important, and how simple actions like sorting</p>
                <p>plastic, paper, and metal ♻️🌍</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-[#EAFBFF] p-4 rounded-lg shadow-sm md:w-[53%]">
            <h2 className="font-poppins font-normal text-[27px] text-[#000000]">
              What you will learn
            </h2>
            <ul className="mt-5 list-disc list-inside text-[#666666] font-poppins font-medium text-[21px]">
              <li>What Recycling Means</li>
              <li>How To Sort Waste</li>
              <li>Recyclable Materials</li>
              <li>Why Recycling Helps Earth</li>
              <li>Simple Eco Habits</li>
            </ul>
          </div>
        </div>

        {/* Quizzes */}
        <div className="mt-10 w-full flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-3xl text-[#000000] font-poppins font-medium mt-0 p-1 rounded-lg text-left w-full">
            Quizzes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full justify-center max-w-6xl">
            {quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className={`p-4 rounded-lg shadow-md text-center ${
                  index < 2
                    ? "bg-[#fff3cc]"
                    : index === quizzes.length - 1
                    ? "bg-white"
                    : "bg-yellow-50"
                }`}
              >
                <h3 className="font-poppins font-semibold text-xl md:text-2xl text-[#000000] mb-1">
                  Quiz {quiz.id}
                </h3>
                <p className="text-sm md:text-base text-[#333333] font-poppins font-medium mb-4">
                  {quiz.questions} Questions
                </p>

                {index !== quizzes.length - 1 ? (
                  <Link
                    href={`/quiz/${quiz.id}`}
                    className="inline-block px-4 py-2 rounded-lg text-[#3EF772] font-medium hover:scale-105 transition"
                  >
                    Start
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-center font-medium bg-[#dddddd]">
                    .....
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Lessons */}
        <div className="mt-10">
          <h2 className="font-semibold mb-4 text-xl">Related Lessons</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-fit">
            {relatedLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-[#E6fdE4] p-4 rounded-xl flex items-center gap-8"
              >
                <Image
                  src={lesson.image}
                  width={150}
                  height={150}
                  alt={lesson.title}
                  className="rounded-xl flex-shrink-0"
                />

                <div className="text-center ml-10">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm mt-5">
                    Level {lesson.level} • {lesson.duration}
                  </p>

                  {/* Watch Button */}
                  <button
                    onClick={() => setCurrentVideo(lesson.video)}
                    className="mt-2 text-[#3EF772] px-4 py-1 rounded-full hover:scale-105 transition"
                  >
                    Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <header className="w-full bg-[#34c759] py-6 mt-4">
          <div className="px-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/screen/Group 45.png"
                width={70}
                height={70}
                alt="Green Mind"
              />
              <div className="text-white">
                <h1 className="text-2xl font-bold leading-tight">
                  Green<br />Mind
                </h1>
                <p className="text-sm opacity-90 mt-2">
                  Fun Eco-Learning For Kids
                </p>
              </div>
            </div>

            <div className="flex gap-16 text-white">
              <div>
                <h3 className="font-semibold mb-2">Explore</h3>
                <ul className="space-y-1 text-sm opacity-90">
                  <li><Link href="#">Lessons</Link></li>
                  <li><Link href="#">Games</Link></li>
                  <li><Link href="#">AI Plant Scan</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Help & Info</h3>
                <ul className="space-y-1 text-sm opacity-90">
                  <li><Link href="#">Parent Guide</Link></li>
                  <li><Link href="#">Contact Us</Link></li>
                  <li><Link href="#">Privacy and Safety</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center text-white text-xs mt-6 opacity-80">
            © 2025 Green Mind. All Rights Reserved.
          </p>
        </header>
      </div>
    </div>
  );
}