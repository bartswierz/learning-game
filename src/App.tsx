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

function App() {
  // const [count, setCount] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | number>("");
  const [attempts, setAttempts] = useState(3);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [attemptsLimit, setAttemptsLimit] = useState(3);

  // Generate two random numbers between 1 and 10
  const generateRandomNumbers = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newNum1 + newNum2);
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
    const sum = num1 + num2;
    const userGuess = parseInt(userAnswer, 10);

    if (userGuess === sum) {
      setMessage("Correct! You win!");
      setGameOver(true);
    } else {
      setAttempts(attempts - 1);
      if (attempts === 1) {
        // setMessage(`Incorrect. \nThe correct answer is ${sum}. \nGame over.`);
        setGameOver(true);
      } else {
        setMessage(`Incorrect. ${attempts - 1} ${attempts === 2 ? "attempt" : "attempts"} left.`);
      }
    }
  };

  // Initialize the game when the component mounts
  useEffect(() => {
    generateRandomNumbers();
  }, []);

  // Handle user input
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleClick = (num: string) => {
    setUserAnswer((userAnswer) => userAnswer + num);
  };

  const handleGameReset = () => {
    setAttempts(3);
    setMessage("");
    setGameOver(false);
    generateRandomNumbers();
    setUserAnswer("");
  };

  // TODO - User will click on a number range to select the range of numbers to use in the game (1-10, 1-20, ..., 1-100)
  const handleNumberRange = () => {};

  const gridListStyle =
    "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  const handleNumberLimit = (e) => {
    // e.preventDefault();
    // console.log(e);
  };

  // User is able to set the number of attempts and number values they want to have in the game
  const handleSettings = () => {
    // TODO - 4 values
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
                  <PopoverContent align="center" className="bg-red-500">
                    <span>Number Limit</span>
                    <form onSubmit={handleNumberLimit} className="flex flex-col b w-[300px] gap-4">
                      <label htmlFor="firstNumber">
                        Number 1
                        <input type="text" className="w-full" />
                      </label>
                      <label htmlFor="secondNumber">
                        Number 2
                        <input type="text" className="w-full" />
                      </label>
                      <label htmlFor="secondNumber">
                        Number of Questions
                        <input type="text" className="w-full" />
                      </label>
                      <label htmlFor="attempts">
                        Attempts Limit
                        <input type="text" className="w-full" />
                      </label>
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
      {/* <div className="b"> handleouu1
        <h1 className="text-5xl w-full b">Math Game</h1>
      </div> */}

      {/* SETTINGS FORM */}
      <div>
        {/* <span>Number Limit</span>
        <form onSubmit={handleNumberLimit} className="flex flex-col b w-[300px] gap-4">
          <label htmlFor="firstNumber">
            Number 1
            <input type="text" className="w-full" />
          </label>
          <label htmlFor="secondNumber">
            Number 2
            <input type="text" className="w-full" />
          </label>
          <label htmlFor="secondNumber">
            Number of Questions
            <input type="text" className="w-full" />
          </label>
          <label htmlFor="attempts">
            Attempts Limit
            <input type="text" className="w-full" />
          </label>
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded-full w-full">
            Submit
          </button>
        </form> */}
      </div>
      {/* END OF SETTINGS FORM */}

      <div className="bg-slate-900 w-fullX flex flex-col justify-center items-center text-white text-5xl b">
        {/* GAME IS COMPLETED */}
        {gameOver ? (
          <>
            <div className="text-center font-bold">
              <p>Incorrect</p>
              <p>The correct answer is {correctAnswer}</p>
              <p>Game Over</p>
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
              {num1} + {num2}?
            </p>
            <input type="number" value={userAnswer} onChange={handleChange} className="text-black px-4 py-2 text-2xl" />
            <button onClick={checkAnswer} className="bg-blue-500 text-2xl px-2 py-4">
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
    </div>
  );
}

export default App;
