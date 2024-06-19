import React from 'react';

const ThankYouScreen = () => {
  return (
    <div className="p-6 w-4/5 mx-auto rounded-xl shadow-md space-y-4 text-center text-white">
      <h2 className="uppercase glow text-lg lg:text-xl font-orbitron">
        Thank You!
      </h2>
      <p className="text-med sm:text-lg lg:text-xl">
        Your selection has been recorded.
      </p>
    </div>
  );
};

export default ThankYouScreen;
