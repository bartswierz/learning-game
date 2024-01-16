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
// import { Slider } from "@/components/ui/slider";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "./components/ui/Navbar";
import Addition from "./components/ui/Addition";

// TODO - Updating Settings isnt updating the game back to 0
// TODO - Random numbers eventually end up being 1 and then stay at 1 for the rest of the game, could be rounding error
// TODO - Game ends at an additional question (ex, 5 questions, game ends at 6)
function App() {
  // const [count, setCount] = useState(0);
  // const [num1, setNum1] = useState(0);
  // const [num2, setNum2] = useState(0);
  // const [userAnswer, setUserAnswer] = useState<string | number>("");
  // const [message, setMessage] = useState("");
  // const [gameOver, setGameOver] = useState(false);
  // const [correctAnswer, setCorrectAnswer] = useState(0);
  // const [progress, setProgress] = useState<"Success" | "InProgress" | "Failed">(null);
  // const [score, setScore] = useState(0);
  // Custom settings for the game - These can be updated within the settings menu
  // const [settings, setSettings] = useState({
  //   numberOne: 10,
  //   numberTwo: 10,
  //   attempts: 3,
  //   questions: 5,
  // });

  // Initialize the game when the component mounts - FIRST TIME ONLY
  // useEffect(() => {
  //   generateRandomNumbers(settings);
  // }, []);

  // TODO - pass in the number range from the settings menu
  // Generate two random numbers between 1 and 10
  // const generateRandomNumbers = (settings: Settings) => {
  //   const { numberOne, numberTwo } = settings;
  //   const newNum1 = Math.floor(Math.random() * numberOne) + 1;
  //   const newNum2 = Math.floor(Math.random() * numberTwo) + 1;

  //   console.log("newNum1", newNum1);
  //   console.log("newNum2", newNum2);

  //   setSettings({
  //     ...settings,
  //     numberOne: newNum1,
  //     numberTwo: newNum2,
  //   });
  //   setCorrectAnswer(numberOne + numberTwo);
  // };

  // TODO - set this as a UTILS function - 3 params(numberOne, numberTwo, userAnswer)
  // Check if the user's answer is correct
  // const checkAnswer = () => {
  //   const sum = settings.numberOne + settings.numberTwo;
  //   const userGuess = parseInt(userAnswer, 10);

  //   // CORRECT GUESS
  //   if (userGuess === sum) {
  //     console.log("CORRECT GUESS Sum = ", sum);
  //     //TODO - update the score by +1 and generate new numbers
  //     setScore((score) => score + 1);

  //     //check if the user has answered all the questions
  //     // setMessage("Correct! You win!");
  //     // TODO - success should only be set if the user has answered all the questions(matches the limit of questions)
  //     if (settings.questions === score) {
  //       console.log(`User has answered all ${settings.questions} questions. Good Job!`);
  //       setProgress("Success");
  //     }
  //     setGameOver(true);
  //   } else {
  //     // INCORRECT GUESS, DECREASE ATTEMPTS BY 1
  //     setSettings({
  //       ...settings,
  //       attempts: settings.attempts - 1,
  //     });
  //     // setAttempts(attempts - 1);
  //     // USER RAN OUT OF ATTEMPTS - GAME OVER
  //     if (settings.attempts === 1) {
  //       console.log("GAME OVER");
  //       // setMessage(`Incorrect. \nThe correct answer is ${sum}. \nGame over.`);
  //       setGameOver(true);
  //       setProgress("Failed");
  //     } else {
  //       setMessage(`Incorrect. ${settings.attempts - 1} ${settings.attempts === 2 ? "attempt" : "attempts"} left.`);
  //     }
  //   }
  // };

  // Handle user input
  // const handleChange = (e) => {
  //   setUserAnswer(e.target.value);
  // };

  // const handleClick = (num: string) => {
  //   setUserAnswer((userAnswer) => userAnswer + num);
  // };

  // // Resets Game
  // const handleGameReset = () => {
  //   setSettings({
  //     ...settings,
  //     attempts: 3,
  //   });
  //   setMessage("");
  //   setGameOver(false);
  //   generateRandomNumbers(settings);
  //   setUserAnswer("");
  // };

  // TODO - User will click on a number range to select the range of numbers to use in the game (1-10, 1-20, ..., 1-100)
  // const handleNumberRange = () => {};

  // const gridListStyle =
  //   "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  // const handleNumberLimit = (e) => {
  //   // e.preventDefault();
  //   // console.log(e);
  // };

  // User is able to set the number of attempts and number values they want to have in the game
  // const handleSettings = (e) => {
  //   e.preventDefault();
  //   // console.log('e.target.elements["numberOne"]', e.target.elements["numberOne"].value);
  //   // console.log('e.target.elements["numberTwo"]', e.target.elements["numberTwo"].value);
  //   // console.log('e.target.elements["questions"]', e.target.elements["questions"].value);
  //   // console.log('e.target.elements["attempts"]', e.target.elements["attempts"].value);
  //   setSettings({
  //     numberOne: e.target.elements["numberOne"].value,
  //     numberTwo: e.target.elements["numberTwo"].value,
  //     questions: e.target.elements["questions"].value,
  //     attempts: e.target.elements["attempts"].value,
  //   });

  //   setGameOver(false);
  //   generateRandomNumbers(settings);
  //   // generateRandomNumbers(settings);
  //   // TODO - refresh the game with the new settings
  // };

  return (
    <div className="bg-slate-900 text-white max-w-screen max-h-screen overflow-hiddenX overflow-y-hiddenX w-screenX h-screen">
      <Navbar />

      {/* MAIN CONTENT */}
      <Addition />
    </div>
  );
}

export default App;
