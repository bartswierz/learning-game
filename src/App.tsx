import { useState, useEffect } from "react";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

function App() {
  // const [count, setCount] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [attempts, setAttempts] = useState(3);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // Generate two random numbers between 1 and 10
  const generateRandomNumbers = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
  };

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
        setMessage(`Incorrect. The correct answer is ${sum}. Game over.`);
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

  const handleClick = (num: number) => {
    setUserAnswer((userAnswer) => userAnswer + num);
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Addition</NavigationMenuLink>
              <NavigationMenuLink>Subtraction</NavigationMenuLink>
              <NavigationMenuLink>Division</NavigationMenuLink>
              <NavigationMenuLink>Multiplication</NavigationMenuLink>
              <NavigationMenuLink>Restart</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="bg-slate-900 w-screen h-screen flex flex-col justify-center items-center text-white text-5xl">
        <h1>Math Game</h1>
        {gameOver ? (
          <>
            <p>{message}</p>
            <button className="bg-blue-500 px-4 py-2" onClick={() => generateRandomNumbers()}>
              Start Over
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
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
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(1)} className="hover:cursor-pointer">
                  1
                </button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(2)}>2</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(3)}>3</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(4)}>4</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(5)}>5</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(6)}>6</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(7)}>7</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(8)}>8</button>
              </li>
              <li className="bg-blue-500 text-white text-center px-4 py-2">
                <button onClick={() => handleClick(9)}>9</button>
              </li>
              <li className="grid">
                <button className="bg-blue-500 text-white text-center px-4 py-2" onClick={() => setUserAnswer("")}>
                  Clear
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
