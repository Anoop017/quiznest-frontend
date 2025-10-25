// src/pages/FlagQuiz.jsx
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaFlag, FaArrowLeft, FaCheck, FaTimes, FaRedo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { countriesAPI, quizAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const QUIZ_TIME = 15;
const QUESTIONS_PER_QUIZ = 10;

export default function FlagQuiz() {
  const { isAuthenticated } = useAuth();
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(QUIZ_TIME);
  const [showResultOverlay, setShowResultOverlay] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);
  
  // Track quiz start time and total time spent
  const quizStartTimeRef = useRef(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const data = await countriesAPI.getAll();
        const list = data.countries || data;
        const filtered = list
          .filter((c) => c.flag)
          .map((c) => ({
            name: c.name,
            flag: c.flag,
          }));

        setCountries(filtered);
        if (filtered.length > 0) {
          generateQuestion(filtered);
          // Start tracking time when quiz begins
          quizStartTimeRef.current = Date.now();
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    }
    fetchCountries();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!question || selectedAnswer) return;
    if (timer === 0) {
      setSelectedAnswer({ name: "__timeout__" });
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
    const options = [correct];
    while (options.length < 4) {
      const random = list[Math.floor(Math.random() * list.length)];
      if (!options.find((o) => o.name === random.name)) options.push(random);
    }
    const shuffled = options.sort(() => 0.5 - Math.random());
    setQuestion({ correct, options: shuffled });
    setSelectedAnswer(null);
    setQuestionCount((p) => p + 1);
    setTimer(QUIZ_TIME);
  };

  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);

    const isCorrect = option.name === question.correct.name;
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

    // Calculate total time spent in minutes
    const timeSpentInMinutes = quizStartTimeRef.current 
      ? Math.round((Date.now() - quizStartTimeRef.current) / 60000) 
      : 0;
    setTotalTimeSpent(timeSpentInMinutes);

    if (isAuthenticated) {
      try {
        await quizAPI.saveAttempt({
          quizType: "flag",
          score: (score / QUESTIONS_PER_QUIZ) * 100,
          totalQuestions: QUESTIONS_PER_QUIZ,
          correctAnswers: score,
          timeSpent: Math.max(1, timeSpentInMinutes) // Ensure at least 1 minute
        });
        console.log('Quiz attempt saved successfully');
      } catch (error) {
        console.error("Error saving quiz attempt:", error);
      }
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setQuestionCount(0);
    setIsComplete(false);
    setTotalTimeSpent(0);
    quizStartTimeRef.current = Date.now(); // Reset start time
    generateQuestion();
  };

  const progress = Math.max(0, (timer / QUIZ_TIME) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -left-32 -top-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 opacity-30 blur-3xl mix-blend-screen"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] bottom-[-120px] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-green-400 to-teal-500 opacity-25 blur-2xl mix-blend-screen"
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
          <FaFlag className="text-cyan-300" /> Flag Quiz
        </h1>

        {/* Question section - Only show when quiz is not complete */}
        {!isComplete && (
          <>
            {/* Flag Display */}
            <div className="bg-white/6 rounded-2xl p-4 mb-4 border border-white/8 flex flex-col items-center">
              {question?.correct?.flag ? (
                <motion.img
                  key={question.correct.name}
                  src={question.correct.flag}
                  alt="flag"
                  className="w-full max-w-[200px] h-32 object-contain rounded-lg border border-white/10 shadow-lg bg-white/5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="w-full max-w-[200px] h-32 flex items-center justify-center text-white/60 text-sm">
                  Loading flag...
                </div>
              )}

              <p className="text-sm text-white/80 mt-3 text-center">
                Which country does this flag belong to?
              </p>

              {/* animated progress bar */}
              <div className="mt-4 w-full h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-teal-300"
                  initial={{ width: "100%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question?.options?.map((option, i) => {
                const isCorrect = option.name === question.correct.name;
                const isSelected = selectedAnswer?.name === option.name;

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
                    <FaFlag className="opacity-90" />
                    <span className="text-center">{option.name}</span>
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
              <div className="text-5xl font-bold text-emerald-400 mb-2">
                {score} / {QUESTIONS_PER_QUIZ}
              </div>
              <p className="text-white/80 text-lg mb-4">
                You got {Math.round((score / QUESTIONS_PER_QUIZ) * 100)}% correct!
              </p>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-300"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / QUESTIONS_PER_QUIZ) * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              {totalTimeSpent > 0 && (
                <p className="text-white/60 text-sm">
                  Time spent: {totalTimeSpent} minute{totalTimeSpent !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handlePlayAgain}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all duration-200 hover:scale-105 justify-center"
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
              <FaCheck className="text-emerald-400 text-2xl" />
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