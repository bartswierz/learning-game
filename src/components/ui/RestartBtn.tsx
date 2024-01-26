import { Globals, Settings } from "@/types/types";
import { randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

/*
operationType passed from Problems component to know which random function to use for the random numbers, division requires a different random function to ensure the numbers are divisible
*/
interface RestartBtnProps {
  setGlobalsCallback: (globals: Globals) => void;
  settings: Settings;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

const RestartBtn = ({ setGlobalsCallback, settings, operationType }: RestartBtnProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;

  const handleGlobalReset = () => {
    // DIVISION PROBLEM RESET
    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      // TODO - create a GlobalReset function in Zustand store
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
    } else {
      // ADDITION/SUBTRACTION/MULTIPLICATION PROBLEM RESET
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
    }
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
