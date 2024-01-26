// import { useState } from "react";
import useSettingsStore from "@/store/store";
import { checkAnswer, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

interface CheckAnswerProps {
  disabled: boolean;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  text: string;
  className: string;
}
const CheckAnswer = ({ disabled, operationType, text, className }: CheckAnswerProps) => {
  // const [isDisabled, setIsDisabled] = useState(false);
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const updateForCorrectAnswer = useSettingsStore((state) => state.updateForCorrectAnswer);
  const updateForIncorrectAnswer = useSettingsStore((state) => state.updateForIncorrectAnswer);
  const updateIsGameOver = useSettingsStore((state) => state.updateIsGameOver);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const score = useSettingsStore((state) => state.score);
  const userInput = useSettingsStore((state) => state.userInput);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);

  const handleCheck = () => {
    console.log("inside handleCheck");
    // const { userInput, numberOne, numberTwo } = globals;
    // TODO - replace this checkAnswer with a specific function for each operation
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isCorrect) {
      let newNum1: number;
      let newNum2: number;

      if (operationType === "DIVISION") {
        const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
        // replace this with a
        newNum1 = num1;
        newNum2 = num2;
      } else {
        const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
        newNum1 = num1;
        newNum2 = num2;
      }

      // USER ANSWERED CORRECTLY - UPDATES: numberOne = newNum1, numberTwo = newNum2, userInput = '', score + 1
      updateForCorrectAnswer(newNum1, newNum2);

      // SUCCESS: ALL QUESTIONS ANSWERED - GAME OVER
      if (score === numOfQuestions - 1) {
        updateIsGameOver(true);
      }
    } else {
      // INCORRECT ANSWER - attemptsLeft - 1 & userInput = ''
      updateForIncorrectAnswer();

      // FAILED: USER RAN OUT OF ATTEMPTS - GAME OVER
      if (attemptsLeft - 1 === 0) {
        updateIsGameOver(true);
      }
    }
  };

  return (
    <button
      onClick={handleCheck}
      className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-xl px-2 py-3 ${className}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default CheckAnswer;
