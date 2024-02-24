// import { useState } from "react";
import useSettingsStore from "@/store/store";
import { checkAnswer, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

interface CheckAnswerBtnProps {
  disabled: boolean;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  text: "Check Answer" | "=";
  userInput: string;
}
const CheckAnswerBtn = ({ disabled, operationType, text, userInput }: CheckAnswerBtnProps) => {
  // const [isDisabled, setIsDisabled] = useState(false);
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  // const numOneRange = useSettingsStore((state) => state.settings);
  const updateForCorrectAnswer = useSettingsStore((state) => state.updateForCorrectAnswer);
  const updateForIncorrectAnswer = useSettingsStore((state) => state.updateForIncorrectAnswer);
  const updateForMoreAttempts = useSettingsStore((state) => state.updateForMoreAttempts);
  const updateIsGameOver = useSettingsStore((state) => state.updateIsGameOver);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const incrementScore = useSettingsStore((state) => state.incrementScore);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const questionNumber = useSettingsStore((state) => state.questionNumber);

  const getNumbersForNextQuestion = (operationType: CheckAnswerBtnProps["operationType"]) => {
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

  const handleClick = () => {
    console.log("Check Answer Button Clicked");
    console.log("user input: ", userInput);
    console.log("numberOne & numberTwo: ", numberOne, numberTwo);
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isUserCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isUserCorrect) {
      console.log("value is correct");
      // BUG - game is being marked as over before the last score is added

      // FINAL QUESTIONS HAS BEEN ANSWERED - GAME OVER
      if (questionNumber === numOfQuestions) {
        incrementScore();
        updateIsGameOver(true);
      } else {
        const { newNum1, newNum2 } = getNumbersForNextQuestion(operationType);
        console.log("inside update for new question");
        // USER ANSWERED CORRECTLY - UPDATES: numberOne = newNum1, numberTwo = newNum2, userInput = '', score + 1
        updateForCorrectAnswer(newNum1, newNum2);
      }
    }

    // INCORRECT ANSWER
    else {
      console.log("incorrect answer, user input: ", userInput);
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
            console.log("Out of attempts & no more questions, ending game...");
            updateIsGameOver(true);
          }
        }
      }
    }
  };

  return (
    <button
      className={`relative flex items-center justify-center max-w-[300px] w-full h-full transition-all duration-700 ease-in-out`}
      onClick={handleClick}
      disabled={disabled}
      aria-label="button-equal"
    >
      {/* BACKGROUND*/}
      <div
        className={`absolute inset-x-0 h-full -bottom-2 rounded-lg 
        ${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"}`}
      ></div>

      {/* TEXT CONTAINER */}
      <div
        className={`relative flex items-center justify-center w-full h-full  border-2 border-blue-600 rounded-lg py-2 transition transform duration-600 
        ${disabled ? "bg-gray-500 border-gray-600 cursor-not-allowed" : "bg-blue-500 active:translate-y-2"}`}
      >
        {text}
      </div>
    </button>
  );
};

export default CheckAnswerBtn;
