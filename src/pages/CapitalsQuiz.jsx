import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLandmark } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

function CapitalsQuiz() {
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(c => c.capital && c.capital.length > 0 && c.name && c.name.common)
          .map(c => ({
            name: c.name.common,
            capital: c.capital[0],
          }));
        setCountries(filtered);
      });
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      generateNewQuestion();
    }
  }, [countries]);

  useEffect(() => {
    if (!question || selectedAnswer) return;
    if (timer === 0) {
      setSelectedAnswer({ name: '__timeout__' });
      setTimeout(() => generateNewQuestion(), 1000);
      return;
    }

    const t = setTimeout(() => setTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, question, selectedAnswer]);

  const generateNewQuestion = () => {
    const correct = countries[Math.floor(Math.random() * countries.length)];
    const options = [correct];
    while (options.length < 4) {
      const random = countries[Math.floor(Math.random() * countries.length)];
      if (!options.find(c => c.capital === random.capital)) {
        options.push(random);
      }
    }
    const shuffled = options.sort(() => 0.5 - Math.random());

    setQuestion({ correct, options: shuffled });
    setSelectedAnswer(null);
    setQuestionCount(prev => prev + 1);
    setTimer(15);
  };

  const handleAnswer = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);
    if (option.capital === question.correct.capital) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      generateNewQuestion();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 flex flex-col items-center justify-center px-4 py-10">
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

      <h2 className="text-2xl font-bold text-yellow-700 mb-4">🏛️ Capital Quiz</h2>
      <p className="text-gray-700 mb-6">Score: {score} / {questionCount - 1}</p>

      <p className="text-lg font-medium mb-6">
        What country has the capital city: <span className="font-bold">{question?.correct.capital}</span>?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {question?.options.map((option, index) => {
          const isCorrect = option.capital === question.correct.capital;
          const isSelected = selectedAnswer?.capital === option.capital;

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
              className={`${bg} py-3 px-4 rounded-xl shadow hover:scale-105 transition-transform`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FaLandmark className="mr-2" />
              {option.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default CapitalsQuiz;
