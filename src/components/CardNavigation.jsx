import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";

const CardNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const ease = "power3.out";

  const menuItems = [
    {
      label: "AI Features",
      links: [{ label: "AI Quiz Generator", href: "/ai-quiz" }],
    },
    {
      label: "Quizzes",
      links: [
        { label: "Flag Quiz", href: "/flag-quiz" },
        { label: "Capital Quiz", href: "/quiz/capitals" },
        { label: "Geography Quiz", href: "/quiz/geography" },
        { label: "Emoji Movie Quiz", href: "/quiz/emoji-movie" },
      ],
    },
    {
      label: "More",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  const createTimeline = () => {
    const navEl = navRef.current;
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0, scale: 0.95 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: 280, duration: 0.5, ease });
    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.4,
        ease,
      },
      "-=0.2"
    );
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => tl?.kill();
  }, []);

  const toggleMenu = () => {
    if (!isExpanded) {
      tlRef.current.play(0);
      setIsExpanded(true);
    } else {
      tlRef.current.reverse();
      tlRef.current.eventCallback("onReverseComplete", () =>
        setIsExpanded(false)
      );
    }
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[900px]">
        <nav
          ref={navRef}
          className="relative h-[60px] mt-4 rounded-2xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-white/10 shadow-xl"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between h-[60px] px-4">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer select-none"
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">
                QuizNest
              </span>
            </div>

            {/* Center Expand Button */}
            <button
              onClick={toggleMenu}
              className="p-2 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
            >
              {isExpanded ? "Close" : "Menu"}
            </button>

            {/* Right side: Login/Signup or User Info */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <span className="text-slate-300 text-sm font-medium hidden sm:inline">
                    {user?.email}
                  </span>
                  <button
                    onClick={logout}
                    className="relative overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-white border border-red-400/50 bg-gradient-to-r from-red-500 to-pink-600 shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick("login")}
                    className="relative overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button
                    onClick={() => handleAuthClick("signup")}
                    className="relative overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-white border border-purple-500/50 bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300"
                  >
                    <span className="relative z-10">Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Expanded Content */}
          <div
            className={`absolute left-0 right-0 top-[60px] p-3 flex flex-col md:flex-row gap-3 transition-all duration-500 ${
              isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {menuItems.map((item, i) => (
              <div
                key={item.label}
                ref={setCardRef(i)}
                className="flex-1 rounded-xl backdrop-blur-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4 text-white shadow-inner hover:shadow-lg hover:border-white/20 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-white/90">
                  {item.label}
                </h3>
                <div className="flex flex-col gap-1">
                  {item.links.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      className="text-slate-300 hover:text-white flex items-center gap-2 text-sm transition-colors"
                    >
                      <GoArrowUpRight />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default CardNavigation;
