import React, { useState } from 'react';
import UsernameCard from './UsernameCard';
import QuestionCard from './QuestionCard';
import FinalResultCard from './FinalResultCard';
import ThankYouScreen from './ThankYouScreen';

const questions = [
  {
    question: "What's your preferred combat style?",
    answer1: "Melee",
    answer2: "Magic",
  },
  // Add more questions as needed
];

const Body = () => {
  const [state, setState] = useState(0);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState({ Aegis: 0, Justiciar: 0 });
  const [visible, setVisible] = useState(true);

  const handleUpdateState = (name) => {
    setUsername(name);
    setVisible(false);
    setTimeout(() => {
      setState(1); // Start showing questions from the first question
      setVisible(true);
    }, 500); // Adjust the duration to match the animation time
  };

  const handleSelectAnswer = (type) => {
    setScore((prevScore) => ({
      ...prevScore,
      [type]: prevScore[type] + 1,
    }));
    setVisible(false);
    setTimeout(() => {
      setState((prevState) => prevState + 1);
      setVisible(true);
    }, 500); // Reduce the delay for quicker transition
  };

  const handleFinalSelection = async (faction) => {
    console.log(`${username} selected ${faction}`);

    const base64WebhookUrl = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI1Mjg2OTA3MjY3NzM3NjA2Mi9mWE14TjA3eUwxRmo0YmY1Y3hIY3Nua2ZWdkdvd2R3Skc0QWpBaGp0cy1OcWN1VUJmY0FUOE1PV191dG5oaUg2Nl9BeA==';
    const webhookUrl = atob(base64WebhookUrl);

    const messageContent = {
      content: `New form submission:\n> **Username:** ${username}\n> **Selected Faction:** ${faction} ${faction === "Justiciar" ? ":blue_square:" : ":red_square:"}\n> **Scores:** Aegis: \`${score.Aegis}\` and Justiciar: \`${score.Justiciar}\``
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageContent)
      });

      if (response.ok) {
        console.log('Form data sent to Discord successfully');
      } else {
        console.error('Failed to send form data to Discord');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setVisible(false);
    setTimeout(() => {
      setState('thankYou');
      setVisible(true);
    }, 500); // Adjust the duration to match the animation time
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 p-4 sm:p-6 lg:p-8 relative">
      <div className={`transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {state === 0 && <UsernameCard updateState={handleUpdateState} />}
        {state > 0 && state <= questions.length && (
          <QuestionCard
            key={state} // Ensure a new key for each question to trigger re-mounting
            number={state}
            question={questions[state - 1].question}
            answer1={questions[state - 1].answer1}
            answer2={questions[state - 1].answer2}
            onSelect={handleSelectAnswer}
          />
        )}
        {state > questions.length && state !== 'thankYou' && (
          <FinalResultCard score={score} onSelect={handleFinalSelection} />
        )}
        {state === 'thankYou' && <ThankYouScreen />}
      </div>
    </div>
  );
};

export default Body;
