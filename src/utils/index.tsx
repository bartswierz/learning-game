import { NumberMinMax, CheckAnswer } from "../types/types";
import { FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

// Random number generator function using passed minimum and maximum values
export const randomNumber = (min: number, max: number): number => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);

  // return Math.floor(Math.random() * (max - min + 1) + min);
  return number;
};

// Creates two random numbers between passed minimum and maximum values
export const randomTwoNumbers = (numberOne: NumberMinMax, numberTwo: NumberMinMax): { num1: number; num2: number } => {
  const randomNum1 = randomNumber(numberOne.min, numberOne.max);
  const randomNum2 = randomNumber(numberTwo.min, numberTwo.max);

  return { num1: randomNum1, num2: randomNum2 };
};

export const randomTwoNumbersForDivision = (numberOne: NumberMinMax, numberTwo: NumberMinMax): { num1: number; num2: number } => {
  // Generate two random numbers between min and max
  const randomNum1 = randomNumber(numberOne.min, numberOne.max);
  const randomNum2 = randomNumber(numberTwo.min, numberTwo.max);

  // CALCULATE RESULT TO CHECK IF IT IS A WHOLE NUMBER
  const result = randomNum1 / randomNum2;
  if (result % 1 === 0) {
    return { num1: randomNum1, num2: randomNum2 };
  } else {
    // FAIL CALL AGAIN
    return randomTwoNumbersForDivision(numberOne, numberTwo);
  }
};

// Usage example:

// Generates random problems to be displayed in a pdf file for download and printing
export const generateAdditionProblemsForPDF = (numProblems: number, numberOneRange: NumberMinMax, numberTwoRange: NumberMinMax) => {
  const problems = [];

  for (let i = 0; i < numProblems; i++) {
    const { num1, num2 } = randomTwoNumbers(numberOneRange, numberTwoRange);

    problems.push(`${num1} + ${num2} = ________`);
  }

  return problems;
};

// TODO
export const checkAnswer = ({ numberOne, numberTwo, userInput, operationType }: CheckAnswer): boolean => {
  let correctAnswer;

  switch (operationType) {
    case "ADDITION":
      correctAnswer = numberOne + numberTwo;
      break;
    case "SUBTRACTION":
      correctAnswer = numberOne - numberTwo;
      break;
    case "MULTIPLICATION":
      correctAnswer = numberOne * numberTwo;
      break;
    case "DIVISION":
      correctAnswer = numberOne / numberTwo;
      break;
    default:
      throw new Error(`Unsupported operation: ${operationType}`);
  }

  const isCorrect = Number(userInput) === correctAnswer ? true : false;
  return isCorrect;
};

// Checks if user input is a number or decimal. Values are passed as strings because we are appending to a string for display(ex. user clicks 1, user clicks 5 = '15')
export const isNumberOrDecimal = (input: string): boolean => {
  if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(input)) return true;
  else return false;
};

export const getOperationIcon = (operationType: string): JSX.Element => {
  switch (operationType) {
    case "ADDITION":
      return <IoMdAdd />;
    case "SUBTRACTION":
      return <RiSubtractFill />;
    case "MULTIPLICATION":
      return <FaTimes />;
    case "DIVISION":
      return <FaDivide />;
    default:
      throw new Error(`Unsupported operation: ${operationType}`);
  }
};
