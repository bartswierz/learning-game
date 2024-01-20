import { useState, useEffect } from "react";
import { randomTwoNumbers, checkAnswer } from "@/utils";
import { Settings, Globals } from "@/types/index.ts";
import NumberPad from "./NumberPad";
import RestartBtn from "./RestartBtn";

interface OperationProps {
  settings: Settings;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

// Addition Question Game
// Passed settings are the default settings upon starting the app. Using currentSettings to allow the component to manage global reset for better code readability and avoid having to update multiple state values individually
const Operation = ({ settings, operationType }: OperationProps) => {
  // const Addition = ({ settings, test }: AdditionProps) => {
  // Values passed from the app - these values can be changed by the user in the settings component and will update the game
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;

  // Global state for the game
  const [globals, setGlobals] = useState<Globals>({
    numOneRange: numOneRange,
    numTwoRange: numTwoRange,
    numOfAttempts: numOfAttempts,
    numOfQuestions: numOfQuestions,
    score: 0,
    progress: null,
    isGameOver: false,
    userInput: "",
    numberOne: 0,
    numberTwo: 0,
  });

  const disabled: boolean = globals.userInput === "" ? true : false;
  // Gets our new random values on mount - passing numOneRange and numTwoRange as dependencies if they change from user changing them in the settings
  useEffect(() => {
    const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
    setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
  }, [numOneRange, numTwoRange]);

  /* 
  User Submit, 
  IF CORRECT: Score + 1, New Question 
  IF WRONG: Attempts-1
  */
  // const handleCheck = (e: { preventDefault: () => void }) => {
  const handleCheck = () => {
    const { userInput, numberOne, numberTwo } = globals;
    // TODO - replace this checkAnswer with a specific function for each operation
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isCorrect = checkAnswer({ userInput, numberOne, numberTwo });

    // IF correct, score + 1, new question
    if (isCorrect) {
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange); // TODO - update max value to be the user's selected number range

      // USER ANSWERED QUESTION CORRECTLY - UPDATE GLOBAL STATE
      setGlobals((prev) => ({
        ...prev,
        numberOne: num1,
        numberTwo: num2,
        userInput: "",
        score: prev.score + 1,
        numOfAttempts: numOfAttempts,
      }));

      // SUCCESS - ALL QUESTIONS ANSWERED - GAME OVER
      if (globals.score === numOfQuestions - 1) {
        setGlobals((prev) => ({ ...prev, isGameOver: true, progress: "Success" }));
      }
    } else {
      // INCORRECT ANSWER - UPDATE GLOBAL STATE
      setGlobals((prev) => ({ ...prev, numOfAttempts: prev.numOfAttempts - 1, userInput: "" }));

      // OUT OF ATTEMPTS - GAME OVER
      if (globals.numOfAttempts - 1 === 0) {
        setGlobals((prev) => ({ ...prev, isGameOver: true, progress: "Failed" }));
      }
    }
  };

  // Updates the userInput state in the global state
  const handleUserInput = (input: string) => {
    setGlobals((prev) => ({ ...prev, userInput: input }));
  };

  return (
    <div
      className="bg-slate-900 w-fullX flex flex-col justify-center items-center text-white text-5xl "
      data-testid="addition-component"
    >
      <div className="flex flex-col gap-2">
        {/* <h2>/{test}</h2> */}
        <span>{operationType} Questions</span>
        <span>
          Question: {globals.score} / {globals.numOfQuestions}
        </span>
      </div>
      {/* GAME IS COMPLETED - Game ends either the user reaches all questions OR runs out of attempts */}
      {/* TODO - move this into a separate component */}
      {globals.isGameOver ? ( // result === 'success' || result === 'failed'
        <>
          <div className="text-center font-bold">
            {/* User answered all questions */}
            {globals.progress === "Success" && <p className="text-green-500">Good Job!</p>}
            {globals.progress === "Failed" && ( //User ran out of attempts
              <>
                <p>Incorrect</p>
                <p>The correct answer is {globals.numberOne + globals.numberTwo}</p>
                <p>Game Over</p>
              </>
            )}
          </div>
          <RestartBtn setGlobalsCallback={setGlobals} settings={settings} />
        </>
      ) : (
        // NEW GAME / GAME IN PROGRESS
        <div className="flex flex-col gap-4 text-center b">
          <p>
            {globals.numberOne} + {globals.numberTwo} = __?
          </p>
          <div className="bg-white text-black w-full h-16" data-testid="user-answer-input" data-user-answer={globals.userInput}>
            {globals.userInput}
          </div>
          {/* TODO - creating a CheckAnswer button - should have the evaluate logic in there */}
          <button
            onClick={handleCheck}
            className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-2xl px-2 py-4`}
            disabled={disabled}
          >
            Check Answer
          </button>
          <p>Attempts remaining: {globals.numOfAttempts}</p>
          <NumberPad handleUserInputCallback={handleUserInput} userInput={globals.userInput} checkAnswerCallback={handleCheck} />
        </div>
      )}
    </div>
  );
};

export default Operation;
