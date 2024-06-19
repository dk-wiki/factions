import React, { useState, useRef } from 'react';

const UsernameCard = ({ updateState }) => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    const regex = /^.{3,32}$/;
    setIsValid(regex.test(value));
  };

  const handleSubmit = () => {
    if (isValid && username !== '') {
      setSubmitted(true);
      setTimeout(() => {
        updateState(username);
      }, 1000); // Adjust the duration to match the animation time
    }
  };

  return (
    <div
      className={`p-6 max-w-md mx-auto rounded-xl bg-zinc-900 shadow-md space-y-4 border border-soft-neon-green transition-all duration-700 ${
        submitted ? 'transform scale-110 opacity-0' : 'transform scale-100 opacity-100'
      }`}
      style={{ boxShadow: '0 0 15px #a5ffb1' }}
    >
      <h2 className="text-white uppercase glow text-med sm:text-lg lg:text-xl font-orbitron">
        Enter your discord username
      </h2>
      <div className="relative flex-row items-center justify-center">
        <input
          ref={inputRef}
          type="text"
          value={username}
          onChange={handleChange}
          className="w-full border-b-0 focus:outline-none bg-transparent text-white text-center"
          placeholder="Username"
        />
        <div className="bg-white p-[0.5px] my-2 w-full" />
      </div>
      <button
        onClick={handleSubmit}
        className="flex items-center justify-end w-full py-2 text-slate-300 text-sm font-roboto group"
      >
        Continue
        <span className="ml-2 transform group-hover:translate-x-1 transition duration-300">→</span>
      </button>
    </div>
  );
};

export default UsernameCard;
