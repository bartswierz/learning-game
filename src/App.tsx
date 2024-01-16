import { useState, useEffect } from "react";
import "./globals.css";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Settings {
  numberOne: number;
  numberTwo: number;
  attempts: number;
  questions: number;
}

// TODO - Updating Settings isnt updating the game back to 0
// TODO - Random numbers eventually end up being 1 and then stay at 1 for the rest of the game, could be rounding error
function App() {
  // const [count, setCount] = useState(0);
  // const [num1, setNum1] = useState(0);
  // const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | number>("");
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [progress, setProgress] = useState<"Success" | "InProgress" | "Failed">(null);
  const [score, setScore] = useState(0);
  // Custom settings for the game - These can be updated within the settings menu
  const [settings, setSettings] = useState({
    numberOne: 10,
    numberTwo: 10,
    attempts: 3,
    questions: 5,
  });

  // Initialize the game when the component mounts - FIRST TIME ONLY
  useEffect(() => {
    generateRandomNumbers(settings);
  }, []);

  // TODO - pass in the number range from the settings menu
  // Generate two random numbers between 1 and 10
  const generateRandomNumbers = (settings: Settings) => {
    const { numberOne, numberTwo } = settings;
    const newNum1 = Math.floor(Math.random() * numberOne) + 1;
    const newNum2 = Math.floor(Math.random() * numberTwo) + 1;
    console.log("newNum1", newNum1);
    console.log("newNum2", newNum2);
    // const newNum1 = Math.floor(Math.random() * 10) + 1;
    // const newNum2 = Math.floor(Math.random() * 10) + 1;
    // Updating numberOne & numberTwo at the same time
    setSettings({
      ...settings,
      numberOne: newNum1,
      numberTwo: newNum2,
    });
    // setNumberOne(newNum1);
    // setNumberTwo(newNum2);
    // setCorrectAnswer(newNum1 + newNum2);
    setCorrectAnswer(numberOne + numberTwo);
  };
  // // Generate two random numbers between 1 and 10
  // const generateRandomNumbers = () => {
  //   const newNum1 = Math.floor(Math.random() * 10) + 1;
  //   const newNum2 = Math.floor(Math.random() * 10) + 1;
  //   setNum1(newNum1);
  //   setNum2(newNum2);
  //   setCorrectAnswer(newNum1 + newNum2);
  // };

  // Check if the user's answer is correct
  const checkAnswer = () => {
    const sum = settings.numberOne + settings.numberTwo;
    const userGuess = parseInt(userAnswer, 10);

    // CORRECT GUESS
    if (userGuess === sum) {
      console.log("CORRECT GUESS Sum = ", sum);
      //TODO - update the score by +1 and generate new numbers
      // setSettings({
      //   ...settings,
      //   questions: settings.questions - 1,
      // });
      // setSettings({
      //   ...settings,
      //   questions: settings.questions - 1,
      // });
      setScore((score) => score + 1);

      //check if the user has answered all the questions
      // setMessage("Correct! You win!");
      // TODO - success should only be set if the user has answered all the questions(matches the limit of questions)
      if (settings.questions === score) {
        console.log(`User has answered all ${settings.questions} questions. Good Job!`);
        setProgress("Success");
      }
      setGameOver(true);
    } else {
      // INCORRECT GUESS, DECREASE ATTEMPTS BY 1
      setSettings({
        ...settings,
        attempts: settings.attempts - 1,
      });
      // setAttempts(attempts - 1);
      // USER RAN OUT OF ATTEMPTS - GAME OVER
      if (settings.attempts === 1) {
        console.log("GAME OVER");
        // setMessage(`Incorrect. \nThe correct answer is ${sum}. \nGame over.`);
        setGameOver(true);
        setProgress("Failed");
      } else {
        setMessage(`Incorrect. ${settings.attempts - 1} ${settings.attempts === 2 ? "attempt" : "attempts"} left.`);
      }
    }
  };

  // Handle user input
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleClick = (num: string) => {
    setUserAnswer((userAnswer) => userAnswer + num);
  };

  // Resets Game
  const handleGameReset = () => {
    setSettings({
      ...settings,
      attempts: 3,
    });
    setMessage("");
    setGameOver(false);
    generateRandomNumbers(settings);
    setUserAnswer("");
  };

  // TODO - User will click on a number range to select the range of numbers to use in the game (1-10, 1-20, ..., 1-100)
  // const handleNumberRange = () => {};

  const gridListStyle =
    "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  // const handleNumberLimit = (e) => {
  //   // e.preventDefault();
  //   // console.log(e);
  // };

  // User is able to set the number of attempts and number values they want to have in the game
  const handleSettings = (e) => {
    e.preventDefault();
    // console.log('e.target.elements["numberOne"]', e.target.elements["numberOne"].value);
    // console.log('e.target.elements["numberTwo"]', e.target.elements["numberTwo"].value);
    // console.log('e.target.elements["questions"]', e.target.elements["questions"].value);
    // console.log('e.target.elements["attempts"]', e.target.elements["attempts"].value);
    setSettings({
      numberOne: e.target.elements["numberOne"].value,
      numberTwo: e.target.elements["numberTwo"].value,
      questions: e.target.elements["questions"].value,
      attempts: e.target.elements["attempts"].value,
    });

    setGameOver(false);
    generateRandomNumbers(settings);
    // generateRandomNumbers(settings);
    // TODO - refresh the game with the new settings
  };

  return (
    <div className="bg-slate-900 text-white max-w-screen max-h-screen overflow-hiddenX overflow-y-hiddenX w-screenX h-screen">
      <nav>
        <ul className="flex flex-col flex-wrap md:flex-row justify-between items-center bg-blue-500X text-white p-4 bX">
          <span className="text-2xl font-bold">Learning Game</span>
          <li>
            <ul className="flex gap-4 items-center justify-center text-black font-bold">
              <li>
                <Popover modal={true}>
                  <PopoverTrigger className="bg-blue-500 hover:bg-blue-600 hover:ring ring-slate-200 focus:bg-blue-700 px-4 py-2 rounded-full hover:text-white transition-all duration-300 hover:shadow-xl">
                    Settings
                  </PopoverTrigger>
                  {/* <PopoverContent>Place content for the popover here.</PopoverContent> */}
                  <PopoverContent align="center" className="bg-slate-300 rounded-md w-full">
                    <span>Number Limit</span>
                    <form onSubmit={handleSettings} className="flex flex-col b w-[300px] gap-1">
                      <label htmlFor="firstNumber">Number 1</label>
                      <input type="text" name="numberOne" id="firstNumber" className="w-full" required />

                      <label htmlFor="secondNumber">Number 2</label>
                      <input type="text" name="numberTwo" id="numberTwo" className="w-full" required />

                      <label htmlFor="secondNumber">Number of Questions</label>
                      <input type="text" name="questions" id="questions" className="w-full" required />

                      <label htmlFor="attempts">Attempts Limit</label>
                      <input type="text" name="attempts" id="attempts" className="w-full" required />

                      <button type="submit" className="bg-blue-500 px-4 py-2 rounded-full w-full">
                        Submit
                      </button>
                    </form>
                  </PopoverContent>
                </Popover>
              </li>
              <li className="cursor-pointer">
                <button className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300">
                  Addition
                </button>
              </li>
              <li className="cursor-pointer">
                <button className="bg-green-500 hover:bg-green-600 focus:bg-green-700 hover:text-white hover:shadow-xl hover:ring ring-slate-200 px-4 py-2 rounded-full transition-all duration-300">
                  Subtraction
                </button>
              </li>
              <li className="cursor-pointer">
                <button className="bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 hover:shadow-xl rounded-full transition-all duration-300">
                  Division
                </button>
              </li>
              <li className="cursor-pointer">
                <button className="bg-red-500 hover:bg-red-600 focus:bg-red-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300">
                  Multiplication
                </button>
              </li>
              <li className="cursor-pointer">
                <button
                  className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300"
                  onClick={handleGameReset}
                >
                  Restart Game
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* END OF NAVIGATION MENU */}

      {/* MAIN CONTENT */}
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
              {/* {result === "success" ? (
                <p className="text-green-500">Good Job!</p>
              ) : (
                // result === 'failed'
                <>
                  <p>Incorrect</p>
                  <p>The correct answer is {correctAnswer}</p>
                  <p>Game Over</p>
                </>
              )} */}
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
    </div>
  );
}

export default App;
