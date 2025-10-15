import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilm, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

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

export default function EmojiMovieQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(20);

  // Generate first question
  useEffect(() => {
    generateNewQuestion();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!currentQuestion || selectedAnswer) return;
    if (timer === 0) {
      setSelectedAnswer("__timeout__");
      setTimeout(generateNewQuestion, 1000);
      return;
    }

    const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, selectedAnswer, currentQuestion]);

  const generateNewQuestion = () => {
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
    setTimer(20);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) setScore((prev) => prev + 1);
    setTimeout(generateNewQuestion, 1000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Floating Emojis Background */}
      {[...Array(15)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl select-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 6 + Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          🎬
        </motion.span>
      ))}

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 text-center"
      >
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
          >
            <FaArrowLeft /> Home
          </Link>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <motion.div
              className="h-2 w-24 bg-white/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-yellow-400"
                style={{ width: `${(timer / 20) * 100}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </motion.div>
            ⏱️ {timer}s
          </div>
        </div>

        <motion.h2
          className="text-3xl font-bold mb-3 flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaFilm /> Emoji Movie Quiz
        </motion.h2>

        <p className="mb-4 text-white/70">
          Score: <span className="text-yellow-300 font-semibold">{score}</span> /{" "}
          {questionCount - 1}
        </p>

        <motion.div
          key={currentQuestion?.emojis}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-6xl mb-8"
        >
          {currentQuestion?.emojis}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion?.options.map((option, index) => {
            const isCorrect = option === currentQuestion.answer;
            const isSelected = selectedAnswer === option;

            let bg = "bg-white/10 hover:bg-white/20 text-white";
            if (selectedAnswer) {
              if (isSelected && isCorrect) bg = "bg-green-500/80 text-white";
              else if (isSelected && !isCorrect) bg = "bg-red-500/80 text-white";
              else if (isCorrect) bg = "bg-green-300/60 text-black";
            }

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className={`${bg} py-3 px-4 rounded-xl shadow-lg backdrop-blur-md transition-transform transform hover:scale-105 active:scale-95`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}