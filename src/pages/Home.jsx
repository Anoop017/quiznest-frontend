import { Link } from 'react-router-dom';
import { FaFlag, FaGlobeAmericas, FaLandmark, FaTheaterMasks } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Home() {
  const quizCards = [
    {
      to: '/flag-quiz',
      label: 'Flag Quiz',
      icon: <FaFlag className="text-xl mr-2" />,
      bg: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      to: '/quiz/capitals',
      label: 'Capital Quiz',
      icon: <FaLandmark className="text-xl mr-2" />,
      bg: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      to: '/quiz/geography',
      label: 'Geography Quiz',
      icon: <FaGlobeAmericas className="text-xl mr-2" />,
      bg: 'bg-green-500 hover:bg-green-600',
    },
    {
      to: '/quiz/emoji-movie',
      label: 'Emoji Movie Quiz',
      icon: <FaTheaterMasks className="text-xl mr-2" />,
      bg: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6 text-center">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">🌍 Welcome to World & Movie Quiz</h2>
      <p className="text-lg text-gray-700 mb-8">Choose a quiz to get started!</p>

      <div className="grid gap-4 w-full max-w-md">
        {quizCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full"
          >
            <Link
              to={card.to}
              className={`${card.bg} text-white flex items-center justify-center py-3 px-6 rounded-xl transition text-lg shadow`}
            >
              {card.icon}
              {card.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
