import { NumberMinMax } from "../types/types";
import { FaUndoAlt, FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

// Random number generator function using passed minimum and maximum values
export const randomNumber = (min: number, max: number): number => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  // console.log("Random Number is: ", number);

  // return Math.floor(Math.random() * (max - min + 1) + min);
  return number;
};

// interface RandomTwoNumbers {
//   numberOne: { min: number; max: number };
//   numberTwo: { min: number; max: number };
// }
// interface NumberMinMax {
//   min: number;
//   max: number;
// }

// Creates two random numbers between passed minimum and maximum values
export const randomTwoNumbers = (numberOne: NumberMinMax, numberTwo: NumberMinMax): { num1: number; num2: number } => {
  // console.log("numberOne: ", numberOne);
  // console.log("numberTwo: ", numberTwo);
  const randomNum1 = randomNumber(numberOne.min, numberOne.max);
  const randomNum2 = randomNumber(numberTwo.min, numberTwo.max);
  // console.log("Random Two Numbers are: ", randomNum1, randomNum2);

  return { num1: randomNum1, num2: randomNum2 };
};

// Generates random problems to be displayed in a pdf file for download and printing
export const generateAdditionProblemsForPDF = (numProblems: number, numberOneRange: NumberMinMax, numberTwoRange: NumberMinMax) => {
  const problems = [];

  for (let i = 0; i < numProblems; i++) {
    const { num1, num2 } = randomTwoNumbers(numberOneRange, numberTwoRange);
    // console.log("num1: ", num1, "num2: ", num2);

    problems.push(`${num1} + ${num2} = ________`);
  }

  return problems;
};
// export const randomTwoNumbers = (min: number, max: number): { num1: number; num2: number } => {
//   const randomNum1 = randomNumber(min, max);
//   const randomNum2 = randomNumber(min, max);
//   console.log("Random Two Numbers are: ", randomNum1, randomNum2);

//   return { num1: randomNum1, num2: randomNum2 };
// };
// TODO - pass in number 1, number 2, and userAnswer
// May have issues with string and number value type comparison
// export const checkAnswer = ({ numberOne, numberTwo, userInput }: CheckAnswer): boolean => {
//   // const { num1, num2, userAnswer } = values;
//   console.log("numberOne: ", numberOne);
//   console.log("numberTwo: ", numberTwo);
//   console.log("userInput: ", userInput);
//   const correctAnswer = numberOne + numberTwo;
//   // console.log("Correct Answer is: ", correctAnswer);
//   // console.log("User Answer is: ", userAnswer);

//   return Number(userInput) === correctAnswer;
// };

interface CheckAnswer {
  numberOne: number;
  numberTwo: number;
  userInput: string;
  operationType: string;
}

// TODO
export const checkAnswer = ({ numberOne, numberTwo, userInput, operationType }: CheckAnswer): boolean => {
  console.log("operation type is: ", operationType);
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

  console.log("Correct Answer is: ", correctAnswer);
  const isCorrect = Number(userInput) === correctAnswer ? true : false;
  console.log("is user correct? ", isCorrect ? "yes" : "no");
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
