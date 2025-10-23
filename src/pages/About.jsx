import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaBrain, FaRocket, FaHeart, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function About() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      
      {/* Animated background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -80, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-3xl w-full"
      >
        {/* Header Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-xl">
            <FaBrain className="text-4xl text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
        >
          About QuizNest
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed"
        >
          <p className="text-center">
            QuizNest is your interactive learning companion, designed to make education fun and engaging through AI-powered quizzes and exciting challenges.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <FaBrain className="text-3xl text-pink-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">AI Powered</h3>
              <p className="text-slate-400 text-sm">Generate custom quizzes on any topic instantly</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <FaRocket className="text-3xl text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Fast & Fun</h3>
              <p className="text-slate-400 text-sm">Instant quiz creation with engaging gameplay</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <FaHeart className="text-3xl text-indigo-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Made with Love</h3>
              <p className="text-slate-400 text-sm">Built with passion for learning and education</p>
            </motion.div>
          </div>

          <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 rounded-2xl p-6 mt-8">
            <p className="text-center text-slate-300">
              <span className="font-semibold text-white">Tech Stack:</span> Built with React, Vite, Tailwind CSS, Three.js, and Framer Motion — crafted for performance and beauty.
            </p>
          </div>
        </motion.div>

        {/* Secret Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => setShowSecret(!showSecret)}
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium text-sm mb-4 inline-flex items-center gap-2"
          >
            {showSecret ? '🙈 Hide Secret' : '👀 Psst... Want to connect?'}
          </button>

          {showSecret && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
            >
              <p className="text-slate-300 mb-4 text-sm">
                Have questions, feedback, or just want to say hi? I'd love to hear from you!
              </p>
              <a
                href="mailto:anoopsnair1123@gmail.com"
                className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-medium text-sm"
              >
                <FaEnvelope />
                Email Me
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium text-sm transition-colors duration-300 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}