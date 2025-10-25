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
  const [overlay, setOverlay] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const data = await countriesAPI.getAll();
        const filtered = data.countries.filter((c) => c.region && c.name);
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
      setOverlay("fail");
      setTimeout(() => {
        setOverlay(null);
        generateQuestion();
      }, 900);
      return;
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, question, selectedAnswer]);

  const generateQuestion = (list = countries) => {
    if (!list || list.length < 4) return;
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

  const completeQuiz = async () => {
    setIsComplete(true);
    clearInterval(timerRef.current);
    
    if (isAuthenticated) {
      try {
        await quizAPI.saveAttempt({
          quizType: 'geography',
          score: (score / QUESTIONS_PER_QUIZ) * 100,
          totalQuestions: QUESTIONS_PER_QUIZ,
          correctAnswers: score
        });
      } catch (error) {
        console.error('Error saving quiz attempt:', error);
      }
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setQuestionCount(0);
    setIsComplete(false);
    setTimer(QUIZ_TIME);
    generateQuestion();
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === question.correct) {
      setScore((p) => p + 1);
      setOverlay("success");
    } else {
      setOverlay("fail");
    }
    setTimeout(() => {
      setOverlay(null);
      generateQuestion();
    }, 900);
  };

  const progress = Math.max(0, (timer / QUIZ_TIME) * 100);

  if (isComplete) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <motion.div
          className="relative z-10 w-full max-w-md mx-4 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
          <div className="space-y-4 mb-6">
            <p className="text-white/90">Final Score: {score} / {QUESTIONS_PER_QUIZ}</p>
            <p className="text-white/90">Accuracy: {((score / QUESTIONS_PER_QUIZ) * 100).toFixed(1)}%</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePlayAgain}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              <FaRedo /> Try Again
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              <FaArrowLeft /> Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background orbs */}
      <motion.div
        className="absolute w-[450px] h-[450px] bg-gradient-to-br from-fuchsia-500 to-purple-400 rounded-full blur-3xl opacity-25 -top-40 -left-40"
        animate={{ x: [0, 30, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-indigo-400 to-pink-500 rounded-full blur-3xl opacity-25 bottom-[-80px] right-[-80px]"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Quiz card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-105"
          >
            <FaArrowLeft className="text-sm" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <p className="text-white/80 bg-white/10 px-3 py-1 rounded-full text-xs">
              Score: <span className="text-white">{score}</span>
            </p>
            <p className="text-white/80 bg-white/10 px-3 py-1 rounded-full text-xs">
              ⏱ {timer}s
            </p>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-5 flex items-center gap-2">
          <FaGlobeAmericas className="text-pink-300" /> Geography Quiz
        </h1>

        {/* Question */}
        {question && (
          <motion.p
            className="text-lg text-white/90 font-medium mb-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            🌍 Which region does{" "}
            <span className="font-bold text-pink-300">{question.country}</span>{" "}
            belong to?
          </motion.p>
        )}

        {/* Timer bar */}
        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-5">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-300"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question?.options.map((option, i) => {
            const isCorrect = option === question.correct;
            const isSelected = selectedAnswer === option;

            let base =
              "py-3 px-4 rounded-xl font-semibold transition-all text-white border border-white/10";
            let style = "bg-white/10 hover:bg-white/15 hover:scale-105";
            if (selectedAnswer) {
              if (isSelected && isCorrect) style = "bg-fuchsia-500 text-white shadow-lg";
              else if (isSelected && !isCorrect) style = "bg-rose-500 text-white";
              else if (isCorrect) style = "bg-pink-300 text-slate-900";
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`${base} ${style}`}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`px-8 py-6 rounded-2xl bg-white/20 border border-white/10 backdrop-blur-lg flex items-center gap-3 shadow-2xl ${
                overlay === "success" ? "text-fuchsia-400" : "text-rose-400"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {overlay === "success" ? (
                <>
                  <FaCheck className="text-3xl" />
                  <span className="text-white font-semibold text-lg">
                    Correct!
                  </span>
                </>
              ) : (
                <>
                  <FaTimes className="text-3xl" />
                  <span className="text-white font-semibold text-lg">
                    Wrong!
                  </span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
