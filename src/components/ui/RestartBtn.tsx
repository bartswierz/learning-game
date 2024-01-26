// import { Globals, Settings } from "@/types/types";
import { randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";
import useSettingsStore from "@/store/store";
/*
operationType passed from Problems component to know which random function to use for the random numbers, division requires a different random function to ensure the numbers are divisible
*/
interface RestartBtnProps {
  // setGlobalsCallback: (globals: Globals) => void;
  // settings: Settings;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

const RestartBtn = ({ operationType }: RestartBtnProps) => {
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const restartGame = useSettingsStore((state) => state.restartGame);

  const handleGlobalReset = () => {
    // DIVISION PROBLEM RESET
    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      // TODO - create a GlobalReset function in Zustand store
      restartGame(num1, num2);
    } else {
      // ADDITION/SUBTRACTION/MULTIPLICATION PROBLEM RESET
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      restartGame(num1, num2);
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
