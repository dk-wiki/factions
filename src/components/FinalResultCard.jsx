import React, { useState, useEffect } from 'react';

const FinalResultCard = ({ score, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100); // Slight delay to trigger fade-in
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (faction) => {
    setSubmitted(true);
    setTimeout(() => {
      onSelect(faction);
    }, 500); // Reduce duration for quicker transition
  };

  const total = score.Aegis + score.Justiciar;
  const aegisPercentage = ((score.Aegis / total) * 100).toFixed(2);
  const justiciarPercentage = ((score.Justiciar / total) * 100).toFixed(2);

  return (
    <div
      className={`p-6 w-full mx-auto rounded-xl bg-zinc-900 shadow-md space-y-4 border border-soft-neon-green transition-all duration-700 ${submitted ? 'transform scale-110 opacity-0' : visible ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0'}`}
      style={{ boxShadow: '0 0 15px #a5ffb1' }}
    >
      <h2 className="text-white uppercase glow text-med sm:text-lg lg:text-xl font-orbitron text-center">
        Choose Your Faction
      </h2>
      <div className="flex flex-col md:flex-row justify-around md:space-x-4 space-y-4 md:space-y-0 faction-container">
        <div
          onClick={() => handleSelect('Aegis')}
          className="faction-card aegis-card p-4 w-full md:w-1/2 text-center rounded-lg border border-red-600 transition duration-300"
        >
          <h3 className="text-white font-bold text-xl">Aegis</h3>
          <div className="mt-2 text-red-300 text-lg">
            {aegisPercentage}% Aegis
          </div>
          <img src="Ajax.svg" alt="Aegis" className="mt-4 w-48 h-48 mx-auto" />
        </div>
        <div
          onClick={() => handleSelect('Justiciar')}
          className="faction-card justiciar-card p-4 w-full md:w-1/2 text-center rounded-lg border border-blue-600 transition duration-300"
        >
          <h3 className="text-white font-bold text-xl">Justiciar</h3>
          <div className="mt-2 text-blue-300 text-lg">
            {justiciarPercentage}% Justiciar
          </div>
          <img src="Executioner.svg" alt="Justiciar" className="mt-4 w-48 h-48 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default FinalResultCard;
