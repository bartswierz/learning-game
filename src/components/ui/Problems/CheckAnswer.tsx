// import { useState } from "react";
import useSettingsStore from "@/store/store";
import { checkAnswer, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

interface CheckAnswerProps {
  disabled: boolean;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  text: "Check Answer" | "=";
  className?: string;
  userInput: string;
}
const CheckAnswer = ({ disabled, operationType, text, className, userInput }: CheckAnswerProps) => {
  // const [isDisabled, setIsDisabled] = useState(false);
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  // const numOneRange = useSettingsStore((state) => state.settings);
  const updateForCorrectAnswer = useSettingsStore((state) => state.updateForCorrectAnswer);
  const updateForIncorrectAnswer = useSettingsStore((state) => state.updateForIncorrectAnswer);
  const updateForMoreAttempts = useSettingsStore((state) => state.updateForMoreAttempts);
  const updateIsGameOver = useSettingsStore((state) => state.updateIsGameOver);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const questionNumber = useSettingsStore((state) => state.questionNumber);

  const getNumbersForNextQuestion = (operationType: CheckAnswerProps["operationType"]) => {
    let newNum1: number;
    let newNum2: number;

    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      // replace this with a
      newNum1 = num1;
      newNum2 = num2;
      return { newNum1: newNum1, newNum2: newNum2 };
    } else {
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      newNum1 = num1;
      newNum2 = num2;
      return { newNum1: newNum1, newNum2: newNum2 };
    }
  };

  const handleCheck = () => {
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isCorrect) {
      const { newNum1, newNum2 } = getNumbersForNextQuestion(operationType);

      // FINAL QUESTIONS HAS BEEN ANSWERED - GAME OVER
      if (questionNumber === numOfQuestions) {
        updateIsGameOver(true);
      }

      // USER ANSWERED CORRECTLY - UPDATES: numberOne = newNum1, numberTwo = newNum2, userInput = '', score + 1
      updateForCorrectAnswer(newNum1, newNum2);
    } else {
      console.log("isCorrect: ", isCorrect);
      // INCORRECT ANSWER - DECREASE the attemptsLeft by 1 & reset userInput
      updateForIncorrectAnswer();

      const outOfAttempts: boolean = attemptsLeft - 1 === 0;
      // USER RAN OUT OF ATTEMPTS
      if (outOfAttempts) {
        // USER RAN OUT OF ATTEMPTS, FETCH MORE HERE IF THERE IS MORE QUESTIONS TO BE ASKED
        const hasMoreQuestions: boolean = questionNumber < numOfQuestions;
        const outOfQuestions: boolean = questionNumber === numOfQuestions;
        // USER HASN'T ANSWERED ALL QUESTIONS YET - FETCH MORE NUMBERS
        if (hasMoreQuestions) {
          console.log("Question #", questionNumber);
          const { newNum1, newNum2 } = getNumbersForNextQuestion(operationType);
          updateForMoreAttempts(newNum1, newNum2);
        } else if (outOfQuestions) {
          // USER RAN OUT OF ATTEMPTS & NO MORE QUESTIONS
          if (questionNumber === numOfQuestions) {
            console.log("user ran out of attempts & no more questions, ending game...");
            updateIsGameOver(true);
          }
        }
      }
    }
  };

  return (
    <button
      onClick={handleCheck}
      className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-xl px-2 py-3 ${className}`}
      disabled={disabled}
      // aria-label="button-="
    >
      {text}
    </button>
  );
};

export default CheckAnswer;
