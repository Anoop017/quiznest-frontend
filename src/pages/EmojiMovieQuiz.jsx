import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

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


function EmojiMovieQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(20);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  useEffect(() => {
    if (!currentQuestion || selectedAnswer) return;
    if (timer === 0) {
      setSelectedAnswer('__timeout__');
      setTimeout(() => generateNewQuestion(), 1000);
      return;
    }

    const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
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
    setQuestionCount(prev => prev + 1);
    setTimer(20);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      generateNewQuestion();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-purple-600 flex flex-col items-center justify-center px-4 py-10">
      <div className="flex justify-between items-center w-full max-w-md mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-purple-700 font-medium hover:underline hover:text-purple-900 transition-colors"
        >
          <FaArrowLeft />
          Home
        </Link>
        <p className="text-gray-700 font-semibold">⏱️ {timer}s</p>
      </div>

      <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
        <FaFilm className="mr-2" /> Emoji Movie Quiz
      </h2>
      <p className="text-gray-700 mb-6">Score: {score} / {questionCount - 1}</p>

      <motion.p
        className="text-4xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentQuestion?.emojis}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {currentQuestion?.options.map((option, index) => {
          const isCorrect = option === currentQuestion.answer;
          const isSelected = selectedAnswer === option;

          let bg = 'bg-white';
          if (selectedAnswer) {
            if (isSelected && isCorrect) bg = 'bg-green-500 text-white';
            else if (isSelected && !isCorrect) bg = 'bg-red-400 text-white';
            else if (isCorrect) bg = 'bg-green-200';
          }

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`${bg} py-3 px-4 rounded-xl shadow hover:scale-105 transition-transform text-sm`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default EmojiMovieQuiz;
