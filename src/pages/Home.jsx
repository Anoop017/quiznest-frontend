import StarBorder from '../components/StarBorder';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFlag,
  FaGlobeAmericas,
  FaLandmark,
  FaTheaterMasks,
  FaArrowRight,
  FaBrain,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import LaserFlow from '../components/LaserFlow';

export default function Home() {
  const { isAuthenticated } = useAuth();

  const quizCards = [
    {
      to: "/ai-quiz",
      label: "AI Quiz Generator",
      description: "Create a quiz on any topic instantly with AI",
      icon: <FaBrain className="text-3xl sm:text-4xl" />,
      gradient: "from-pink-500/20 via-rose-500/20 to-orange-400/20",
      hoverGradient: "from-pink-500/30 via-rose-500/30 to-orange-400/30",
      featured: true,
    },
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
      {/* Animated background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -80, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 relative z-20">
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
        </div>

        {/* Featured AI Quiz Card - Premium Version */}
        <div className="flex justify-center mb-10 sm:mb-16 relative">
          {quizCards
            .filter((card) => card.featured)
            .map((card, index) => (
              <div key={index} className="relative w-full sm:w-11/12 lg:w-4/5 max-w-2xl">
                {/* LaserFlow Effect - Positioned to fall from top to center of card */}
                <div className="absolute inset-x-0 -top-40 sm:-top-48 md:-top-56 bottom-0 flex justify-center pointer-events-none z-10 overflow-visible">
                  <div className="w-full max-w-[600px] h-full">
                    <LaserFlow
                      className="w-full h-full"
                      color="#ec4899"
                      wispDensity={1.5}
                      flowSpeed={0.45}
                      verticalSizing={3.0}
                      horizontalSizing={0.4}
                      fogIntensity={0.6}
                      wispSpeed={10}
                      wispIntensity={5}
                      verticalBeamOffset={-0.15}
                      horizontalBeamOffset={0.0}
                    />
                  </div>
                </div>

                <Link
                  to={card.to}
                  className="block group relative z-20"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{
                      y: -6,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    {/* Subtle outer glow */}
                    <div
                      className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                      style={{
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))",
                      }}
                    />

                    {/* Main card container */}
                    <div className="relative p-8 sm:p-10 rounded-3xl backdrop-blur-xl border border-white/10 overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 group-hover:border-white/20 transition-all duration-500">
                      
                      {/* Subtle animated gradient orb */}
                      <motion.div
                        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
                        style={{
                          background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 70%)",
                          top: "-40%",
                          right: "-20%",
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                        {/* Icon container */}
                        <motion.div
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="relative">
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg">
                              {card.icon}
                            </div>
                          </div>
                        </motion.div>

                        {/* Text content */}
                        <div className="flex-1 text-center sm:text-left">
                          {/* Badge */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex mb-3 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 backdrop-blur-sm"
                          >
                            <span className="text-xs font-semibold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                              AI POWERED
                            </span>
                          </motion.div>

                          {/* Title */}
                          <motion.h3
                            className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight text-white"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {card.label}
                          </motion.h3>

                          {/* Description */}
                          <motion.p
                            className="text-sm sm:text-base text-slate-400 mb-4"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {card.description}
                          </motion.p>

                          {/* Feature tags */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-2 justify-center sm:justify-start"
                          >
                            {["Instant", "Smart", "Unlimited"].map((tag, i) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </motion.div>
                        </div>

                        {/* CTA Arrow */}
                        <motion.div
                          className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <FaArrowRight className="text-2xl text-white" />
                        </motion.div>
                      </div>

                      {/* Subtle shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                        }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
        </div>

        {/* Remaining Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto px-4 sm:px-0">
          {quizCards
            .filter((card) => !card.featured)
            .map((card, index) => (
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
                    className={`relative p-6 sm:p-7 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
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
                  </motion.div>
                </Link>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}