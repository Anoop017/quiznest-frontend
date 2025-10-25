// src/pages/AIQuiz.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { aiAPI } from "../utils/api";
import { topics } from "../utils/topics"; // --- IMPORT THE TOPICS ---
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBrain,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaRedo,
  FaArrowRight,
  FaDice, // --- ADDED FOR RANDOM BUTTON ---
  FaArrowLeft,
} from "react-icons/fa";

// (Animation variants remain the same)
const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.98 },
};

const questionVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
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
    // No topic reset, user might want to re-generate
    setQuiz([]);
    setCurrentQuestion(0);
    setLoading(false);
    setError(null);
    setScore(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setIsComplete(false);
  };
  
  // --- REFACTORED to accept a topic argument ---
  const handleGenerateQuiz = async (topicToGenerate) => {
    if (!topicToGenerate) {
      setError("Please enter or select a topic.");
      return;
    }
    // Set loading and clear old state
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

  // --- NEW: Handles the 'Enter' key press via <form> ---
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateQuiz(topic);
  };

  // --- NEW: Handles the random button click ---
  const handleRandomQuiz = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setTopic(randomTopic); // Update the input field
    handleGenerateQuiz(randomTopic);
  };

  // --- NEW: Handles the dropdown selection ---
  const handleDropdownChange = (e) => {
    const selectedTopic = e.target.value;
    if (selectedTopic) {
      setTopic(selectedTopic); // Update the input field
      handleGenerateQuiz(selectedTopic);
    }
  };
  
  // (handleAnswerClick, getButtonClass, and progress remain the same)
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
    const base =
      "w-full p-4 rounded-lg border text-left transition-all duration-300 flex items-center justify-between group disabled:opacity-100";
    if (!isAnswered) {
      return `${base} bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-blue-500`;
    }
    
    // This check was missing in the button render, but it's correct here.
    const isCorrect = option === quiz[currentQuestion].correctAnswer;
    const isSelected = option === selectedOption;

    if (isCorrect) {
      return `${base} bg-emerald-600/30 border-emerald-500 text-white`;
    }
    if (isSelected && !isCorrect) {
      return `${base} bg-red-600/30 border-red-500 text-white`;
    }
    return `${base} bg-slate-800/50 border-slate-700/50 opacity-60`;
  };

  const progress = isComplete
    ? 100
    : quiz.length > 0
    ? ((currentQuestion + 1) / quiz.length) * 100
    : 0;
  
  // --- Updated JSX for Input State ---
  const renderInputState = () => (
    <motion.div
      key="input"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center gap-3 mb-4">
        <FaBrain className="text-3xl text-blue-400" />
        <h1 className="text-3xl font-bold text-white">AI Quiz Generator</h1>
      </div>
      <p className="text-slate-300 mb-6">
        Type a topic, select a preset, or try a random one!
      </p>
      
      {/* --- NEW: <form> handles 'Enter' key --- */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            if (error) setError(null);
          }}
          className="flex-grow p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          placeholder="e.g., 'The Roman Empire', 'React.js Hooks'"
        />
        <button
          type="submit" // Important for the form
          disabled={loading}
          className="flex-shrink-0 flex items-center justify-center gap-2 p-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors disabled:opacity-50"
        >
          Generate <FaArrowRight />
        </button>
      </form>

      {/* --- NEW: Divider --- */}
      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t border-slate-700"></div>
        <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
        <div className="flex-grow border-t border-slate-700"></div>
      </div>

      {/* --- NEW: Dropdown and Random Button --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          onChange={handleDropdownChange}
          value={topic} // This syncs the dropdown with the text input
          className="p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
        >
          <option value="">Select a preset topic...</option>
          {topics.map((t, idx) => (
            <option key={idx} value={t}>{t}</option>
          ))}
        </select>
        
        <button
          onClick={handleRandomQuiz}
          disabled={loading}
          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors disabled:opacity-50"
        >
          <FaDice /> Random Topic
        </button>
      </div>
    </motion.div>
  );

  // --- The rest of the component ---
  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* (Background elements are the same) */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -80, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-200 hover:scale-105"
        >
          <FaArrowLeft className="text-sm" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Animated Card */}
      <motion.div
        layout
        className="relative z-10 w-full max-w-2xl p-6 sm:p-8 bg-slate-900/70 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center h-64 gap-4"
            >
              <FaSpinner className="animate-spin text-5xl text-blue-400" />
              <h2 className="text-2xl font-semibold text-slate-200">
                Generating your quiz...
              </h2>
              <p className="text-slate-400">Please wait a moment.</p>
            </motion.div>
          )}

          {!loading && error && (
            <motion.div
              key="error"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center h-64 gap-4 text-center"
            >
              <FaExclamationTriangle className="text-5xl text-red-400" />
              <h2 className="text-2xl font-semibold text-slate-200">
                An Error Occurred
              </h2>
              <p className="text-slate-400">{error}</p>
              <button
                onClick={() => {
                  setError(null); // Just clear error, don't reset topic
                }}
                className="mt-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
              >
                <FaRedo /> Try Again
              </button>
            </motion.div>
          )}

          {!loading && !error && isComplete && (
            <motion.div
              key="complete"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center"
            >
              <h2 className="text-4xl font-bold text-white">Quiz Complete!</h2>
              <p className="text-2xl text-slate-300">
                You scored{" "}
                <span className="font-bold text-blue-400">
                  {score} / {quiz.length}
                </span>
              </p>
              <button
                onClick={resetQuiz} // Resets everything *except* topic
                className="mt-4 flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
              >
                <FaRedo /> Create Another Quiz
              </button>
            </motion.div>
          )}

          {!loading && !error && !isComplete && quiz.length > 0 && (
            <motion.div
              key="quiz"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Header: Score and Question Count */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
                <h1 className="text-2xl font-bold text-white truncate">
                  {topic} Quiz
                </h1>
                <div className="flex-shrink-0 text-sm text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  Question{" "}
                  <span className="font-bold text-white">
                    {currentQuestion + 1}
                  </span>
                  /{quiz.length}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 mb-6">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              {/* Animated Question Text */}
              <AnimatePresence mode="out-in">
                <motion.h2
                  key={currentQuestion}
                  variants={questionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl font-semibold mb-6 min-h-[6rem] sm:min-h-[4rem]" // Adjusted min-height for mobile
                >
                  {quiz[currentQuestion].question}
                </motion.h2>
              </AnimatePresence>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quiz[currentQuestion].options.map((option, idx) => {
                  
                  // --- THIS IS THE FIX ---
                  // This variable was missing from the render scope.
                  const isCorrect = option === quiz[currentQuestion].correctAnswer;
                  // --- END OF FIX ---

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className={getButtonClass(option)}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      <span className="flex-1">{option}</span>
                      {/* This code will now work */}
                      {isAnswered && isCorrect && <FaCheck className="text-emerald-500" />}
                      {isAnswered && !isCorrect && selectedOption === option && <FaTimes className="text-red-500" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* --- This is the new entry point --- */}
          {!loading && !error && !isComplete && quiz.length === 0 &&
            renderInputState()
          }
        </AnimatePresence>
      </motion.div>
    </div>
  );
}