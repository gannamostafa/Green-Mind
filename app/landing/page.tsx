"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#F9FFFB] flex flex-col">
      {/* ================= HERO ================= */}
      <section
        className="relative text-white py-24 px-10 rounded-b-[70px] shadow-lg bg-cover bg-center"
        style={{
          backgroundImage: "url('/SCreen/screen-home.jpg')",
        }}
      >
        {/* Overlay علشان الكلام يبان */}
        <div className="absolute inset-0 bg-black/40 rounded-b-[70px]"></div>

        {/* المحتوى */}
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Explore, Learn, and <br /> Build Positive Habits
            </h1>

            <p className="mb-6 text-lg opacity-90">
              Green Mind helps children develop responsibility, empathy, and
              environmental awareness through interactive learning, games, and
              real-world actions.
            </p>

            <div className="flex gap-4">
              <Link href="/">
                <button className="bg-white text-green-700 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition">
                  Get Started
                </button>
              </Link>

              <Link href="/login">
                <button className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-green-700 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>

          {/* ================= IMAGE SECTION ================= */}
          <div className="relative flex justify-center items-center mt-16">
            {/* خلفية مضيئة */}
            <div className="absolute w-[380px] h-[380px] bg-gradient-to-br from-green-300/40 to-teal-200/30 rounded-full blur-3xl"></div>

            {/* الصورة الخلفية */}
            <Image
              src="/SCreen/perant-sce.png"
              width={280}
              height={280}
              alt="dashboard back"
              className="absolute -left-6 rotate-[-8deg] rounded-3xl shadow-xl opacity-90 z-0"
            />

            {/* الصورة الأمامية */}
            <Image
              src="/SCreen/dash-sce.png"
              width={340}
              height={340}
              alt="dashboard front"
              className="relative z-10 rotate-[3deg] rounded-3xl shadow-2xl"
            />

            {/* الكائن الأخضر */}
            <Image
              src="/SCreen/Group 45.png"
              width={180}
              height={180}
              alt="green character"
              className="absolute -bottom-6 -right-10 z-20 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="py-24 px-10 bg-[#F5FFF9]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-700">
            Why Green Mind?
          </h2>

          <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
            Modern education often focuses on knowledge alone. Green Mind goes
            further by helping children build character, confidence, and care
            for the planet. With Green Mind, children don’t just learn — they
            practice, engage, and grow.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="Positive Education"
              desc="Build empathy and kindness"
              img="/SCreen/le-1.jpg" 
            />
            <Feature
              title="Learning by Playing"
              desc="Fun and interactive lessons"
              img="/SCreen/le-2.jpg"
            />
            <Feature
              title="Real Practice"
              desc="Apply learning in real life"
              img="/SCreen/le-3.png"
            />
          </div>
        </div>
      </section>

      {/* ================= HOW ================= */}
      <section className="py-24 px-10 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-14 text-green-700">
            How Green Mind Works
          </h2>

          <div className="grid md:grid-cols-2 gap-50 p-10 ">
            <Step num="1" title="Learn" img="/SCreen/learn.jpg" />
            <Step num="2" title="Play" img="/SCreen/play.jpg" />
          </div>

          <div className="grid md:grid-cols-2 gap-50 mt-10 p-10 ">
            <Step num="3" title="Scan" img="/SCreen/scan.png" />
            <Step num="4" title="Grow" img="/SCreen/grow.jpg" />
          </div>

        </div>
      </section>

      {/* ================= FOR ================= */}
      <section className="bg-[#F5FFF9] py-24 px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          {/* Children */}
          <div className="bg-white rounded-3xl p-8 shadow hover:scale-[1.02] transition">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              For Children
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Learn through play</li>
              <li>✅ Grow responsibility</li>
              <li>✅ Love nature</li>
            </ul>

            <Image
              src="/SCreen/.png"
              width={300}
              height={250}
              alt="child"
              className="mt-6 rounded-xl mx-auto"
            />
          </div>

          {/* Parents */}
          <div className="bg-white rounded-3xl p-8 shadow hover:scale-[1.02] transition">
            <h3 className="text-2xl font-bold mb-4 text-green-700">
              For Parents
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Track progress</li>
              <li>✅ View reports</li>
              <li>✅ Support behavior</li>
            </ul>

            <Image
              src="/SCreen/parent.png"
              width={300}
              height={250}
              alt="parent"
              className="mt-6 rounded-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer
        className="relative text-white py-12 px-10 mt-auto bg-cover bg-center rounded-t-[40px]"
        style={{
          backgroundImage: "url('/SCreen/screen-home.jpg')",
        }}
      >
        {/* Overlay شفاف علشان النص يبان */}
        <div className="absolute inset-0 bg-black/50 rounded-t-[40px]"></div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Logo */}
          <div>
            <h3 className="text-xl font-bold mb-2">🌱 Green Mind</h3>
            <p className="text-sm opacity-80">
              Building better habits for kids.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm opacity-80">team_greenmind@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= Components ================= */
function Feature({ title, desc, img }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
      <Image
        src={img}
        width={80}
        height={80}
        alt={title}
        className="mx-auto mb-4 rounded-lg"
      />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function Step({ num, title, img }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
      <div className="text-green-600 font-bold text-xl mb-2">{num}</div>
      <Image
        src={img}
        width={90}
        height={90}
        alt={title}
        className="mx-auto mb-3 rounded-lg"
      />
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}
