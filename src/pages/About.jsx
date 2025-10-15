import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function About() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex flex-col items-center justify-center px-4 py-10">
      
      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-xl max-w-xl text-center"
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-4 flex justify-center items-center gap-2">
          📘 About This Project
        </h1>

        <p className="text-gray-700 text-base leading-relaxed mb-6">
          This is a fun and educational quiz app created to test your knowledge on world geography and popular movies using emojis. Built with React, Vite, and Tailwind CSS — made with love for learning and entertainment.
        </p>

        <button
          onClick={() => setShowSecret(!showSecret)}
          className="text-purple-500 hover:text-purple-700 transition-colors font-medium mb-4"
        >
          {showSecret ? '🙈 Hide Secret' : '👀 Psst... Wanna see a secret?'}
        </button>

        {showSecret && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/30 border border-purple-200 rounded-xl p-4 shadow-md"
          >
            <p className="text-purple-700 font-semibold mb-1">🎉 You found the easter egg!</p>
            <p className="text-gray-600 text-sm mb-2">
              "Did you know? Somewhere in the quiz is an emoji puzzle that's technically not a movie. Find it & email me with a screenshot!"
            </p>
            <a
              href="mailto:anoopsnair1123@gmail.com"
              className="inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md shadow transition-all duration-300 font-medium text-sm"
            >
              ✉️ Email Me
            </a>
          </motion.div>
        )}

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors duration-300"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
