




"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoArrowBackOutline,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";

interface TeamMember {
  name: string;
  role: string;
  track: string;
  bio: string;
  avatar: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export default function TeamPage() {
  const router = useRouter();

  const teamMembers: TeamMember[] = [
    {
      name: "Mariam Ashraf",
      role: "UI/UX Designer 🎨",
      track: "UI/UX",
      bio: "UI/UX designer responsible for creating colorful interfaces and kid-friendly user experiences for Green Mind.",
      avatar: "/SCreen/maya.jpeg",
      socials: {
        github: "https://github.com/mariam2996",
        linkedin: "https://www.linkedin.com/in/mariam-ashraf369",
        email: "mailto:Mariam2662022@outlook.com",
      },
    },

    {
      name: "Maryam Ahmed",
      role: "Front-End Developer 💻",
      track: "Front-End",
      bio: "Front-end developer responsible for building interactive interfaces and connecting the project components into a seamless experience.",
      avatar: "/sCreen/marioma.jpeg",
      socials: {
        github: "https://github.com/m2riem",
        linkedin: "https://www.linkedin.com/in/mariem-ahmed0",
        email: "mailto:mar312iem@gmail.com",
      },
    },

    {
      name: "jannah Mostafa",
      role: "Front-End Developer 💻",
      track: "Front-End",
      bio: "Front-end developer responsible for building interactive interfaces and connecting the project components into a seamless experience.",
      avatar: "/SCreen/ganna.jpeg",
      socials: {
        github: "https://github.com/gannamostafa",
        linkedin: "https://www.linkedin.com/in/ganna-mostafa-63405425b/",
        email: "mailto:polandagacy@gmail.com",
      },
    },

    {
      name: "Mariem Abdelrahman",
      role: "Game Developer 🎮",
      track: "Game Development",
      bio: "Game developer responsible for creating interactive educational games and fun challenges for Green Mind.",
      avatar: "/SCreen/mk.jpeg",
      socials: {
        github: "https://github.com/merokamar05-maker",
        linkedin: "https://www.linkedin.com/in/mariem-kamar-612123357?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        email: "mailto:member5@example.com",
      },
    },

    {
      name: "Mariam Ali",
      role: "Game Developer 🎮",
      track: "Game Development",
      bio: "Game developer responsible for creating interactive educational games and fun challenges for Green Mind.",
      avatar: "/SCreen/mariam.jpeg",
      socials: {
        github: "https://github.com/MariamAlix24",
        linkedin: "https://www.linkedin.com/in/mariam-ali-963591259?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
        email: "mailto:alimariem59@gmail.com",
      },
    },

    {
      name: "Mahmoud Sebaey",
      role: "AI & Data Science 🤖",
      track: "AI & Data Science",
      bio: "Built the AI model for plant scanning and generated custom eco quizzes.",
      avatar: "/SCreen/sebaey.jpeg",
      socials: {
        github: "https://github.com/sab3awymedo-png",
        linkedin: "https://www.linkedin.com/in/mahmoud-sebaey-745285369?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        email: "mailto:sab3awymedo@gmail.com",
      },
    },

    {
      name: "Abdelrahman Gaber",
      role: "Backend Developer 🗄️",
      track: "Back-end",
      bio: "Backend developer responsible for building Firebase services, database management, and user authentication systems.",
      avatar: "/SCreen/AG.jpeg",
      socials: {
        github: "https://github.com/Hazo43",
        linkedin: "https://www.linkedin.com/in/abdelrahmen-gaber-010750345/",
        email: "mailto:hazogaber10@gmail.com",
      },
    },
  ];

  const getBadgeStyle = (track: string) => {
    switch (track) {
      case "Front-End":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "UI/UX":
        return "bg-pink-100 text-pink-700 border-pink-200";

      case "AI & Data Science":
        return "bg-amber-100 text-amber-700 border-amber-200";

      case "Back-end":
        return "bg-purple-100 text-purple-700 border-purple-200";

      default:
        return "bg-green-100 text-green-700 border-green-200";
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative flex flex-col"
      style={{ backgroundImage: "url('/SCreen/growth.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>

      {/* Navbar */}
      <nav className="w-full py-4 shadow-lg bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] flex items-center px-6 relative z-10">
        <button
          onClick={() => router.push("/parent")}
          className="flex items-center gap-2 text-white hover:text-green-100 transition font-bold bg-white/20 px-4 py-2 rounded-2xl border border-white/30 cursor-pointer"
        >
          <IoArrowBackOutline size={20} />
          <span>Back to Parent Dashboard 🔙</span>
        </button>

        <h1 className="text-white text-2xl md:text-3xl font-black text-center flex-1 drop-shadow-md">
          Meet the Green Mind Creators 🌍💚
        </h1>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full p-4 relative z-10 flex-1 flex flex-col justify-start">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center mb-6 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/40 gap-4">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-green-800 mb-2">
              Creative Team 🚀🌟
            </h2>

            <p className="text-gray-700 text-base leading-relaxed">
              We are <strong>7 creative minds</strong> who designed and
              developed <strong>Green Mind</strong> to be a fun and sustainable
              gateway for teaching children how to protect planet Earth! 💚🌱
            </p>
          </div>

          <Image
            src="/SCreen/Group 45.png"
            alt="Illustration"
            width={90}
            height={90}
            className="animate-bounce"
          />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md rounded-3xl p-4 border border-white/50 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col items-center text-center relative group overflow-hidden"
            >
              {/* Decorative Circle */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl group-hover:bg-green-300/40 transition-colors"></div>

              {/* Avatar */}
              <div className="relative w-24 h-24 mb-3">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-green-400 group-hover:rotate-45 transition-transform duration-700"></div>

                <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white shadow-inner bg-green-50">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {member.name}
              </h3>

              <p className="text-sm font-semibold text-green-700 mb-2">
                {member.role}
              </p>

              {/* Badge */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border mb-3 uppercase tracking-wider ${getBadgeStyle(
                  member.track
                )}`}
              >
                {member.track}
              </span>

              {/* Bio */}
              <p className="text-xs text-gray-500 italic leading-relaxed">
                “{member.bio}”
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 w-full justify-center">
                {member.socials.github && (
                  <Link
                    href={member.socials.github}
                    target="_blank"
                    className="text-gray-500 hover:text-green-600 transition-colors text-lg"
                  >
                    <IoLogoGithub />
                  </Link>
                )}

                {member.socials.linkedin && (
                  <Link
                    href={member.socials.linkedin}
                    target="_blank"
                    className="text-gray-500 hover:text-green-600 transition-colors text-lg"
                  >
                    <IoLogoLinkedin />
                  </Link>
                )}

                {member.socials.email && (
                  <Link
                    href={member.socials.email.startsWith("mailto:") ? member.socials.email : `mailto:${member.socials.email}`}
                    className="text-gray-500 hover:text-green-600 transition-colors text-lg"
                  >
                    <IoMailOutline />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}