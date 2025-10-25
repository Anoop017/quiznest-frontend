// src/pages/GeographyQuiz.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaGlobeAmericas, FaArrowLeft, FaCheck, FaTimes, FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { countriesAPI, quizAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const QUIZ_TIME = 15;
const QUESTIONS_PER_QUIZ = 10;

export default function GeographyQuiz() {
  const { isAuthenticated } = useAuth();
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(QUIZ_TIME);
  const [showResultOverlay, setShowResultOverlay] = useState(null); // 'success' | 'fail' | null
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const data = await countriesAPI.getAll();
        const list = data.countries || data;
        const filtered = list.filter((c) => c.region && c.name);
        setCountries(filtered);
        if (filtered.length > 0) generateQuestion(filtered);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    }
    fetchCountries();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!question || selectedAnswer) return;
    if (timer === 0) {
      setSelectedAnswer("__timeout__");
      setShowResultOverlay("fail");
      setTimeout(() => {
        setShowResultOverlay(null);
        generateQuestion();
      }, 900);
      return;
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, question, selectedAnswer]);

  const generateQuestion = (list = countries) => {
    if (!list || list.length < 4) return;

    // Check if quiz is complete
    if (questionCount >= QUESTIONS_PER_QUIZ) {
      completeQuiz();
      return;
    }

    const correct = list[Math.floor(Math.random() * list.length)];
    const regions = [...new Set(list.map((c) => c.region))].filter(Boolean);
    const options = [correct.region];
    while (options.length < 4) {
      const random = regions[Math.floor(Math.random() * regions.length)];
      if (!options.includes(random)) options.push(random);
    }
    const shuffled = options.sort(() => 0.5 - Math.random());
    setQuestion({
      country: correct.name,
      correct: correct.region,
      options: shuffled,
    });
    setSelectedAnswer(null);
    setQuestionCount((p) => p + 1);
    setTimer(QUIZ_TIME);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);

    const isCorrect = answer === question.correct;
    if (isCorrect) {
      setScore((p) => p + 1);
      setShowResultOverlay("success");
    } else {
      setShowResultOverlay("fail");
    }

    setTimeout(() => {
      setShowResultOverlay(null);
      generateQuestion();
    }, 900);
  };

  const completeQuiz = async () => {
    setIsComplete(true);
    clearInterval(timerRef.current);

    if (isAuthenticated) {
      try {
        await quizAPI.saveAttempt({
          quizType: "geography",
          score: (score / QUESTIONS_PER_QUIZ) * 100,
          totalQuestions: QUESTIONS_PER_QUIZ,
          correctAnswers: score,
        });
      } catch (error) {
        console.error("Error saving quiz attempt:", error);
      }
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setQuestionCount(0);
    setIsComplete(false);
    generateQuestion();
  };

  const progress = Math.max(0, (timer / QUIZ_TIME) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -left-32 -top-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500 to-purple-400 opacity-30 blur-3xl mix-blend-screen"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] bottom-[-120px] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-indigo-400 to-pink-500 opacity-25 blur-2xl mix-blend-screen"
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
        {/* Top row: nav + score/timer */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-105"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-xs text-white/80 bg-white/6 px-3 py-1 rounded-full">
              <strong className="font-semibold text-white">{score}</strong>{" "}
              <span className="text-slate-300">/ {Math.max(0, questionCount - 1)}</span>
            </div>
            {!isComplete && (
              <div className="text-xs text-white/80 bg-white/6 px-3 py-1 rounded-full">
                ⏱️ {timer}s
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <FaGlobeAmericas className="text-pink-300" /> Geography Quiz
        </h1>

        {/* Question section - Only show when quiz is not complete */}
        {!isComplete && (
          <>
            {/* Question Display */}
            <div className="bg-white/6 rounded-2xl p-4 mb-4 border border-white/8">
              {question && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-sm text-white/80 mb-2">Which region does</p>
                  <p className="text-xl sm:text-2xl font-bold text-pink-300 mb-3">
                    {question.country}
                  </p>
                  <p className="text-sm text-white/80">belong to?</p>
                </motion.div>
              )}

              {/* animated progress bar */}
              <div className="mt-4 h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-300"
                  initial={{ width: "100%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question?.options?.map((option, i) => {
                const isCorrect = option === question.correct;
                const isSelected = selectedAnswer === option;

                let base = "py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 justify-center transition-all";
                let color = "bg-white/8 text-white/90 hover:bg-white/12";
                if (selectedAnswer) {
                  if (isSelected && isCorrect) color = "bg-fuchsia-500 text-white shadow-lg";
                  else if (isSelected && !isCorrect) color = "bg-rose-500 text-white shadow-lg";
                  else if (isCorrect) color = "bg-pink-300 text-slate-900";
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
                    <FaGlobeAmericas className="opacity-90" />
                    <span className="text-center">{option}</span>
                  </motion.button>
                );
              })}
            </div>
          </>
        )}

        {/* controls - show during quiz */}
        {!isComplete && (
          <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
            <button
              onClick={handlePlayAgain}
              className="text-sm px-4 py-2 rounded-full bg-white/8 text-white/90 hover:bg-white/12 transition"
            >
              Play Again
            </button>

            <div className="text-xs text-white/70">
              Questions: {questionCount} / {QUESTIONS_PER_QUIZ}
            </div>
          </div>
        )}

        {/* Quiz Complete - Results Screen */}
        {isComplete && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/6 rounded-2xl p-6 mb-4 border border-white/8">
              <h2 className="text-2xl font-bold text-white mb-3">Quiz Complete!</h2>
              <div className="text-5xl font-bold text-fuchsia-400 mb-2">
                {score} / {QUESTIONS_PER_QUIZ}
              </div>
              <p className="text-white/80 text-lg mb-4">
                You got {Math.round((score / QUESTIONS_PER_QUIZ) * 100)}% correct!
              </p>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-fuchsia-400 to-pink-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / QUESTIONS_PER_QUIZ) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handlePlayAgain}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold transition-all duration-200 hover:scale-105 justify-center"
              >
                <FaRedo className="text-sm" />
                <span>Play Again</span>
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/10 transition-all duration-200 hover:scale-105 justify-center"
              >
                <FaArrowLeft className="text-sm" />
                <span>Back to Home</span>
              </Link>
            </div>
          </motion.div>
        )}
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
              <FaCheck className="text-fuchsia-400 text-2xl" />
              <div className="text-white font-semibold">Correct!</div>
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