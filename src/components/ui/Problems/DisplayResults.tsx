import RestartBtn from "../RestartBtn";

interface DisplayResultsProps {
  score: number;
  numOfQuestions: number;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

// Display the game over message and restart button with user results
const DisplayResults = ({ score, numOfQuestions, operationType }: DisplayResultsProps) => {
  const calculatePercentage = (score: number, numOfQuestions: number) => {
    return (score / numOfQuestions) * 100;
  };

  const percentage = calculatePercentage(score, numOfQuestions);

  return (
    <div className="flex justify-center gap-2 items-center flex-col bg-red-500x">
      <span className="text-xl">Game Over</span>
      <span className="text-lg">
        Questions: {score} / {numOfQuestions}
      </span>
      <span className="text-lg">
        Score: <span className="text-blue-500 font-bold">{percentage}%</span>
      </span>
      <RestartBtn operationType={operationType} />
    </div>
  );
};

export default DisplayResults;