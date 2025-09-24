import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function About() {
    const [showSecret, setShowSecret] = useState(false);

    return (
        <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center px-4 py-10 text-center">
            <h1 className="text-3xl font-bold text-purple-700 mb-4">📘 About This Project</h1>

            <p className="text-gray-700 max-w-xl text-base leading-relaxed mb-6">
                This is a fun and educational quiz app created to test your knowledge on world geography and popular movies using emojis. It’s built with React, Vite, and Tailwind CSS — made with love for learning and entertainment.
            </p>

            <button
                onClick={() => setShowSecret(!showSecret)}
                className="text-sm text-purple-400 hover:text-purple-600 transition-all duration-200"
            >
                {showSecret ? '🙈 Hide Secret' : '👀 Psst... Wanna see a secret?'}
            </button>

            {showSecret && (
                <div className="mt-4 bg-white border border-purple-200 rounded-xl px-4 py-3 shadow max-w-xs">
                    <p className="text-purple-700 font-medium">
                        🎉 You found the easter egg!
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                        "Did you know? Somewhere in the quiz is an emoji puzzle that's technically not a movie. If you can find it, email me with a screenshot!"
                    </p>

                    {/* Email Me Button */}
                    <a
                        href="mailto:anoopsnair1123@gmail.com"
                        className="mt-3 inline-flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md shadow transition-colors duration-300 text-sm font-medium"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75M3.75 6.75l7.5 6 7.5-6" />
                        </svg>
                        Email Me
                    </a>
                </div>
            )}

            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors duration-300"
            >
                <FaArrowLeft />
                Back to Home
            </Link>
        </div>
    );
}

export default About;
