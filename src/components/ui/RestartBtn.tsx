import { randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";
import useSettingsStore from "@/store/store";
import Button from "./Buttons/Button";

interface RestartBtnProps {
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  // resetTime: (time: number) => void;
  resetTimer: () => void;
}

const RestartBtn = ({ operationType, resetTimer }: RestartBtnProps) => {
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const restartGame = useSettingsStore((state) => state.restartGame);

  // Restart the game with new random numbers passed to update our store
  const handleGlobalReset = (operationType: RestartBtnProps["operationType"]) => {
    resetTimer(); // resets the timer back to 0

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
    <Button className="" onClick={() => handleGlobalReset(operationType)} data-testid="restart-btn" role="button">
      Try Again
    </Button>
  );
};

export default RestartBtn;
