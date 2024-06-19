import React, { useState, useEffect } from 'react';

const QuestionCard = ({ number, question, answer1, answer2, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // Slight delay to trigger fade-in
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (type) => {
    setSubmitted(true);
    setTimeout(() => {
      onSelect(type);
    }, 500); // Reduce duration for quicker transition
  };

  return (
    <div className={`p-6 w-full max-w-md mx-auto rounded-xl bg-zinc-900 shadow-md space-y-4 border border-soft-neon-green transition-all duration-700 ${submitted ? 'transform scale-110 opacity-0' : visible ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`} style={{ boxShadow: '0 0 15px #a5ffb1' }}>
      <h2 className="text-white uppercase glow text-med sm:text-lg lg:text-xl font-orbitron text-center">
        Question {number}
      </h2>
      <p className="text-white text-center font-exo2">{question}</p>
      <div className="space-y-2">
        <button
          onClick={() => handleClick('Aegis')}
          className="w-full py-2 px-4 text-slate-300 text-sm font-exo2 bg-gray-700 rounded hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          {answer1}
        </button>
        <button
          onClick={() => handleClick('Justiciar')}
          className="w-full py-2 px-4 text-slate-300 text-sm font-exo2 bg-gray-700 rounded hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          {answer2}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
