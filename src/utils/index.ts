// Random number generator function using passed minimum and maximum values
export const randomNumber = (min: number, max: number): number => {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("Random Number is: ", number);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Creates two random numbers between passed minimum and maximum values
export const randomTwoNumbers = (min: number, max: number): { firstNumber: number; secondNumber: number } => {
  const firstNumber = randomNumber(min, max);
  const secondNumber = randomNumber(min, max);
  console.log("Random Two Numbers are: ", firstNumber, secondNumber);

  return { firstNumber: firstNumber, secondNumber: secondNumber };
};

// TODO - pass in number 1, number 2, and userAnswer
// May have issues with string and number value type comparison
export const isCorrectAnswer = (num1: number, num2: number, userAnswer: number): boolean => {
  const correctAnswer = num1 + num2;
  console.log("Correct Answer is: ", correctAnswer);
  console.log("User Answer is: ", userAnswer);

  return userAnswer === correctAnswer;
};
