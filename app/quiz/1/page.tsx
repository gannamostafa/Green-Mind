"use client";
import { useState } from "react";
import Image from "next/image";

const questions = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  question: "Which item can be recycled?",
  options: ["Plastic", "Paper", "Glass", "Metal"],
  correctIndex: 0,
}));

export default function RecyclingQuiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex: number, oIndex: number) => {
    const copy = [...answers];
    copy[qIndex] = oIndex;
    setAnswers(copy);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctCount = answers.filter(
    (ans, i) => ans === questions[i].correctIndex
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 shadow-md bg-gradient-to-r from-[#00c9ff] to-[#02fe9d]">
        <h1 className="text-white text-2xl font-bold text-center">Quiz 1</h1>
      </nav>

      {/* Intro Section */}
      <div className="flex flex-col md:flex-row items-center m-1 gap-1 px-6 py-2">
        <div className="flex-1">
          <p className="text-[#0b3d00] text-lg font-medium text-center md:text-right mr-4">
            Read The Question <br />
            And Choose The Correct
          </p>
        </div>

        <div className="flex-1 flex justify-left ml-6 mt-5">
          <Image
            src="/SCreen/Group 45.png"
            alt="Recycling illustration"
            width={150}
            height={150}
          />
        </div>
      </div>

      {/* Quiz Content */}
     
<div className="flex items-center justify-center mb-20 px-4">

        <div className="rounded-2xl shadow-xl w-full max-w-3xl p-2">
          {questions.map((q, qIndex) => (
            <div key={q.id} className="mb-4">
              {/* Question */}
              <div className="flex items-center mb-2 gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#00aeef] text-white font-bold text-sm">
                  {q.id}
                </span>
                <p className="font-bold text-lg">{q.question}</p>
              </div>

            
              <div className="grid grid-cols-2 gap-1 mt-1 p-1">
                {q.options.map((opt, oIndex) => (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(qIndex, oIndex)}
                    disabled={submitted}
                    className={`h-10 px-4 rounded-lg border-2 border-[#1baa00]
                      text-center font-medium text-sm transition-colors duration-200
                      ${
                        answers[qIndex] === oIndex
                          ? "bg-green-500 text-white"
                          : "bg-white"
                      }
                      ${
                        submitted && oIndex === q.correctIndex
                          ? "bg-green-500 text-white"
                          : ""
                      }
                      ${
                        submitted &&
                        answers[qIndex] === oIndex &&
                        answers[qIndex] !== q.correctIndex
                          ? "bg-red-500 text-white"
                          : ""
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

{!submitted && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit}
                className="px-10 py-2 bg-gradient-to-r from-[#0dff49] to-[#27661e]
                           text-white rounded-lg font-bold text-lg"
              >
                Confirm
              </button>
            </div>
          )}

         
          {submitted && (
  <div className="flex justify-center mt-5">
    {correctCount >= 3 ? (
     
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <p className="font-bold text-2xl text-[#000000]">
          {correctCount} / {questions.length} Correct Answers
        </p>
        <p className="mt-2 text-2xl text-[#3ef772] font-bold">Good Work!</p>
        <div className="grid grid-cols-3 gap-2 mt-2 justify-items-center">
          <span className="text-yellow-400 text-3xl">★</span>
          <span className="text-yellow-400 text-3xl">★</span>
          <span className="text-yellow-400 text-3xl">★</span>
        </div>
      </div>
    ) : (
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <p className="font-bold text-2xl text-red-500">
          Only {correctCount} / {questions.length} Correct
        </p>
        <p className="mt-2 text-xl text-red-500 font-bold">Try Again!</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-[#0dff49] to-[#27661e] text-white rounded-lg font-bold text-lg"
        >
          Retry
        </button>
      </div>
    )}
  </div>
)}

        </div>
      </div>
    </div>
  );
}