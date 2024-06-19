import React, { useState } from 'react';
import UsernameCard from './UsernameCard';
import QuestionCard from './QuestionCard';
import FinalResultCard from './FinalResultCard';
import ThankYouScreen from './ThankYouScreen';

const questions = [
  {
    question: "Justice is best upheld through",
    answer1: "Flexible interpretation to address individual circumstances.",
    answer2: "Strict adherence to laws.",
  },
  {
    question: "When dealing with someone who has committed a wrongdoing, it is more important to",
    answer1: "Show mercy and understanding, focusing on rehabilitation and forgiveness.",
    answer2: "Administer strict justice to ensure they face the full consequences of their actions.",
  },
  {
    question: "Conflict is",
    answer1: "A necessary means to achieve progress and change.",
    answer2: "A last resort when all other methods of resolution have failed.",
  },
  {
    question: "When faced with a moral dilemma, you prioritize",
    answer1: "Your personal sense of right and wrong.",
    answer2: "Your duty and loyalty to your cause.",
  },
  {
    question: "In a time of crisis, the leader should prioritize",
    answer1: "Maintaining individual freedoms and rights.",
    answer2: "Implementing controls and measures for collective safety."
  },
  {
    question: "To achieve a noble goal, it is acceptable to",
    answer1: "Use deceitful and underhanded methods if necessary.",
    answer2: "Adhere strictly to ethical practices, even at the risk of failure."
  },
  {
    question: "When making a difficult decision, it is more important to",
    answer1: "Consider the greater good and the overall outcome.",
    answer2: "Uphold moral principles and justice, regardless of the outcome."
  },
  {
    question: "In the pursuit of truth, it is more important to",
    answer1: "Challenge established norms and question everything.",
    answer2: "Respect and adhere to proven traditions and beliefs."
  },
  {
    question: "Leadership is best demonstrated through",
    answer1: "Inspiring and empowering others to achieve their best.",
    answer2: "Maintaining control and ensuring strict discipline."
  }
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

    const base64WebhookUrl = process.env.REACT_APP_DISCORD_WEBHOOK_URL;
    console.log(base64WebhookUrl);
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