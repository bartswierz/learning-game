// import { useState } from "react";
import useSettingsStore from "@/store/store";
import { checkAnswer, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

interface CheckAnswerProps {
  disabled: boolean;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  text: string;
  className?: string;
}
const CheckAnswer = ({ disabled, operationType, text, className }: CheckAnswerProps) => {
  // const [isDisabled, setIsDisabled] = useState(false);
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const updateForCorrectAnswer = useSettingsStore((state) => state.updateForCorrectAnswer);
  const updateForIncorrectAnswer = useSettingsStore((state) => state.updateForIncorrectAnswer);
  const updateForMoreAttempts = useSettingsStore((state) => state.updateForMoreAttempts);
  const updateIsGameOver = useSettingsStore((state) => state.updateIsGameOver);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const score = useSettingsStore((state) => state.score);
  const userInput = useSettingsStore((state) => state.userInput);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const questionNumber = useSettingsStore((state) => state.questionNumber);
  console.log("questionNumber: ", questionNumber);

  interface getNewNumbersProps {
    operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  }

  const getNumbersForNextQuestion = ({ operationType }: getNewNumbersProps) => {
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
    console.log("inside handleCheck");
    // const { userInput, numberOne, numberTwo } = globals;
    // TODO - replace this checkAnswer with a specific function for each operation
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isCorrect) {
      // let newNum1: number;
      // let newNum2: number;

      // if (operationType === "DIVISION") {
      //   const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      //   // replace this with a
      //   newNum1 = num1;
      //   newNum2 = num2;
      // } else {
      //   const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      //   newNum1 = num1;
      //   newNum2 = num2;
      // }
      const { newNum1, newNum2 } = getNumbersForNextQuestion(operationType);
      // console.log("CORRECT ANSWER - new numbers from getNumbersForNextQuestion: ", newNum1, newNum2);
      // USER ANSWERED CORRECTLY - UPDATES: numberOne = newNum1, numberTwo = newNum2, userInput = '', score + 1
      updateForCorrectAnswer(newNum1, newNum2);

      // SUCCESS: ALL QUESTIONS ANSWERED - GAME OVER
      if (score === numOfQuestions - 1) {
        updateIsGameOver(true);
      }
    } else {
      // INCORRECT ANSWER - attemptsLeft - 1 & userInput = ''
      updateForIncorrectAnswer();

      console.log("attemptsLeft: ", attemptsLeft);
      // TODO - update this to fetch new numbers IF there is more questions to be asked
      // FAILED: USER RAN OUT OF ATTEMPTS - GAME OVER
      // if (attemptsLeft - 1 === 0) {
      const outOfAttempts: boolean = attemptsLeft - 1 === 0;
      // if (attemptsLeft - 1 < 1) {
      if (outOfAttempts) {
        // updateIsGameOver(true);
        console.log("attemptsLeft: ", attemptsLeft, "\nquestionNumber: ", questionNumber, "\nnumOfQuestions: ", numOfQuestions);
        // USER RAN OUT OF ATTEMPTS, FETCH MORE HERE IF THERE IS MORE QUESTIONS TO BE ASKED
        const hasMoreQuestions: boolean = questionNumber !== numOfQuestions;
        const outOfQuestions: boolean = questionNumber === numOfQuestions;
        if (hasMoreQuestions) {
          console.log("user ran out of attempts, generating new numbers for next question");
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
    >
      {text}
    </button>
  );
};

export default CheckAnswer;
