import { randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";
import useSettingsStore from "@/store/store";

interface RestartBtnProps {
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

const RestartBtn = ({ operationType }: RestartBtnProps) => {
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const restartGame = useSettingsStore((state) => state.restartGame);

  // Restart the game with new random numbers passed to update our store
  const handleGlobalReset = (operationType: RestartBtnProps["operationType"]) => {
    console.log("RESTART BUTTON CLICKED...");
    // DIVISION PROBLEM RESET
    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      restartGame(num1, num2);
    } else {
      // operationType is ADDITION | SUBTRACTION | MULTIPLICATION
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      restartGame(num1, num2);
    }
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300"
      onClick={() => handleGlobalReset(operationType)}
      data-testid="restart-btn"
      role="button"
    >
      Restart Game
    </button>
  );
};

export default RestartBtn;
