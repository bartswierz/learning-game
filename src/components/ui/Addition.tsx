import { useState, useEffect } from "react";
import { randomNumber, randomTwoNumbers, checkAnswer } from "@/utils";

interface SettingsProps {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
}

// Addition Question Game
const Addition = ({ settings }: SettingsProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
  const [attempts, setAttempts] = useState<number>(numOfAttempts);
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState<number>(numberOne + numberTwo);
  // const [numberOne, setNumberOne] = useState(randomNumber(numOneRange.min, numOneRange.max));
  // const [numberTwo, setNumberTwo] = useState(randomNumber(numTwoRange.min, numTwoRange.max));
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState<"Success" | "InProgress" | "Failed" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string>("");

  // Gets our new random values on mount
  useEffect(() => {
    const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
    setNumberOne(num1);
    setNumberTwo(num2);
  }, []);

  const gridListStyle =
    "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  // Adds user input from the number grid to the userAnswer state
  const handleClick = (num: string) => {
    setUserAnswer((userAnswer) => userAnswer + num);
  };

  /* 
  User Submit, 
  IF CORRECT: Score + 1, New Question 
  IF WRONG: Attempts-1
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit - userAnswer: ", userAnswer);
    console.log("numberOne + numberTwo: ", numberOne + numberTwo);
    const isCorrect = checkAnswer(numberOne, numberTwo, userAnswer);

    // IF correct, score + 1, new question
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // const { num1, num2 } = randomTwoNumbers(1, 10); // TODO - update max value to be the user's selected number range
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange); // TODO - update max value to be the user's selected number range
      console.log("inside handle submit - random numbers => num1, num2: ", num1, num2);
      // TODO - generate new random numbers
      setNumberOne(num1);
      setNumberTwo(num2);
      setUserAnswer(""); // Resets value to empty string
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

  return (
    <div className="bg-slate-900 w-fullX flex flex-col justify-center items-center text-white text-5xl b">
      <div>
        {/* <span>Score: {score}</span> */}
        <span>
          Question: {score} / {numOfQuestions}
        </span>
      </div>
      {/* GAME IS COMPLETED - Game ends either the user reaches all questions OR runs out of attempts */}
      {gameOver ? ( // result === 'success' || result === 'failed'
        <>
          <div className="text-center font-bold">
            {/* User answered all questions */}
            {progress === "Success" && <p className="text-green-500">Good Job!</p>}
            {
              // result === 'failed'
              progress === "InProgress" && (
                <>
                  <p>Incorrect</p>
                  <p>The correct answer is {correctAnswer}</p>
                  <p>Game Over</p>
                </>
              )
            }
            {progress === "Failed" && ( //User ran out of attempts
              <>
                <p>Incorrect</p>
                <p>The correct answer is {correctAnswer}</p>
                <p>Game Over</p>
              </>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 transition-colors duration-300 hover:shadow-xl px-6 py-3 rounded-full"
            // onClick={handleGameReset}
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
          {/* <input type="number" value={userAnswer} className="text-black px-4 py-2 text-2xl" /> */}
          {/* <input type="number" value={userAnswer} className="text-black px-4 py-2 text-2xl" /> */}
          <div className="bg-white text-black w-full h-16">{userAnswer}</div>
          {/* <input type="number" value={userAnswer} onChange={handleChange} className="text-black px-4 py-2 text-2xl" /> */}
          <button onClick={handleSubmit} className="bg-blue-500 text-2xl px-2 py-4">
            Check Answer
          </button>
          <p>Attempts remaining: {attempts}</p>
          {/* Number Grid */}
          <ul className="grid grid-cols-3 max-w-[90vw] gap-2">
            <li>
              <button onClick={() => handleClick("1")} className={gridListStyle}>
                1
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("2")} className={gridListStyle}>
                2
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("3")} className={gridListStyle}>
                3
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("4")} className={gridListStyle}>
                4
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("5")} className={gridListStyle}>
                5
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("6")} className={gridListStyle}>
                6
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("7")} className={gridListStyle}>
                7
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("8")} className={gridListStyle}>
                8
              </button>
            </li>
            <li>
              <button onClick={() => handleClick("9")} className={gridListStyle}>
                9
              </button>
            </li>
            {/* Empty Slot */}
            <li></li>
            <li>
              <button onClick={() => handleClick("0")} className={gridListStyle}>
                0
              </button>
            </li>
            <li className="grid">
              <button className={`${gridListStyle}`} onClick={() => setUserAnswer("")}>
                Clear
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Addition;
