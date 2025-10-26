// src/pages/EmojiMovieQuiz.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaArrowLeft, FaRedo, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { quizAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const quizData = [
  { emojis: '🦁👑', answer: 'The Lion King' },
  { emojis: '🧑‍🚀🌕', answer: 'Interstellar' },
  { emojis: '🕷️🧑', answer: 'Spider-Man' },
  { emojis: '🧊🚢💔', answer: 'Titanic' },
  { emojis: '🐠🔍', answer: 'Finding Nemo' },
  { emojis: '🦖🏞️', answer: 'Jurassic Park' },
  { emojis: '🧙‍♂️🧝‍♂️🗡️', answer: 'The Lord of the Rings' },
  { emojis: '🎤👸🏼', answer: 'Frozen' },
  { emojis: '🐼🥋', answer: 'Kung Fu Panda' },
  { emojis: '🚗🏁', answer: 'Cars' },
  { emojis: '🦇🏙️', answer: 'The Dark Knight' },
  { emojis: '👓⚡🧙‍♂️', answer: 'Harry Potter' },
  { emojis: '🚀👨‍🚀👨‍🦱', answer: 'Guardians of the Galaxy' },
  { emojis: '👨‍🍳🐀', answer: 'Ratatouille' },
  { emojis: '🎈🏠👴🏻', answer: 'Up' },
  { emojis: '🧛‍♂️🩸', answer: 'Dracula' },
  { emojis: '👽📞🏠', answer: 'E.T. the Extra-Terrestrial' },
  { emojis: '🎭🃏🦇', answer: 'Joker' },
  { emojis: '☠️💀🏴‍☠️', answer: 'Pirates of the Caribbean' },
  { emojis: '🧟‍♂️🔫', answer: 'World War Z' },
  { emojis: '👻🔫', answer: 'Ghostbusters' },
  { emojis: '🚴🌕👽', answer: 'E.T. the Extra-Terrestrial' },
  { emojis: '🧊❄️👭', answer: 'Frozen II' },
  { emojis: '👨‍🚀🤖🌌', answer: 'The Martian' },
  { emojis: '🕶️🕵️‍♂️👽', answer: 'Men in Black' },
  { emojis: '👨‍🏫📚🧠', answer: 'A Beautiful Mind' },
  { emojis: '💪🇺🇸🛡️', answer: 'Captain America' },
  { emojis: '🦍🏙️🛩️', answer: 'King Kong' },
  { emojis: '🐍🛩️', answer: 'Snakes on a Plane' },
  { emojis: '💃🕺🕯️', answer: 'Beauty and the Beast' },
  { emojis: '🧑‍🎤🚀', answer: 'Rocketman' },
  { emojis: '🐉🔥👦', answer: 'How to Train Your Dragon' },
  { emojis: '🧑‍🏫🎓👩‍🎓', answer: 'Dead Poets Society' },
  { emojis: '🎤👩‍🎤👑', answer: 'Bohemian Rhapsody' },
  { emojis: '🏹👧🔥', answer: 'The Hunger Games' },
  { emojis: '🐘👂🎪', answer: 'Dumbo' },
  { emojis: '💤🌀🧠', answer: 'Inception' },
  { emojis: '💃🎶🇨🇺', answer: 'Coco' },
  { emojis: '🎮👦👾', answer: 'Ready Player One' },
  { emojis: '🕰️👨‍👦🔁', answer: 'Back to the Future' },
  { emojis: '💼🏦🔫', answer: 'The Bank Job' },
  { emojis: '👩‍🔬👩‍⚕️🚀', answer: 'Hidden Figures' },
  { emojis: '🤖🚗🌌', answer: 'Transformers' },
  { emojis: '👴👶🔁', answer: 'The Curious Case of Benjamin Button' },
  { emojis: '🎥💃🎭', answer: 'La La Land' },
  { emojis: '😡👿🚗', answer: 'Mad Max: Fury Road' },
  { emojis: '🧞‍♂️🕌🐒', answer: 'Aladdin' },
  { emojis: '🐷🐶🧑‍🌾', answer: 'Charlotte’s Web' },
  { emojis: '🧛‍♀️💔🐺', answer: 'Twilight' },
  { emojis: '👩‍🔬🧬🐁', answer: 'Flubber' },
  { emojis: '🧙‍♂️📜🐉', answer: 'Eragon' },
  { emojis: '👩‍👧🏞️🐻', answer: 'Brave' },
  { emojis: '🧊🐘🦛', answer: 'Ice Age' },
  { emojis: '🎤🎧🧑‍🎤', answer: 'Sing' },
  { emojis: '🛸🌎👨‍🚀', answer: 'Independence Day' },
  { emojis: '🦍🦕🦖', answer: 'Godzilla vs. Kong' },
  { emojis: '🏈🧑‍🎓🇺🇸', answer: 'Remember the Titans' },
  { emojis: '🧑‍🏫📖👨‍🏫', answer: 'The Pursuit of Happyness' },
  { emojis: '🧑‍💻📟🔍', answer: 'The Matrix' },
  { emojis: '🐶🚀🌌', answer: 'Astro Boy' },
  { emojis: '🍫🏭👦', answer: 'Charlie and the Chocolate Factory' },
  { emojis: '🕊️👩🏽‍🦱🏛️', answer: 'The Help' },
  { emojis: '🕵️‍♂️🔍🧩', answer: 'Sherlock Holmes' },
  { emojis: '📚👧🏼📖', answer: 'Matilda' },
  { emojis: '🧟‍♀️🏚️🌃', answer: 'Resident Evil' },
  { emojis: '🚙👨‍👩‍👧‍👦🌲', answer: 'RV' },
  { emojis: '🌪️🏠🧙‍♀️', answer: 'The Wizard of Oz' },
  { emojis: '🛏️👻🌃', answer: 'Paranormal Activity' },
  { emojis: '🤖💙🧑', answer: 'Big Hero 6' },
  { emojis: '👯‍♀️📹🏫', answer: 'Mean Girls' },
  { emojis: '🐵🧠🌍', answer: 'Planet of the Apes' },
  { emojis: '🍔🎥🇺🇸', answer: 'Super Size Me' },
  { emojis: '🏞️🐕🦅', answer: 'The Call of the Wild' },
  { emojis: '🔍👀📽️', answer: 'Rear Window' },
  { emojis: '👧📓💀', answer: 'Death Note' },
  { emojis: '👶🔫🌆', answer: 'Baby Driver' },
  { emojis: '🧙‍♂️🐉💣', answer: 'The Hobbit' },
  { emojis: '🏝️🧔⚽', answer: 'Cast Away' },
  { emojis: '📼👻🔪', answer: 'The Ring' },
  { emojis: '🔪👧🏡', answer: 'Psycho' },
  { emojis: '🐖🧒🌽', answer: 'Babe' },
  { emojis: '🧛‍♂️🦇🧛‍♀️', answer: 'Hotel Transylvania' },
  { emojis: '🌪️🦈🦈', answer: 'Sharknado' },
  { emojis: '🏫🎓📚', answer: 'School of Rock' },
  { emojis: '🏖️🐚👂', answer: 'Moana' },
  { emojis: '💻📱🌐', answer: 'The Social Network' },
  { emojis: '👨‍👦🧒🍿', answer: 'The Incredibles' },
  { emojis: '🔮🌌⏳', answer: 'Doctor Strange' },
  { emojis: '🏰🐉⚔️', answer: 'Shrek' },
  { emojis: '👩‍🚀🪐😱', answer: 'Gravity' },
  { emojis: '🐱👢🗡️', answer: 'Puss in Boots' },
  { emojis: '📼🔪🧑‍🦰', answer: 'Scream' },
  { emojis: '👩‍🦰🧹🐱', answer: 'Kiki’s Delivery Service' },
  { emojis: '👨‍🚀🤖🌍', answer: 'WALL-E' },
  { emojis: '🪓🏕️😱', answer: 'Friday the 13th' },
  { emojis: '🛶🎣🐊', answer: 'Crawl' },
  { emojis: '🦊🎩👔', answer: 'Fantastic Mr. Fox' },
  { emojis: '🐷👑🏰', answer: 'The Princess and the Frog' },
  { emojis: '👨‍🎨🎭🎨', answer: 'Loving Vincent' },
  { emojis: '🚿🔪🧼', answer: 'American Psycho' },
  { emojis: '👩🏾‍🚀🛰️🧠', answer: 'Gravity' },
  { emojis: '📸🕰️🕳️', answer: 'Timecrimes' },
  { emojis: '🧑‍🎤👯‍♂️💔', answer: 'Elvis' },
  { emojis: '🧛‍♂️🌃🩸', answer: 'Blade' },
  { emojis: '🚓🏃🔫', answer: 'The Fugitive' },
  { emojis: '📖✉️🧡', answer: 'The Notebook' },
  { emojis: '🏎️🔥🛣️', answer: 'Speed Racer' },
  { emojis: '🎲🦁🐍', answer: 'Jumanji' },
  { emojis: '👴🐦🎓', answer: 'Gran Torino' },
  { emojis: '🎭🎪🎆', answer: 'The Greatest Showman' },
  { emojis: '🦈🌊🚤', answer: 'Jaws' },
  { emojis: '📜🔥🕯️', answer: 'National Treasure' },
  { emojis: '🧑‍🚀🔴👁️', answer: '2001: A Space Odyssey' },
  { emojis: '👨‍🚒🔥🚒', answer: 'Only the Brave' },
  { emojis: '🕷️🔫🕸️', answer: 'Spider-Man: No Way Home' },
  { emojis: '🎮👧🧙‍♀️', answer: 'Wreck-It Ralph' },
  { emojis: '🧚🌟👦', answer: 'Peter Pan' },
  { emojis: '👩‍👧🧚‍♀️', answer: 'Maleficent' },
  { emojis: '🌊👦🐚', answer: 'The Little Mermaid' },
  { emojis: '👑🐎⚔️', answer: 'Braveheart' },
  { emojis: '🐻⛺🎒', answer: 'Paddington' },
  { emojis: '🛸🤖🧠', answer: 'District 9' },
  { emojis: '🦈🌊', answer: 'Shark Week' },
];
const QUESTIONS_PER_QUIZ = 10;
const QUIZ_TIME = 20;

