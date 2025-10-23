import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaInfoCircle, FaBrain, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const socialLinks = [
  { 
    name: 'GitHub', 
    icon: <FaGithub size={24} />, 
    url: 'https://github.com/Anoop017', 
    color: 'from-gray-600 to-gray-800',
    hoverColor: 'hover:text-gray-300'
  },
  { 
    name: 'LinkedIn', 
    icon: <FaLinkedin size={24} />, 
    url: 'https://www.linkedin.com/in/anoopsnair85/', 
    color: 'from-blue-600 to-blue-700',
    hoverColor: 'hover:text-[#0A66C2]'
  },
  { 
    name: 'Instagram', 
    icon: <FaInstagram size={24} />, 
    url: 'https://www.instagram.com/__anoop__s__/', 
    color: 'from-pink-500 via-purple-500 to-orange-400',
    hoverColor: 'hover:text-[#E1306C]'
  },
  { 
    name: 'X', 
    icon: <FaTwitter size={24} />, 
    url: 'https://x.com/Anoop_S_Nair_01', 
    color: 'from-sky-400 to-blue-500',
    hoverColor: 'hover:text-[#1DA1F2]'
  },
];

const quickLinks = [
  { label: 'AI Quiz', path: '/ai-quiz' },
  { label: 'Flag Quiz', path: '/flag-quiz' },
  { label: 'Capital Quiz', path: '/quiz/capitals' },
  { label: 'About', path: '/about' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400/30 text-xl select-none pointer-events-none"
          initial={{ 
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0
          }}
          animate={{ 
            y: [null, `${Math.random() * 100}%`],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center">
                <FaBrain className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                QuizNest
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed text-center md:text-left">
              Empowering minds through AI-powered quizzes. Learn, compete, and grow with every question.
            </p>
            <div className="flex items-center gap-2 mt-4 text-slate-400 text-xs">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart className="text-pink-500" />
              </motion.div>
              <span>by developers</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.path}
                    className="block text-slate-400 hover:text-white transition-colors duration-300 text-sm group"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="w-0 group-hover:w-4 h-px bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300" />
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon background */}
                  <div className="relative w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-white/20 transition-all duration-300">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <span className={`relative z-10 text-slate-400 ${social.hoverColor} transition-colors duration-300`}>
                      {social.icon}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-medium rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Newsletter or CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 w-full"
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-medium text-sm shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group"
              >
                <FaInfoCircle className="group-hover:rotate-12 transition-transform duration-300" />
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p className="text-center md:text-left">
              © {currentYear} QuizNest. Created & Maintained by{" "}
              <a
                href="https://www.linkedin.com/in/anoopsnair85/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 transition-colors font-medium"
              >
                Anoop S Nair
              </a>
            </p>
            
            <div className="flex items-center gap-6 text-xs">
              <span className="text-slate-500">Built with React, Vite & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}