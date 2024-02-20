import { useNavigate } from "react-router-dom";

import RestartBtn from "../RestartBtn";

interface DisplayResultsProps {
  score: number;
  numOfQuestions: number;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

// Display the game over message and restart button with user results
const DisplayResults = ({ score, numOfQuestions, operationType }: DisplayResultsProps) => {
  const navigate = useNavigate();

  const calculatePercentage = (score: number, numOfQuestions: number) => {
    return (score / numOfQuestions) * 100;
  };

  const percentage = calculatePercentage(score, numOfQuestions);

  // Redirect user back to home page
  const HomeButton = () => {
    const redirectBackToHome = () => navigate("/");

    return (
      <button
        className="bg-gray-400 hover:bg-gray-500 transition-color duration-200 ease-in px-4 py-2 rounded-full w-[140px] w-fullx"
        onClick={redirectBackToHome}
      >
        No
      </button>
    );
  };

  return (
    <div className="flex justify-center gap-2 items-center flex-col h-[50vh] mt-[56px]">
      <p className="text-xl">Game Over</p>
      <p className="text-lg">
        Questions: {score} / {numOfQuestions}
      </p>
      <p className="text-lg">
        Score: <span className="text-blue-500 font-bold">{percentage}%</span>
      </p>
      <p>Do you want to try again?</p>
      <div className="flex flex-wrap justify-center px-2 gap-2 mt-3">
        <HomeButton />
        <RestartBtn operationType={operationType} />
      </div>
    </div>
  );
};

export default DisplayResults;