export default function EmojiMovieQuiz() {
  const { isAuthenticated } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(QUIZ_TIME);
  const [showResultOverlay, setShowResultOverlay] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  
  // Track quiz start time and total time spent
  const quizStartTimeRef = useRef(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Generate first question
  useEffect(() => {
    generateNewQuestion();
    // Start tracking time when quiz begins
    quizStartTimeRef.current = Date.now();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!currentQuestion || selectedAnswer) return;
    if (timer === 0) {
      setSelectedAnswer("__timeout__");
      setShowResultOverlay("fail");
      setTimeout(() => {
        setShowResultOverlay(null);
        generateNewQuestion();
      }, 900);
      return;
    }

    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, selectedAnswer, currentQuestion]);

  const completeQuiz = async () => {
    setIsComplete(true);
    
    // Calculate total time spent in minutes
    const timeSpentInMinutes = quizStartTimeRef.current 
      ? Math.round((Date.now() - quizStartTimeRef.current) / 60000) 
      : 0;
    setTotalTimeSpent(timeSpentInMinutes);
    
    if (isAuthenticated) {
      try {
        await quizAPI.saveAttempt({
          quizType: 'emoji-movie',
          score: (score / QUESTIONS_PER_QUIZ) * 100,
          totalQuestions: QUESTIONS_PER_QUIZ,
          correctAnswers: score,
          timeSpent: Math.max(1, timeSpentInMinutes) // Ensure at least 1 minute
        });
        console.log('Quiz attempt saved successfully');
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
    setTotalTimeSpent(0);
    quizStartTimeRef.current = Date.now(); // Reset start time
    generateNewQuestion();
  };

  const generateNewQuestion = () => {
    if (questionCount >= QUESTIONS_PER_QUIZ) {
      completeQuiz();
      return;
    }

    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    const correct = shuffled[0];
    const options = [correct.answer];

    while (options.length < 4) {
      const random = quizData[Math.floor(Math.random() * quizData.length)].answer;
      if (!options.includes(random)) options.push(random);
    }

    const finalOptions = options.sort(() => 0.5 - Math.random());
    setCurrentQuestion({ ...correct, options: finalOptions });
    setSelectedAnswer(null);
    setQuestionCount((prev) => prev + 1);
    setTimer(QUIZ_TIME);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentQuestion.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setShowResultOverlay("success");
    } else {
      setShowResultOverlay("fail");
    }
    
    setTimeout(() => {
      setShowResultOverlay(null);
      generateNewQuestion();
    }, 900);
  };

  const progress = Math.max(0, (timer / QUIZ_TIME) * 100);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -left-32 -top-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-pink-400 to-amber-400 opacity-30 blur-3xl mix-blend-screen"
        animate={{ x: [0, 60, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-120px] bottom-[-120px] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 opacity-25 blur-2xl mix-blend-screen"
        animate={{ x: [0, -40, 0], y: [0, -20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4 p-6 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10"
      >
        {/* Top row: nav + score/timer */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
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
          <FaFilm className="text-amber-300" /> Emoji Movie Quiz
        </h1>

        {/* Question section - Only show when quiz is not complete */}
        {!isComplete && (
          <>
            {/* Emoji Display */}
            <div className="bg-white/6 rounded-2xl p-6 mb-4 border border-white/8 flex flex-col items-center">
              <motion.div
                key={currentQuestion?.emojis}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-6xl mb-4"
              >
                {currentQuestion?.emojis}
              </motion.div>

              <p className="text-sm text-white/80 mb-3 text-center">
                Guess the movie!
              </p>

              {/* animated progress bar */}
              <div className="mt-2 w-full h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 via-amber-300 to-purple-300"
                  initial={{ width: "100%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion?.options.map((option, i) => {
                const isCorrect = option === currentQuestion.answer;
                const isSelected = selectedAnswer === option;

                let base = "py-3 px-4 rounded-xl text-sm font-semibold transition-all text-center";
                let color = "bg-white/8 text-white/90 hover:bg-white/12";
                if (selectedAnswer) {
                  if (isSelected && isCorrect) color = "bg-emerald-500 text-white shadow-lg";
                  else if (isSelected && !isCorrect) color = "bg-rose-500 text-white shadow-lg";
                  else if (isCorrect) color = "bg-emerald-300 text-slate-900";
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
                    {option}
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
              <div className="text-5xl font-bold text-amber-400 mb-2">
                {score} / {QUESTIONS_PER_QUIZ}
              </div>
              <p className="text-white/80 text-lg mb-4">
                You got {Math.round((score / QUESTIONS_PER_QUIZ) * 100)}% correct!
              </p>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-300"
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
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all duration-200 hover:scale-105 justify-center"
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