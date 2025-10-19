import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFlag, FaGlobeAmericas, FaLandmark, FaTheaterMasks, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Removed auto-redirect to dashboard as we want to show quizzes to all users

  const quizCards = [
    {
      to: "/flag-quiz",
      label: "Flag Quiz",
      description: "Test your knowledge of world flags",
      icon: <FaFlag className="text-2xl" />,
      gradient: "from-blue-500/10 to-cyan-500/10",
      hoverGradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      to: "/quiz/capitals",
      label: "Capital Quiz",
      description: "Master the world's capital cities",
      icon: <FaLandmark className="text-2xl" />,
      gradient: "from-purple-500/10 to-pink-500/10",
      hoverGradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      to: "/quiz/geography",
      label: "Geography Quiz",
      description: "Explore continents and countries",
      icon: <FaGlobeAmericas className="text-2xl" />,
      gradient: "from-emerald-500/10 to-teal-500/10",
      hoverGradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      to: "/quiz/emoji-movie",
      label: "Emoji Movie Quiz",
      description: "Guess movies from emojis",
      icon: <FaTheaterMasks className="text-2xl" />,
      gradient: "from-amber-500/10 to-orange-500/10",
      hoverGradient: "from-amber-500/20 to-orange-500/20",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden px-4 sm:px-6 py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 mb-6">
              <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                Q
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                QuizNest
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed px-4">
              Challenge yourself with engaging quizzes. Learn, compete, and have fun.
            </p>
          </motion.div>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto px-4 sm:px-0">
          {quizCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link to={card.to} className="block group">
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden`}
                >
                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                        {card.icon}
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ x: 3 }}
                      >
                        <FaArrowRight className="text-white/60" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">
                      {card.label}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {card.description}
                    </p>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    initial={false}
                    whileHover={{
                      background: [
                        "linear-gradient(90deg, transparent 0%, transparent 100%)",
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                        "linear-gradient(90deg, transparent 0%, transparent 100%)",
                      ],
                    }}
                    transition={{ duration: 1.5 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 sm:mt-16"
        >
          
        </motion.div>
      </motion.div>
    </div>
  );
}