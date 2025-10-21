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
        <div className="text-center mb-12 sm:mb-16">
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

        {/* Featured AI Quiz Card */}
        {/* Featured AI Quiz Generator with Aurora Glow */}
        <div className="flex justify-center mb-10 sm:mb-16">
          {quizCards
            .filter((card) => card.featured)
            .map((card, index) => (
              <Link
                key={index}
                to={card.to}
                className="block group w-full sm:w-3/4 lg:w-2/3"
              >
                <motion.div
                  whileHover={{
                    scale: 1.06,
                    y: -12,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: "0 0 60px rgba(255,255,255,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-10 sm:p-12 rounded-3xl backdrop-blur-2xl border border-transparent transition-all duration-700 overflow-hidden
    bg-gradient-to-br ${card.gradient} before:absolute before:inset-0 before:rounded-3xl 
    before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_60%)] 
    before:opacity-70 before:blur-3xl
  `}
                >
                  {/* Animated neon border ring */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-[1.5px] border-transparent"
                    style={{
                      background:
                        "linear-gradient(120deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1), rgba(255,255,255,0.6)) border-box",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Animated glowing orb inside */}
                  <motion.div
                    className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-400"
                    animate={{
                      x: [-60, 60, -60],
                      y: [0, 40, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ top: "-50%", left: "-20%" }}
                  />

                  {/* Glass overlay for contrast */}
                  <div className="absolute inset-0 bg-white/[0.05] rounded-3xl mix-blend-overlay" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="p-5 rounded-2xl bg-white/10 group-hover:bg-white/20 transition-colors duration-300 mb-4 shadow-inner backdrop-blur-xl">
                      {card.icon}
                    </div>
                    <h3 className="text-3xl font-semibold mb-2 text-white tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                      {card.label}
                    </h3>
                    <p className="text-lg text-slate-300 group-hover:text-slate-100 transition-colors">
                      {card.description}
                    </p>
                  </div>
                </motion.div>


              </Link>
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
