// src/pages/CapitalsQuiz.jsx
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaLandmark, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_TIME = 15;

export default function CapitalsQuiz() {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(QUIZ_TIME);
  const [showResultOverlay, setShowResultOverlay] = useState(null); // 'success' | 'fail' | null
  const timerRef = useRef(null);

  // Load countries from backend
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://quiznest-backend.onrender.com/api/countries");
        const data = await res.json();
        const list = data.countries || data;
        // keep full objects (name, capital, flag, region, etc)
        const filtered = list.filter((c) => c.capital && c.capital.length > 0 && c.flag);
        setCountries(filtered);
        if (filtered.length > 0) generateNewQuestion(filtered);
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    }
    fetchCountries();
    // cleanup if unmounted
    return () => clearInterval(timerRef.current);
  }, []);

  // timer effect
  useEffect(() => {
    if (!question || selectedAnswer) return;
    if (timer === 0) {
      // mark wrong and show animation (timeout)
      setSelectedAnswer({ capital: "__timeout__" });
      setShowResultOverlay("fail");
      setTimeout(() => {
        setShowResultOverlay(null);
        generateNewQuestion(countries);
      }, 900);
      return;
    }
    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, question, selectedAnswer, countries]);

  // generate question
  const generateNewQuestion = (countryList = countries) => {
    if (!countryList || countryList.length < 4) return;
    const correct = countryList[Math.floor(Math.random() * countryList.length)];
    const options = [correct];
    // pick 3 unique randoms
    while (options.length < 4) {
      const random = countryList[Math.floor(Math.random() * countryList.length)];
      if (!options.find((c) => c.capital === random.capital)) options.push(random);
    }
    const shuffled = options.sort(() => 0.5 - Math.random());
    setQuestion({ correct, options: shuffled });
    setSelectedAnswer(null);
    setQuestionCount((p) => p + 1);
    setTimer(QUIZ_TIME);
  };

  // handle answer click
  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);

    const isCorrect = option.capital === question.correct.capital;
    if (isCorrect) {
      setScore((p) => p + 1);
      setShowResultOverlay("success");
    } else {
      setShowResultOverlay("fail");
    }

    // show result briefly then next
    setTimeout(() => {
      setShowResultOverlay(null);
      generateNewQuestion();
    }, 900);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setQuestionCount(0);
    generateNewQuestion();
  };

  // progress for bar
  const progress = Math.max(0, (timer / QUIZ_TIME) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-800 to-rose-700">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -left-32 -top-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 opacity-30 blur-3xl mix-blend-screen"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] bottom-[-120px] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-yellow-300 to-pink-400 opacity-25 blur-2xl mix-blend-screen"
        animate={{ x: [0, -40, 0], y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* center glass card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4 p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top row: nav + timer chip */}
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition"
          >
            <FaArrowLeft /> Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/80 bg-white/6 px-3 py-1 rounded-full">
              <strong className="font-semibold text-white">{score}</strong>{" "}
              <span className="text-slate-300">/ {Math.max(0, questionCount - 1)}</span>
            </div>
            <div className="text-xs text-white/80 bg-white/6 px-3 py-1 rounded-full">
              ⏱️ {timer}s
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          Capitals Quiz
        </h1>

        {/* Question card */}
        <div className="bg-white/6 rounded-2xl p-4 mb-4 border border-white/8">
          <div className="flex items-center gap-3">
            {/* Flag */}
            <div className="w-20 h-12 rounded-md overflow-hidden flex-shrink-0 bg-white/10 border border-white/6">
              {question?.correct?.flag ? (
                <img
                  src={question.correct.flag}
                  alt={`${question.correct.name} flag`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-white/60">
                  No flag
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-white/80">Which country has the capital</p>
              <div className="text-lg sm:text-xl font-semibold text-white">
                {question ? question.correct.capital : "Loading..."}
              </div>
            </div>
          </div>

          {/* animated progress bar */}
          <div className="mt-4 h-2 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300"
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question?.options?.map((option, i) => {
            const isCorrect = option.capital === question.correct.capital;
            const isSelected = selectedAnswer?.capital === option.capital;

            // compute classes
            let base = "py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 justify-center transition-all";
            let color = "bg-white/8 text-white/90 hover:bg-white/12";
            if (selectedAnswer) {
              if (isSelected && isCorrect) color = "bg-emerald-500 text-white shadow-lg";
              else if (isSelected && !isCorrect) color = "bg-rose-500 text-white shadow-lg";
              else if (isCorrect) color = "bg-emerald-300 text-white/900";
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`${base} ${color} border border-white/6`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaLandmark className="opacity-90" />
                <span>{option.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* controls */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={handlePlayAgain}
            className="text-sm px-4 py-2 rounded-full bg-white/8 text-white/90 hover:bg-white/12 transition"
          >
            Play Again
          </button>

          <div className="text-xs text-white/70">Questions: {questionCount}</div>
        </div>
      </motion.div>

      {/* result overlay (success/fail) */}
      <AnimatePresence>
        {showResultOverlay === "success" && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/6 backdrop-blur-md px-6 py-5 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FaCheck className="text-emerald-400 text-2xl" />
              <div className="text-white font-semibold">Correct!</div>

              {/* little particle dots */}
              <motion.div
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9 }}
              />
            </motion.div>
          </motion.div>
        )}

        {showResultOverlay === "fail" && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/6 backdrop-blur-md px-6 py-5 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <FaTimes className="text-rose-400 text-2xl" />
              <div className="text-white font-semibold">Wrong</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
