import { useState, useEffect } from "react";
import { randomNumber, randomTwoNumbers } from "@/utils";

// Addition Question Game
const Addition = () => {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState<"Success" | "InProgress" | "Failed">(null);
  const [userAnswer, setUserAnswer] = useState<string | number>("");

  // Generates two random numbers upon app start
  useEffect(() => {
    const [num1, num2] = randomTwoNumbers(1, 10);
    generateRandomNumbers(settings);
    console.log("useEffect numbers: ", num1, num2);
  }, []);

  const gridListStyle =
    "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  const handleClick = (num: string) => {
    setUserAnswer((userAnswer) => userAnswer + num);
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
            onClick={handleGameReset}
          >
            Start Over
          </button>
        </>
      ) : (
        // NEW GAME / GAME IN PROGRESS
        <div className="flex flex-col gap-4 text-center b">
          <p>
            {settings.numberOne} + {settings.numberTwo} = __?
          </p>
          <input type="number" value={userAnswer} onChange={handleChange} className="text-black px-4 py-2 text-2xl" />
          <button onClick={checkAnswer} className="bg-blue-500 text-2xl px-2 py-4">
            Submit
          </button>
          <p>Attempts remaining: {settings.attempts}</p>
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
