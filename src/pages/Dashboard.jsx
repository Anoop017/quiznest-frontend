// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaChartLine, 
  FaTrophy, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle,
  FaFlag,
  FaLandmark,
  FaGlobeAmericas,
  FaTheaterMasks,
  FaSync
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { quizAPI } from '../utils/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    totalTimeSpent: 0,
    highestScore: 0,
    lastUpdated: null,
    quizStats: {
      flagQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 },
      capitalQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 },
      geographyQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 },
      emojiMovieQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 }
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuizStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const statsData = await quizAPI.getStats();
      
      console.log('Fetched stats:', statsData); // Debug log

      // Initialize quiz stats
      const quizStats = {
        flagQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 },
        capitalQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 },
        geographyQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 },
        emojiMovieQuiz: { attempted: 0, correct: 0, timeSpent: 0, accuracy: 0 }
      };

      let totalQuizzes = 0;
      let totalCorrectAnswers = 0;
      let totalQuestions = 0;
      let totalTimeSpent = 0;
      let highestScore = 0;

      // Process each quiz type
      statsData.forEach(stat => {
        const quizKey = {
          'flag': 'flagQuiz',
          'capitals': 'capitalQuiz',
          'geography': 'geographyQuiz',
          'emoji-movie': 'emojiMovieQuiz'
        }[stat.quizType];

        if (quizKey) {
          quizStats[quizKey] = {
            attempted: stat.totalAttempts || 0,
            correct: stat.totalCorrectAnswers || 0,
            timeSpent: stat.totalTimeSpent || 0,
            accuracy: stat.accuracy || 0
          };
          
          totalQuizzes += stat.totalAttempts || 0;
          totalCorrectAnswers += stat.totalCorrectAnswers || 0;
          totalQuestions += stat.totalQuestions || 0;
          totalTimeSpent += stat.totalTimeSpent || 0;
          
          if (stat.highestScore > highestScore) {
            highestScore = stat.highestScore;
          }
        }
      });

      setStats({
        totalQuizzes,
        totalQuestions,
        correctAnswers: totalCorrectAnswers,
        wrongAnswers: totalQuestions - totalCorrectAnswers,
        totalTimeSpent,
        highestScore: Math.round(highestScore),
        lastUpdated: new Date(),
        quizStats
      });
    } catch (error) {
      console.error('Error fetching quiz statistics:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchQuizStats();
    }
  }, [user]);

  const successRate = stats.totalQuestions > 0 ? (stats.correctAnswers / stats.totalQuestions * 100) : 0;
  const failureRate = stats.totalQuestions > 0 ? (stats.wrongAnswers / stats.totalQuestions * 100) : 0;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const quizTypes = [
    {
      key: 'flagQuiz',
      name: 'Flag Quiz',
      icon: <FaFlag className="text-blue-500" />,
      description: 'Test your knowledge of world flags'
    },
    {
      key: 'capitalQuiz',
      name: 'Capital Quiz',
      icon: <FaLandmark className="text-purple-500" />,
      description: 'Master the world\'s capital cities'
    },
    {
      key: 'geographyQuiz',
      name: 'Geography Quiz',
      icon: <FaGlobeAmericas className="text-emerald-500" />,
      description: 'Explore continents and countries'
    },
    {
      key: 'emojiMovieQuiz',
      name: 'Emoji Movie Quiz',
      icon: <FaTheaterMasks className="text-amber-500" />,
      description: 'Guess movies from emojis'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.email?.split('@')[0]}!
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">Track your quiz progress and achievements</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchQuizStats}
                disabled={loading}
                className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl border border-white/10 hover:from-green-500/30 hover:to-emerald-600/30 transition-all duration-200 disabled:opacity-50"
                title="Refresh Dashboard"
              >
                <FaSync className={`text-xl text-green-400 ${loading ? 'animate-spin' : ''}`} />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl border border-white/10"
              >
                <FaUser className="text-2xl sm:text-3xl text-blue-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
          >
            <div className="flex items-center">
              <FaTimesCircle className="mr-3" />
              {error}
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400"
          >
            <div className="flex items-center">
              <FaSync className="mr-3 animate-spin" />
              Updating dashboard data...
            </div>
          </motion.div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Total Quizzes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FaChartLine className="text-xl sm:text-2xl text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-blue-400">{stats.totalQuizzes}</span>
            </div>
            <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Total Quizzes</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Quizzes completed</p>
          </motion.div>

          {/* Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <FaCheckCircle className="text-xl sm:text-2xl text-green-400" />
              </div>
              <span className="text-2xl font-bold text-green-400">{successRate.toFixed(1)}%</span>
            </div>
            <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Success Rate</h3>
            <p className="text-slate-400 text-xs sm:text-sm">{stats.correctAnswers} correct answers</p>
          </motion.div>

          {/* Time Spent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <FaClock className="text-xl sm:text-2xl text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-purple-400">{formatTime(stats.totalTimeSpent)}</span>
            </div>
            <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Time Spent</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Learning time</p>
          </motion.div>

          {/* Highest Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <FaTrophy className="text-xl sm:text-2xl text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-amber-400">{stats.highestScore}</span>
            </div>
            <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Highest Score</h3>
            <p className="text-slate-400 text-xs sm:text-sm">Best performance</p>
          </motion.div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Performance Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center">
              <FaChartLine className="mr-3 text-blue-400" />
              Performance Overview
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="text-slate-300">Total Questions</span>
                <span className="text-white font-semibold">{stats.totalQuestions}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="text-slate-300">Correct Answers</span>
                <span className="text-green-400 font-semibold">{stats.correctAnswers}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm sm:text-base">
                <span className="text-slate-300">Wrong Answers</span>
                <span className="text-red-400 font-semibold">{stats.wrongAnswers}</span>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
                  <span className="text-slate-300">Success Rate</span>
                  <span className="text-green-400 font-semibold">{successRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${successRate}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                  />
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
                  <span className="text-slate-300">Failure Rate</span>
                  <span className="text-red-400 font-semibold">{failureRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${failureRate}%` }}
                    transition={{ duration: 1, delay: 1 }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quiz Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center">
              <FaTrophy className="mr-3 text-amber-400" />
              Quiz Breakdown
            </h2>
            
            <div className="space-y-4">
              {quizTypes.map((quiz, index) => {
                const quizStat = stats.quizStats[quiz.key];
                const quizSuccessRate = quizStat.accuracy || 0;
                
                return (
                  <motion.div
                    key={quiz.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="mr-3">
                        {quiz.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm sm:text-base">{quiz.name}</h4>
                        <p className="text-slate-400 text-xs">{quizStat.attempted} attempts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold text-sm sm:text-base">{quizSuccessRate.toFixed(0)}%</div>
                      <div className="text-slate-400 text-xs">{formatTime(quizStat.timeSpent)}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}