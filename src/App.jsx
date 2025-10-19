import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import FlagQuiz from './pages/FlagQuiz';
import CapitalsQuiz from './pages/CapitalsQuiz';
import GeographyQuiz from './pages/GeographyQuiz';
import EmojiMovieQuiz from './pages/EmojiMovieQuiz';
import About from './pages/About'; 
import Footer from './components/Footer'; 

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flag-quiz" element={<FlagQuiz />} />
            <Route path="/quiz/capitals" element={<CapitalsQuiz />} />
            <Route path="/quiz/geography" element={<GeographyQuiz />} />
            <Route path="/quiz/emoji-movie" element={<EmojiMovieQuiz />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
