import { useState } from "react";

export default function QuizCard({ quiz, index }) {
  const [selected, setSelected] = useState(null);      // which option user clicked
  const [showAnswer, setShowAnswer] = useState(false); // whether to reveal result

  const handleSelect = (option) => {
    if (selected !== null) return;   // prevent changing answer
    setSelected(option);
    setShowAnswer(true);
  };

  const isCorrect = selected === quiz.correctAnswer;

  return (
    <div className="p-4 border rounded bg-white">
      <p className="font-semibold text-gray-800">{index + 1}. {quiz.question}</p>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quiz.options?.map((opt, i) => {
          const isSelected = selected === opt;
          const correct = showAnswer && opt === quiz.correctAnswer;
          const wrongSelected = showAnswer && isSelected && !isCorrect;

          let classes = "p-3 rounded border hover:scale-105 transition";
          if (correct) classes = "p-3 rounded border bg-green-500 text-white";
          else if (wrongSelected) classes = "p-3 rounded border bg-red-400 text-white";
          else if (isSelected) classes = "p-3 rounded border bg-gray-100";

          return (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              className={classes}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showAnswer && (
        <p className="mt-3 text-sm text-gray-700">
          {isCorrect ? "Correct ✅" : `Wrong — correct: ${quiz.correctAnswer}`}
        </p>
      )}
    </div>
  );
}
