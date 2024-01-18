// Random number generator function using passed minimum and maximum values
export const randomNumber = (min: number, max: number): number => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("Random Number is: ", number);

  // return Math.floor(Math.random() * (max - min + 1) + min);
  return number;
};

// interface RandomTwoNumbers {
//   numberOne: { min: number; max: number };
//   numberTwo: { min: number; max: number };
// }
interface NumberMinMax {
  min: number;
  max: number;
}

// Creates two random numbers between passed minimum and maximum values
export const randomTwoNumbers = (numberOne: NumberMinMax, numberTwo: NumberMinMax): { num1: number; num2: number } => {
  console.log("numberOne: ", numberOne);
  console.log("numberTwo: ", numberTwo);
  const randomNum1 = randomNumber(numberOne.min, numberOne.max);
  const randomNum2 = randomNumber(numberTwo.min, numberTwo.max);
  console.log("Random Two Numbers are: ", randomNum1, randomNum2);

  return { num1: randomNum1, num2: randomNum2 };
};
// export const randomTwoNumbers = (min: number, max: number): { num1: number; num2: number } => {
//   const randomNum1 = randomNumber(min, max);
//   const randomNum2 = randomNumber(min, max);
//   console.log("Random Two Numbers are: ", randomNum1, randomNum2);

//   return { num1: randomNum1, num2: randomNum2 };
// };

// TODO - pass in number 1, number 2, and userAnswer
// May have issues with string and number value type comparison
export const checkAnswer = (num1: number, num2: number, userAnswer: string): boolean => {
  const correctAnswer = num1 + num2;
  console.log("Correct Answer is: ", correctAnswer);
  console.log("User Answer is: ", userAnswer);

  return Number(userAnswer) === correctAnswer;
};
