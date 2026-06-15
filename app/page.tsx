"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#F5FFF9]">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden hero-page">
      {/* ================= HERO ================= */}
      <section className="relative text-white py-28 px-10 rounded-b-[70px] shadow-2xl bg-cover bg-center overflow-hidden hero-background">
        {/* Gradient overlay to make text radiant and readable */}
        <div className="absolute inset-0 rounded-b-[70px] bg-gradient-to-br from-slate-950/35 via-emerald-900/20 to-slate-900/25 backdrop-blur-xl" />

        {/* Decorative glow and floating accents */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -left-16 top-16 w-72 h-72 rounded-full bg-emerald-300/15 blur-3xl"></div>
          <div className="absolute right-8 top-32 w-56 h-56 rounded-full bg-teal-300/15 blur-3xl"></div>
          <span className="absolute leaf leaf-1 text-xl left-[10%] top-[12%] leaf-delay-0">🍃</span>
          <span className="absolute leaf leaf-2 text-lg left-[28%] top-[6%] leaf-delay-2">🌱</span>
          <span className="absolute leaf leaf-3 text-xl left-[62%] top-[10%] leaf-delay-4">🍃</span>
          <span className="absolute leaf leaf-4 text-base left-[80%] top-[14%] leaf-delay-1">🍂</span>
          <span className="absolute leaf leaf-1 text-lg left-[46%] top-[20%] leaf-delay-3">🍃</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              Explore, Learn, and <br />
              <span className="bg-gradient-to-r from-emerald-200 via-lime-200 to-teal-200 bg-clip-text text-transparent">
                Build Positive Habits
              </span>
            </h1>

            <p className="mb-8 text-lg opacity-90 leading-relaxed max-w-xl drop-shadow-sm">
              Green Mind helps children develop responsibility, empathy, and
              environmental awareness through interactive learning, games, and
              real-world actions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/choose">
                <button className="btn-primary px-8 py-3.5 rounded-3xl font-semibold">
                  Get Started 🌱
                </button>
              </Link>

              {!user && (
                <Link href="/login">
                  <button className="secondary-btn border border-white/30 px-8 py-3.5 rounded-3xl font-semibold">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* ================= IMAGE SECTION ================= */}
          <div className="relative flex justify-center items-center mt-12 md:mt-0 animate-fade-in-up hero-image-delay">
            {/* Glowing background */}
            <div className="absolute w-[440px] h-[440px] bg-gradient-to-br from-green-400/40 to-teal-300/30 rounded-full blur-3xl animate-pulse duration-[6s]"></div>

            {/* Background Image */}
            <div className="absolute -left-8 rotate-[-8deg] rounded-3xl shadow-xl opacity-90 z-0 animate-float-back transition-all hover:scale-105 duration-500">
              <Image
                src="/SCreen/perant-sce.png"
                width={350}
                height={350}
                alt="dashboard back"
                className="rounded-3xl shadow-xl"
              />
            </div>

            {/* Foreground Image */}
            <div className="relative z-10 rotate-[3deg] rounded-3xl shadow-2xl animate-float-front transition-all hover:scale-105 duration-500">
              <Image
                src="/SCreen/dash-sce.png"
                width={420}
                height={420}
                alt="dashboard front"
                className="rounded-3xl shadow-2xl"
              />
            </div>

            {/* Green mascot */}
            <div className="absolute -bottom-6 -right-10 z-20 drop-shadow-2xl animate-float-mascot transition-all hover:scale-110 duration-300">
              <Image
                src="/SCreen/Group 45.png"
                width={180}
                height={180}
                alt="green character"
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="py-24 px-10 bg-[#F5FFF9] relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">
              Why Green Mind?
            </h2>

            <p className="text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
              Modern education often focuses on knowledge alone. Green Mind goes
              further by helping children build character, confidence, and care
              for the planet. With Green Mind, children don’t just learn — they
              practice, engage, and grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="reveal reveal-delay-1">
              <Feature
                title="Positive Education"
                desc="Build empathy and kindness"
                img="/SCreen/le-1.jpg"
              />
            </div>
            <div className="reveal reveal-delay-2">
              <Feature
                title="Learning by Playing"
                desc="Fun and interactive lessons"
                img="/SCreen/le-2.jpg"
              />
            </div>
            <div className="reveal reveal-delay-3">
              <Feature
                title="Real Practice"
                desc="Apply learning in real life"
                img="/SCreen/le-3.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW ================= */}
      <section className="py-24 px-10 bg-white shadow-inner relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-green-700">
              How Green Mind Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 p-4">
            <div className="reveal reveal-delay-1">
              <Step num="1" title="Learn" img="/SCreen/learn.jpg" />
            </div>
            <div className="reveal reveal-delay-2">
              <Step num="2" title="Play" img="/SCreen/play.jpg" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-6 p-4">
            <div className="reveal reveal-delay-1">
              <Step num="3" title="Scan" img="/SCreen/scan.png" />
            </div>
            <div className="reveal reveal-delay-2">
              <Step num="4" title="Grow" img="/SCreen/grow.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOR ================= */}
      <section className="bg-[#F5FFF9] py-24 px-10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 text-center mb-20">
              For Parents & Children
            </h2>
          </div>

          {/* Children Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-12 reveal">
            {/* Text Content */}
            <div className="flex-1 text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 flex items-center gap-2">
                🌱 For Children
              </h3>
              <ul className="space-y-4 text-gray-700 text-base md:text-lg ml-2">
                <li className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                  <span className="text-green-500 text-xl">✔</span> Learn through interactive games & quizzes
                </li>
                <li className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                  <span className="text-green-500 text-xl">✔</span> Grow responsibility by watering their virtual tree
                </li>
                <li className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-2">
                  <span className="text-green-500 text-xl">✔</span> Care for the planet with real-world missions
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center md:justify-end transition-all hover:scale-105 duration-500">
              <Image
                src="/SCreen/hum-chi.jpg"
                width={380}
                height={300}
                alt="child"
                className="rounded-3xl shadow-2xl object-cover w-[360px] h-[300px] border-4 border-white"
              />
            </div>
          </div>

          {/* Parents Section */}
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-12 reveal">
            {/* Text Content */}
            <div className="flex-1 text-left md:text-right">
              <h3 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 flex items-center gap-2 justify-start md:justify-end">
                🌱 For Parents
              </h3>
              <ul className="space-y-4 text-gray-700 text-base md:text-lg md:mr-2">
                <li className="flex items-center gap-3 justify-start md:justify-end transition-transform duration-300 hover:-translate-x-2">
                  Track dynamic learning progress <span className="text-green-500 text-xl">✔</span>
                </li>
                <li className="flex items-center gap-3 justify-start md:justify-end transition-transform duration-300 hover:-translate-x-2">
                  View performance & quiz reports <span className="text-green-500 text-xl">✔</span>
                </li>
                <li className="flex items-center gap-3 justify-start md:justify-end transition-transform duration-300 hover:-translate-x-2">
                  Support positive habits & feedback <span className="text-green-500 text-xl">✔</span>
                </li>
              </ul>
            </div>

            {/* Image */}
            <div className="flex-1 flex justify-center md:justify-start transition-all hover:scale-105 duration-500">
              <Image
                src="/SCreen/hum-par.jpg"
                width={380}
                height={300}
                alt="parent"
                className="rounded-3xl shadow-2xl object-cover w-[360px] h-[340px] border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative text-white py-16 px-10 mt-auto bg-cover bg-center rounded-t-[40px] overflow-hidden footer-background">
        {/* Transparent layer */}
        <div className="absolute inset-0 bg-black/55 rounded-t-[40px]"></div>

        {/* Core footer content */}
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 mb-10">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <Image
              src="/SCreen/Group 45.png"
              width={100}
              height={100}
              alt="logo"
              className="mb-4 hover:scale-110 transition duration-300"
            />
            <h3 className="text-2xl font-bold mb-2">🌱 Green Mind</h3>
            <p className="text-sm opacity-80 leading-relaxed">Fun and meaningful eco-learning adventures for kids.</p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-300">Pages</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-green-300 transition duration-200 block">Home</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-green-300 transition duration-200 block">Login</Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-green-300 transition duration-200 block">Signup</Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-green-300">Contact Us</h4>
            <p className="text-sm opacity-80 mb-2">Have questions? Reach out to our team:</p>
            <p className="text-sm font-semibold text-white hover:text-green-300 transition duration-200">
              team_greenmind@gmail.com
            </p>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="relative z-10 border-t border-white/20 pt-8 text-center mt-6">
          <p className="text-sm text-gray-300">
            © 2026 <span className="font-semibold text-white">Green Mind</span>. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: transparent;
        }

        .hero-page {
          background-image: radial-gradient(circle at top, rgba(74,222,128,0.16), transparent 26%), linear-gradient(180deg, #F6FFF6 0%, #EAF5EE 100%);
        }

        .hero-background {
          background-image: url('/SCreen/screen-home.jpg');
        }

        .footer-background {
          background-image: url('/SCreen/screen-home.jpg');
        }

        .hero-image-delay {
          animation-delay: 0.2s;
        }

        .leaf-delay-0 {
          animation-delay: 0s;
        }

        .leaf-delay-1 {
          animation-delay: 1s;
        }

        .leaf-delay-2 {
          animation-delay: 2s;
        }

        .leaf-delay-3 {
          animation-delay: 3s;
        }

        .leaf-delay-4 {
          animation-delay: 4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
            filter: blur(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(25px) scale(0.98);
          filter: blur(10px);
          animation: fadeInUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes floatBack {
          0%, 100% {
            transform: translateY(0px) rotate(-8deg);
          }
          50% {
            transform: translateY(-5px) rotate(-7deg);
          }
        }
        
        @keyframes floatFront {
          0%, 100% {
            transform: translateY(0px) rotate(3deg);
          }
          50% {
            transform: translateY(-6px) rotate(2deg);
          }
        }
        
        @keyframes floatMascot {
          0%, 100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) scale(1.02) rotate(1deg);
          }
        }
        
        .animate-float-back {
          animation: floatBack 9s ease-in-out infinite;
        }
        
        .animate-float-front {
          animation: floatFront 8s ease-in-out infinite;
        }
        
        .animate-float-mascot {
          animation: floatMascot 7.5s ease-in-out infinite;
        }

        @keyframes leafFall1 {
          0% {
            transform: translate(0, -20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translate(50px, 280px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes leafFall2 {
          0% {
            transform: translate(0, -20px) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.65;
          }
          85% {
            opacity: 0.65;
          }
          100% {
            transform: translate(-60px, 260px) rotate(-270deg);
            opacity: 0;
          }
        }

        .leaf {
          position: absolute;
          pointer-events: none;
          opacity: 0.75;
          filter: blur(0.8px);
        }
        
        .leaf-1 {
          animation: leafFall1 14s infinite linear;
        }
        
        .leaf-2 {
          animation: leafFall2 17s infinite linear;
        }
        
        .leaf-3 {
          animation: leafFall1 16s infinite linear;
        }
        
        .leaf-4 {
          animation: leafFall2 12s infinite linear;
        }

        .btn-primary {
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 45px rgba(18, 46, 28, 0.15);
          transition: transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-1px) scale(1.02);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 24px 55px rgba(18, 46, 28, 0.18);
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(16px);
          box-shadow: 0 15px 35px rgba(18, 46, 28, 0.1);
          transition: transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease;
        }

        .secondary-btn:hover {
          transform: translateY(-1px) scale(1.02);
          background: rgba(255, 255, 255, 0.22);
          box-shadow: 0 20px 45px rgba(18, 46, 28, 0.12);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.64);
          backdrop-filter: blur(18px);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
        }

        .shadow-soft {
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
        }

        .shadow-soft-lg {
          box-shadow: 0 34px 90px rgba(15, 23, 42, 0.1);
        }

        .reveal {
          opacity: 0;
          transform: translateY(35px) scale(0.98);
          filter: blur(12px);
          transition: opacity 0.95s ease, transform 0.95s ease, filter 0.95s ease;
        }
        
        .reveal-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
        
        .reveal-delay-1 {
          transition-delay: 0.1s;
        }
        
        .reveal-delay-2 {
          transition-delay: 0.2s;
        }
        
        .reveal-delay-3 {
          transition-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}

/* ================= Components ================= */
function Feature({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <div className="glass-card p-7 rounded-[32px] border border-white/50 hover:border-white/60 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col h-full">
      <div className="overflow-hidden rounded-2xl mb-5 aspect-video relative">
        <Image
          src={img}
          fill
          alt={title}
          className="object-cover transition-transform duration-500 hover:scale-115"
        />
      </div>
      <h3 className="font-bold mb-2 text-xl text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({ num, title, img }: { num: string; title: string; img: string }) {
  return (
    <div className="glass-card p-8 rounded-[36px] border border-white/50 hover:border-white/60 shadow-soft hover:shadow-soft-lg hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col items-center">
      <div className="w-10 h-10 bg-green-50 text-green-600 font-extrabold text-xl rounded-full flex items-center justify-center mb-4 shadow-sm border border-green-100">
        {num}
      </div>
      <div className="overflow-hidden rounded-2xl mb-5 w-full aspect-[4/3] relative">
        <Image
          src={img}
          fill
          alt={title}
          className="object-cover transition-transform duration-500 hover:scale-115"
        />
      </div>
      <h4 className="font-bold text-xl text-gray-800">{title}</h4>
    </div>
  );
}