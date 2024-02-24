import { NumberMinMax, CheckAnswer, OperationType } from "../types/types";
import { FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { Svg, Path } from "@react-pdf/renderer";

// Random number generator function using passed minimum and maximum values
export const randomNumber = (min: number, max: number): number => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);

  return number;
};

// Creates two random numbers between passed minimum and maximum values
export const randomTwoNumbers = (numberOne: NumberMinMax, numberTwo: NumberMinMax): { num1: number; num2: number } => {
  const randomNum1 = randomNumber(Number(numberOne.min), Number(numberOne.max));
  const randomNum2 = randomNumber(Number(numberTwo.min), Number(numberTwo.max));

  return { num1: randomNum1, num2: randomNum2 };
};

// TODO - Optimize this function to generate a new number in one call
export const randomTwoNumbersForDivision = (numberOne: NumberMinMax, numberTwo: NumberMinMax): { num1: number; num2: number } => {
  // Generate two random numbers between min and max
  const randomNum1 = randomNumber(Number(numberOne.min), Number(numberOne.max));
  const randomNum2 = randomNumber(Number(numberTwo.min), Number(numberTwo.max));

  // CALCULATE RESULT TO CHECK IF IT IS A WHOLE NUMBER
  const result = randomNum1 / randomNum2;
  if (result % 1 === 0) {
    return { num1: randomNum1, num2: randomNum2 };
  } else {
    // FAIL CALL AGAIN
    return randomTwoNumbersForDivision(numberOne, numberTwo);
  }
};

// Generates random problems to be displayed in a pdf file for download and printing
export const generateProblemsForPDF = (numProblems: number, numberOneRange: NumberMinMax, numberTwoRange: NumberMinMax) => {
  const problems = [];

  for (let i = 0; i < numProblems; i++) {
    const { num1, num2 } = randomTwoNumbers(numberOneRange, numberTwoRange);

    problems.push(`${num1} + ${num2} = ________`);
  }

  return problems;
};

// TODO - Create a seperate function OR conditional for division to use randomTwoNumbersForDivision
export const generateProblems = (
  numProblems: number,
  numberOneRange: NumberMinMax,
  numberTwoRange: NumberMinMax,
  problemType: OperationType
) => {
  const problems = [];
  const operationIcon = getOperationIconForPDF(problemType);

  for (let i = 0; i < numProblems; i++) {
    const { num1, num2 } = randomTwoNumbers(numberOneRange, numberTwoRange);

    // Will pass an object with three properties which will be rearranged in our PDFWorksheetGenerator file
    problems.push({ num1: num1, num2: num2, operationIcon: operationIcon });
  }

  return problems;
};

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

export const getOperationIcon = (operationType: OperationType): JSX.Element => {
  switch (operationType) {
    case "ADDITION":
      return <IoMdAdd data-testid="add-icon" />;
    // return <IoMdAdd role="img" />;
    case "SUBTRACTION":
      return <RiSubtractFill data-testid="subtract-icon" />;
    case "MULTIPLICATION":
      return <FaTimes data-testid="multiply-icon" />;
    case "DIVISION":
      return <FaDivide data-testid="divide-icon" />;
    default:
      throw new Error(`Unsupported operation: ${operationType}`);
  }
};

// Returns an icon for the PDF file - Needs to be created in this manner to be compatible with react-pdf
export const getOperationIconForPDF = (operationType: OperationType): JSX.Element => {
  switch (operationType) {
    case "ADDITION":
      return (
        <Svg viewBox="0 0 512 512" stroke="black" fill="black" width={16} height={16}>
          <Path d={"M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"} />
        </Svg>
      );
    case "SUBTRACTION":
      return (
        <Svg viewBox="0 0 24 24" stroke="black" fill="black" width={16} height={16}>
          <Path d={"M19 11H5V13H19V11Z"} />
        </Svg>
      );
    case "MULTIPLICATION":
      return (
        <Svg viewBox="0 0 352 512" stroke="black" fill="black" width={16} height={16}>
          <Path
            d={
              "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            }
          />
        </Svg>
      );
    case "DIVISION":
      return (
        <Svg viewBox="0 0 448 512" stroke="black" fill="black" width={16} height={16}>
          <Path
            d={
              "M224 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0-192c35.35 0 64-28.65 64-64s-28.65-64-64-64-64 28.65-64 64 28.65 64 64 64zm192 48H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            }
          />
        </Svg>
      );
    default:
      throw new Error(`Unsupported operation: ${operationType}`);
  }
};
