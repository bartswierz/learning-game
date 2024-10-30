import useSettingsStore from "@/store/store";
import { checkAnswer, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";
import { useTranslation } from "react-i18next";
import Button from "../../Buttons/Button";
import { THEME } from "@/types/types";

interface CheckAnswerBtnProps {
  disabled: boolean;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  text: "Check Answer" | "=";
  userInput: string;
}
const CheckAnswerBtn = ({ disabled, operationType, text, userInput }: CheckAnswerBtnProps) => {
  const { t } = useTranslation();
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
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
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isUserCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isUserCorrect) {
      // FINAL QUESTIONS HAS BEEN ANSWERED - GAME OVER
      if (questionNumber === numOfQuestions) {
        incrementScore();
        updateIsGameOver(true);
      } else {
        const { newNum1, newNum2 } = getNumbersForNextQuestion(operationType);
        // USER ANSWERED CORRECTLY - UPDATES: numberOne = newNum1, numberTwo = newNum2, userInput = '', score + 1
        updateForCorrectAnswer(newNum1, newNum2);
      }
    }

    // INCORRECT ANSWER
    else {
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
          const { newNum1, newNum2 } = getNumbersForNextQuestion(operationType);
          updateForMoreAttempts(newNum1, newNum2);
        } else if (outOfQuestions) {
          // USER RAN OUT OF ATTEMPTS & NO MORE QUESTIONS - END GAME
          if (questionNumber === numOfQuestions) {
            updateIsGameOver(true);
          }
        }
      }
    }
  };

  return (
    <Button onClick={handleClick} disabled={disabled} ariaLabel="button-equal" variant={THEME}>
      {t(text)}
    </Button>
  );
};

export default CheckAnswerBtn;
