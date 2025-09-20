import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FlagQuiz from './pages/FlagQuiz';
import CapitalsQuiz from './pages/CapitalsQuiz';
import GeographyQuiz from './pages/GeographyQuiz';
import EmojiMovieQuiz from './pages/EmojiMovieQuiz';
import About from './pages/About'; 
import Footer from './components/Footer'; 

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flag-quiz" element={<FlagQuiz />} />
          <Route path="/quiz/capitals" element={<CapitalsQuiz />} />
          <Route path="/quiz/geography" element={<GeographyQuiz />} />
          <Route path="/quiz/emoji-movie" element={<EmojiMovieQuiz />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
