import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import CardNavigation from "./components/CardNavigation";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FlagQuiz from "./pages/FlagQuiz";
import CapitalsQuiz from "./pages/CapitalsQuiz";
import GeographyQuiz from "./pages/GeographyQuiz";
import EmojiMovieQuiz from "./pages/EmojiMovieQuiz";
import About from "./pages/About";
import Footer from "./components/Footer";
import AIQuiz from "./pages/AIQuiz";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <CardNavigation />
        <div className="pt-24 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flag-quiz" element={<FlagQuiz />} />
            <Route path="/quiz/capitals" element={<CapitalsQuiz />} />
            <Route path="/quiz/geography" element={<GeographyQuiz />} />
            <Route path="/quiz/emoji-movie" element={<EmojiMovieQuiz />} />
            <Route path="/about" element={<About />} />
            <Route path="/ai-quiz" element={<AIQuiz />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
