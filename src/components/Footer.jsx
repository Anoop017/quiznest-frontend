import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaInfoCircle } from 'react-icons/fa';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub size={26} />,
    url: 'https://github.com/Anoop017',
    hoverColor: 'hover:text-gray-300',
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin size={26} />,
    url: 'https://www.linkedin.com/in/anoopsnair85/',
    hoverColor: 'hover:text-[#0A66C2]',
  },
  {
    name: 'Instagram',
    icon: <FaInstagram size={26} />,
    url: 'https://www.instagram.com/__anoop__s__/',
    hoverColor: 'hover:text-[#E1306C]',
  },
  {
    name: 'X',
    icon: <FaTwitter size={26} />,
    url: 'https://x.com/Anoop_S_Nair_01',
    hoverColor: 'hover:text-[#1DA1F2]',
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-10 shadow-inner px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        
        {/* Copyright */}
        <p className="text-sm opacity-70">
          © 2025 Created & Maintained by{" "}
          <a
            href="https://www.linkedin.com/in/anoopsnair85/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            Anoop S Nair
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {socialLinks.map(({ name, icon, url, hoverColor }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-transform transform duration-300 hover:scale-125 ${hoverColor} relative group`}
            >
              {icon}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-cyan-400 text-black text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                {name}
              </span>
            </a>
          ))}
        </div>

        {/* About Page */}
        <Link
          to="/about"
          className="inline-flex items-center gap-1 text-cyan-400 font-medium hover:underline hover:translate-x-1 transition-all duration-300"
        >
          <FaInfoCircle className="text-lg" />
          About
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
