import React from 'react';

const ChoiceCard = () => {
  return (
    <div className="p-6 max-w-md mx-auto rounded-xl bg-zinc-900 shadow-md space-y-4 border border-soft-neon-green transform scale-110 opacity-0 transition-transform duration-700 animate-fade-in" style={{ boxShadow: '0 0 15px #a5ffb1' }}>
      <h2 className="text-white uppercase glow text-xl sm:text-2xl lg:text-3xl font-orbitron">
        New Card Content
      </h2>
      <p className="text-white">
        This is the new card that appears after the username card fades away.
      </p>
    </div>
  );
};

export default ChoiceCard;
