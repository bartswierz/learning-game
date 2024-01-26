import { useState, useEffect } from "react";
import { randomTwoNumbers, checkAnswer } from "@/utils";
import { Globals } from "@/types/types";
import NumberPad from "./NumberPad";
import RestartBtn from "../RestartBtn";
import { getOperationIcon, randomTwoNumbersForDivision } from "@/utils";
import useSettingsStore from "@/store/store";
import GameOverMessage from "./GameOverMessage";

interface OperationProps {
  // settings: Settings;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

// Addition Question Game
// Passed settings are the default settings upon starting the app. Using currentSettings to allow the component to manage global reset for better code readability and avoid having to update multiple state values individually
// const Operation = ({ settings, operationType }: OperationProps) => {
const Problems = ({ operationType }: OperationProps) => {
  // Calling our Zustand Store for the settings
  const { settings } = useSettingsStore((state) => state);
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
  console.log("inside operation component");
  // Global state for the game
  const [globals, setGlobals] = useState<Globals>({
    numOneRange: { min: 0, max: 0 },
    numTwoRange: { min: 0, max: 0 },
    numOfAttempts: 1,
    numOfQuestions: 1,
    score: 0,
    progress: null,
    isGameOver: false,
    userInput: "",
    numberOne: 0,
    numberTwo: 0,
  });

  // SETTINGS UPDATES WILL RESET THE SESSION WITH THE NEW SETTINGS
  useEffect(() => {
    console.log("use effect settings changed...");
    setGlobals({
      numOneRange: numOneRange,
      numTwoRange: numTwoRange,
      numOfAttempts: numOfAttempts,
      numOfQuestions: numOfQuestions,
      score: 0,
      progress: null,
      // isGameOver: false,
      isGameOver: true,
      userInput: "",
      numberOne: 0,
      numberTwo: 0,
    });
  }, [numOneRange, numTwoRange, numOfAttempts, numOfQuestions]);

  const [operationIcon, setOperationIcon] = useState<JSX.Element>();

  const disabled: boolean = globals.userInput === "" ? true : false;
  // Gets our new random values on mount - passing numOneRange and numTwoRange as dependencies if they change from user changing them in the settings
  useEffect(() => {
    // DIVISION PROBLEM
    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
    } else {
      // NOT DIVISION
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
    }
  }, [numOneRange, numTwoRange, operationType]);

  // Gets the operation icon on mount & if user changes the type of questions via operation links in the navbar
  useEffect(() => {
    setOperationIcon(getOperationIcon(operationType));
  }, [operationType]);

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
    const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isCorrect) {
      let newNum1: number;
      let newNum2: number;

      if (operationType === "DIVISION") {
        const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
        newNum1 = num1;
        newNum2 = num2;
      } else {
        const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange); // TODO - update max value to be the user's selected number range
        newNum1 = num1;
        newNum2 = num2;
      }

      // USER ANSWERED QUESTION CORRECTLY - UPDATE GLOBAL STATE
      setGlobals((prev) => ({
        ...prev,
        numberOne: newNum1,
        numberTwo: newNum2,
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

  // GAME OVER - EITHER SUCCESS OR FAILED
  if (globals.isGameOver) {
    return (
      <div className="b">
        <GameOverMessage
          isGameOver={globals.isGameOver}
          // progress={globals.progress}
          // progress={"Success"}
          progress={"Failed"}
          numberOne={globals.numberOne}
          numberTwo={globals.numberTwo}
        />
        <RestartBtn setGlobalsCallback={setGlobals} settings={settings} operationType={operationType} />
      </div>
    );
  }

  return (
    <div
      className="b bg-slate-900 w-fullX flex flex-col justify-center items-center mx-4 sm:mx-0 gap-10 sm:mt-4"
      data-testid="addition-component"
    >
      <div className="flex flex-col gap-2 b text-center">
        {/* <h2>/{test}</h2> */}
        <h2 className="text-2xl">{operationType}</h2>
        <span className="text-xl">
          Question: {globals.score} / {globals.numOfQuestions}
        </span>
        <p className="text-xl">Attempts Left: {globals.numOfAttempts}</p>
      </div>
      {/* TODO - move this into a separate component */}
      <div className="flex flex-col gap-4 text-center b">
        <p className="flex justify-center items-center text-4xl">
          {globals.numberOne} {operationIcon} {globals.numberTwo} = __?
        </p>
        <div className="bg-white text-black w-full h-16" data-testid="user-answer-input" data-user-answer={globals.userInput}>
          {globals.userInput}
        </div>
        {/* TODO - creating a CheckAnswer button - should have the evaluate logic in there */}
        <button
          onClick={handleCheck}
          className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-xl px-2 py-3`}
          disabled={disabled}
        >
          Check Answer
        </button>
        <NumberPad handleUserInputCallback={handleUserInput} userInput={globals.userInput} checkAnswerCallback={handleCheck} />
      </div>
    </div>
  );
};

export default Problems;
