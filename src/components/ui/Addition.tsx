import { useState, useEffect } from "react";
import { randomTwoNumbers, checkAnswer } from "@/utils";
import { Settings } from "@/types/index.ts";
import NumberPad from "./NumberPad";

interface AdditionProps {
  settings: Settings;
}

// Addition Question Game
// const Addition = ({ settings }: Settings) => {
const Addition = ({ settings }: AdditionProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
  // console.log("settings: ", settings);
  const [attempts, setAttempts] = useState<number>(numOfAttempts);
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  // const [correctAnswer, setCorrectAnswer] = useState<number>(numberOne + numberTwo);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState<"Success" | "InProgress" | "Failed" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [userInput, setUserInput] = useState<string>(""); // User input is a string due to "" being user for empty string AND we want to concatenate the user input to the end of the current input(ex. user clicking 1, then 5 will result in "15")

  const disabled: boolean = userInput === "" ? true : false;
  // Gets our new random values on mount - passing numOneRange and numTwoRange as dependencies if they change from user changing them in the settings
  useEffect(() => {
    const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
    setNumberOne(num1);
    setNumberTwo(num2);
  }, [numOneRange, numTwoRange]);

  /* 
  User Submit, 
  IF CORRECT: Score + 1, New Question 
  IF WRONG: Attempts-1
  */
  // const handleCheck = (e: { preventDefault: () => void }) => {
  const handleCheck = () => {
    // e.preventDefault();
    const isCorrect = checkAnswer(numberOne, numberTwo, userInput);

    // IF correct, score + 1, new question
    if (isCorrect) {
      setScore((prev) => prev + 1);
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange); // TODO - update max value to be the user's selected number range
      // console.log("inside handle submit - random numbers => num1, num2: ", num1, num2);
      // TODO - generate new random numbers
      setNumberOne(num1);
      setNumberTwo(num2);
      setUserInput(""); // Resets value to empty string
      // User reached the last question
      if (score === numOfQuestions - 1) {
        setGameOver(true); //will trigger conditional check of Success or Failed
        setProgress("Success"); // Will display the success message
      }
    } else {
      // Not correct, Decrease Attempts by 1
      setAttempts((prev) => prev - 1);
      if (attempts === 0) {
        setGameOver(true);
        setProgress("Failed"); // Will display the failed message
      }
    }
  };

  // Reset the game back to the original settings
  const handleGameReset = () => {
    setAttempts(numOfAttempts);
    setScore(0);
    setGameOver(false);
    setProgress(null);
    setUserInput("");
    const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
    setNumberOne(num1);
    setNumberTwo(num2);
  };

  return (
    <div
      className="bg-slate-900 w-fullX flex flex-col justify-center items-center text-white text-5xl b"
      data-testid="addition-component"
    >
      <div>
        {/* <span>Score: {score}</span> */}
        <span>
          Question: {score} / {numOfQuestions}
        </span>
      </div>
      {/* GAME IS COMPLETED - Game ends either the user reaches all questions OR runs out of attempts */}
      {/* TODO - move this into a separate component */}
      {gameOver ? ( // result === 'success' || result === 'failed'
        <>
          <div className="text-center font-bold">
            {/* User answered all questions */}
            {progress === "Success" && <p className="text-green-500">Good Job!</p>}
            {/* {
              // result === 'failed'
              progress === "InProgress" && (
                <>
                  <p>Incorrect</p>
                  <p>The correct answer is {numberOne + numberTwo}</p>
                </>
              )
            } */}
            {progress === "Failed" && ( //User ran out of attempts
              <>
                <p>Incorrect</p>
                <p>The correct answer is {numberOne + numberTwo}</p>
                <p>Game Over</p>
              </>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 transition-colors duration-300 hover:shadow-xl px-6 py-3 rounded-full"
            onClick={handleGameReset}
          >
            Start Over
          </button>
        </>
      ) : (
        // NEW GAME / GAME IN PROGRESS
        <div className="flex flex-col gap-4 text-center b">
          <p>
            {numberOne} + {numberTwo} = __?
          </p>
          <div className="bg-white text-black w-full h-16" data-testid="user-answer-input" data-user-answer={userInput}>
            {userInput}
          </div>
          <button
            onClick={handleCheck}
            className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-2xl px-2 py-4`}
            disabled={disabled}
          >
            Check Answer
          </button>
          <p>Attempts remaining: {attempts}</p>
          <NumberPad setUserInputCallback={setUserInput} userInput={userInput} checkAnswerCallback={handleCheck} />
        </div>
      )}
    </div>
  );
};

export default Addition;
