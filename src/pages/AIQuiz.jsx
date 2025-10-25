// src/pages/AIQuiz.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { aiAPI } from "../utils/api";
import { topics } from "../utils/topics";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaRedo,
  FaArrowRight,
  FaDice,
  FaArrowLeft,
} from "react-icons/fa";

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.98 },
};

const questionVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export default function AIQuiz() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const resetQuiz = () => {
    setQuiz([]);
    setCurrentQuestion(0);
    setLoading(false);
    setError(null);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setIsComplete(false);
  };

  const handleGenerateQuiz = async (topicToGenerate) => {
    if (!topicToGenerate || topicToGenerate.trim() === "") {
      setError("Please enter or select a topic.");
      return;
    }
    
    setLoading(true);
    setError(null);
    setQuiz([]);
    setIsComplete(false);
    setScore(0);
    setCurrentQuestion(0);
    setIsAnswered(false);
    setSelectedOption(null);

    try {
      const responseData = await aiAPI.generateQuiz(topicToGenerate);
      const text = responseData?.textResponse || responseData?.text || "";

      if (!text || text.trim() === "") {
        throw new Error("No quiz text found from backend.");
      }

      const quizItems = text
        .split(/---+/)
        .map((block) => {
          const questionMatch = block.match(/^\s*\d+\.\s*(.+)/m);
          const optionsMatches = [...block.matchAll(/^[ \t]*([A-D])\)\s*(.+)$/gm)];
          const correctMatch = block.match(/\*\*Correct Answer:\s*[A-D]\)\s*(.+?)\*\*/);

          if (!questionMatch || optionsMatches.length !== 4 || !correctMatch) {
            return null;
          }
          const question = questionMatch[1].trim();
          const options = optionsMatches.map((m) => m[2].trim());
          const correctAnswer = correctMatch[1].trim();
          return { question, options, correctAnswer };
        })
        .filter(Boolean);

      if (quizItems.length === 0) {
        throw new Error("Unable to parse questions from AI response.");
      } else {
        setQuiz(quizItems);
      }
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError(err.message || "Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateQuiz(topic);
  };

  const handleRandomQuiz = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setTopic(randomTopic);
    handleGenerateQuiz(randomTopic);
  };

  const handleDropdownChange = (e) => {
    const selectedTopic = e.target.value;
    if (selectedTopic) {
      setTopic(selectedTopic);
      handleGenerateQuiz(selectedTopic);
    }
  };

  const handleAnswerClick = (option) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(option);
    const current = quiz[currentQuestion];
    const isCorrect = option === current.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion((q) => q + 1);
        setIsAnswered(false);
        setSelectedOption(null);
      } else {
        setIsComplete(true);
      }
    }, 1200);
  };

  const getButtonClass = (option) => {
    const base = "w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-center justify-between disabled:opacity-100";
    
    if (!isAnswered) {
      return `${base} bg-white/8 border-white/10 hover:bg-white/12 hover:border-white/20 text-white`;
    }

    const isCorrect = option === quiz[currentQuestion].correctAnswer;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return `${base} bg-emerald-500/20 border-emerald-400 text-white shadow-lg`;
    }
    if (isSelected && !isCorrect) {
      return `${base} bg-rose-500/20 border-rose-400 text-white shadow-lg`;
    }
    return `${base} bg-white/5 border-white/10 opacity-50 text-white`;
  };

  const progress = isComplete
    ? 100
    : quiz.length > 0
    ? ((currentQuestion + 1) / quiz.length) * 100
    : 0;

  const renderInputState = () => (
    <motion.div
      key="input"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <FaBrain className="text-3xl text-blue-400" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Quiz Generator</h1>
      </div>
      <p className="text-white/70 mb-6 text-sm sm:text-base">
        Enter a topic, select from presets, or try a random quiz!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError(null);
            }}
            className="flex-grow p-3 rounded-xl bg-white/8 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/50"
            placeholder="e.g., 'Ancient Egypt', 'JavaScript ES6'"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex-shrink-0 flex items-center justify-center gap-2 p-3 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-all duration-200 disabled:opacity-50 hover:scale-105"
          >
            Generate <FaArrowRight className="text-sm" />
          </button>
        </div>

        <div className="relative flex items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-white/50 text-xs uppercase tracking-wide">or</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            onChange={handleDropdownChange}
            value=""
            className="p-3 rounded-xl bg-white/8 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white appearance-none cursor-pointer"
          >
            <option value="">Select a preset topic...</option>
            {topics.map((t, idx) => (
              <option key={idx} value={t} className="bg-slate-800">
                {t}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleRandomQuiz}
            disabled={loading}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/8 hover:bg-white/12 text-white font-semibold transition-all duration-200 disabled:opacity-50 border border-white/10 hover:scale-105"
          >
            <FaDice /> Random Topic
          </button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -left-32 -top-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 blur-3xl mix-blend-screen"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] bottom-[-120px] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-15 blur-2xl mix-blend-screen"
        animate={{ x: [0, -40, 0], y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-105"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Card */}
      <motion.div
        layout
        className="relative z-10 w-full max-w-2xl p-6 sm:p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {/* Loading State */}
          {loading && (
            <motion.div
              key="loading"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <FaSpinner className="animate-spin text-5xl text-blue-400" />
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Generating your quiz...
              </h2>
              <p className="text-white/60 text-sm">This may take a few moments</p>
            </motion.div>
          )}

          {/* Error State */}
          {!loading && error && (
            <motion.div
              key="error"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center py-20 gap-4 text-center"
            >
              <FaExclamationTriangle className="text-5xl text-rose-400" />
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Oops! Something went wrong
              </h2>
              <p className="text-white/70 text-sm max-w-md">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-4 flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold text-white hover:scale-105"
              >
                <FaRedo /> Try Again
              </button>
            </motion.div>
          )}

          {/* Complete State */}
          {!loading && !error && isComplete && (
            <motion.div
              key="complete"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center py-16 gap-6 text-center"
            >
              <div className="bg-white/6 rounded-2xl p-8 border border-white/10 w-full">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Quiz Complete! 🎉
                </h2>
                <div className="text-6xl font-bold text-blue-400 mb-3">
                  {score} / {quiz.length}
                </div>
                <p className="text-white/80 text-lg mb-4">
                  You got {Math.round((score / quiz.length) * 100)}% correct!
                </p>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / quiz.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>

              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all font-semibold text-white hover:scale-105"
              >
                <FaRedo /> Create Another Quiz
              </button>
            </motion.div>
          )}

          {/* Quiz State */}
          {!loading && !error && !isComplete && quiz.length > 0 && (
            <motion.div
              key="quiz"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-white truncate">
                  {topic}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    Score: <span className="font-semibold text-white">{score}</span>
                  </div>
                  <div className="text-xs text-white/80 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <span className="font-semibold text-white">{currentQuestion + 1}</span> / {quiz.length}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6 border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-400"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Question */}
              <div className="bg-white/6 rounded-2xl p-5 mb-6 border border-white/10 min-h-[120px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={currentQuestion}
                    variants={questionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="text-lg sm:text-xl font-semibold text-white leading-relaxed"
                  >
                    {quiz[currentQuestion].question}
                  </motion.h2>
                </AnimatePresence>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {quiz[currentQuestion].options.map((option, idx) => {
                  const isCorrect = option === quiz[currentQuestion].correctAnswer;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className={getButtonClass(option)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      <span className="flex-1 text-sm sm:text-base">{option}</span>
                      {isAnswered && isCorrect && (
                        <FaCheck className="text-emerald-400 text-lg flex-shrink-0" />
                      )}
                      {isAnswered && !isCorrect && selectedOption === option && (
                        <FaTimes className="text-rose-400 text-lg flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Input State */}
          {!loading && !error && !isComplete && quiz.length === 0 && renderInputState()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}