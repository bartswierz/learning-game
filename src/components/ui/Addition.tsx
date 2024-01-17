import { useState, useEffect } from "react";
import { randomNumber, randomTwoNumbers, checkAnswer } from "@/utils";

interface Settings {
  numberOne: { min: number; max: number };
  numberTwo: { min: number; max: number };
  attempts: number;
  questions: number;
}

// Addition Question Game
const Addition = () => {
  // Default values of the app
  const [settings, setSettings] = useState<Settings>({
    numberOne: { min: 1, max: 10 },
    numberTwo: { min: 1, max: 10 },
    attempts: 3,
    questions: 5,
  });
  const [numberOne, setNumberOne] = useState(10);
  const [numberTwo, setNumberTwo] = useState(10);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState<"Success" | "InProgress" | "Failed" | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | number>("");
  const [attempts, setAttempts] = useState(settings.attempts);

  const correctAnswer = checkAnswer(10, 10, userAnswer);
  console.log("correct answer: ", correctAnswer);
  // TODO - update settings, may not need to keep track of number 1 and 2 inside settings, instead replace this with the user's selected number range high and low for each value
  // const [settings, setSettings] = useState({
  //   numberOne: 10,
  //   numberTwo: 10,
  //   attempts: 3,
  //   questions: 5,
  // });

  // Generates two random numbers upon app start
  useEffect(() => {
    const { num1, num2 } = randomTwoNumbers(settings.numberOne, settings.numberTwo);
    // generateRandomNumbers(settings);
    console.log("useEffect numbers: ", num1, num2);
    // setSettings({
    //   ...settings,
    //   numberOne: num1,
    //   numberTwo: num2,
    // });
    setNumberOne(num1);
    setNumberTwo(num2);
  }, []);

  // FOR TESTING PURPOSES
  useEffect(() => {
    console.log("settings.numberOne", settings.numberOne);
    console.log("settings.numberTwo", settings.numberTwo);
  }, [settings]);

  const gridListStyle =
    "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  // Adds user input from the number grid to the userAnswer state
  const handleClick = (num: string) => {
    setUserAnswer((userAnswer) => userAnswer + num);
  };

  // const handleChange = (e) => {
  //   setUserAnswer(e.target.value);
  // };
  /* 
  User Submit, 
  IF CORRECT: Score + 1, New Question 
  IF WRONG: Attempts-1
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    const isCorrect = checkAnswer(numberOne, numberTwo, userAnswer);

    // IF correct, score + 1, new question
    if (isCorrect) {
      setScore((prev) => prev + 1);
      // const { num1, num2 } = randomTwoNumbers(1, 10); // TODO - update max value to be the user's selected number range
      const { num1, num2 } = randomTwoNumbers(settings.numberOne, settings.numberTwo); // TODO - update max value to be the user's selected number range
      console.log("inside handle submit - random numbers => num1, num2: ", num1, num2);
      // setSettings({
      //   ...settings,
      //   numberOne: num1,
      //   numberTwo: num2,
      // });
      // TODO - generate new random numbers
      setNumberOne(num1);
      setNumberTwo(num2);
    } else {
      // Not correct, Decrease Attempts by 1
      setAttempts((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-slate-900 w-fullX flex flex-col justify-center items-center text-white text-5xl b">
      <div>
        {/* <span>Score: {score}</span> */}
        <span>
          Question: {score} / {settings.questions}
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
          <input type="number" value={userAnswer} className="text-black px-4 py-2 text-2xl" />
          {/* <input type="number" value={userAnswer} onChange={handleChange} className="text-black px-4 py-2 text-2xl" /> */}
          <button onClick={handleSubmit} className="bg-blue-500 text-2xl px-2 py-4">
            Submit
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
