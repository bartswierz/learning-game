import { Globals, Settings } from "@/types/types";
import { randomTwoNumbers } from "@/utils";

interface RestartBtnProps {
  setGlobalsCallback: (globals: Globals) => void;
  settings: Settings;
}

const RestartBtn = ({ setGlobalsCallback, settings }: RestartBtnProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;

  const handleGlobalReset = () => {
    const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);

    setGlobalsCallback({
      numOneRange: numOneRange,
      numTwoRange: numTwoRange,
      numOfAttempts: numOfAttempts,
      numOfQuestions: numOfQuestions,
      score: 0,
      progress: null,
      isGameOver: false,
      userInput: "",
      numberOne: num1,
      numberTwo: num2,
    });
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300"
      onClick={handleGlobalReset}
      data-testid="restart-btn"
    >
      Restart Game
    </button>
  );
};

export default RestartBtn;
