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
//TODO - replace globals with store
const Problems = ({ operationType }: OperationProps) => {
  //TODO - currently selecting all our states from our Settings Store and displaying here, we will remove them from here as we find where they are used as we refactor the code into smaller components to prevent prop drilling
  // Calling our Zustand Store for the settings
  const { settings } = useSettingsStore((state) => state);
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
  // These will be 0 at first, will need to update them with the random numbers functions
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const score = useSettingsStore((state) => state.score);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const userInput = useSettingsStore((state) => state.userInput);
  const progress = useSettingsStore((state) => state.progress);
  const isGameOver = useSettingsStore((state) => state.isGameOver);
  const updateIsGameOver = useSettingsStore((state) => state.updateIsGameOver);
  const updateUserInput = useSettingsStore((state) => state.updateUserInput);
  const updateForCorrectAnswer = useSettingsStore((state) => state.updateForCorrectAnswer);
  const updateForIncorrectAnswer = useSettingsStore((state) => state.updateForIncorrectAnswer);
  console.log("inside operation component");

  // Global state for the game
  // const [globals, setGlobals] = useState<Globals>({
  //   numOneRange: { min: 0, max: 0 },
  //   numTwoRange: { min: 0, max: 0 },
  //   numOfAttempts: 1,
  //   numOfQuestions: 1,
  //   //
  //   score: 0,
  //   // - combine progress and isGameOver, null while in progress, once user completed the questions, set to 'success', if user runs out of attempts, set to 'failed'
  //   progress: null,
  //   isGameOver: false,
  //   //
  //   userInput: "",
  //   // numbers: { numberOne: 0, numberTwo: 0 },
  //   numberOne: 0,
  //   numberTwo: 0,
  // });

  // SETTINGS UPDATES WILL RESET THE SESSION WITH THE NEW SETTINGS
  // useEffect(() => {
  //   console.log("use effect settings changed...");
  //   setGlobals({
  //     numOneRange: numOneRange,
  //     numTwoRange: numTwoRange,
  //     numOfAttempts: numOfAttempts,
  //     numOfQuestions: numOfQuestions,
  //     score: 0,
  //     progress: null,
  //     isGameOver: false,
  //     // isGameOver: true,
  //     userInput: "",
  //     numberOne: 0, //Move numberOne and NumberTwo in a object together
  //     numberTwo: 0,
  //   });
  // }, [numOneRange, numTwoRange, numOfAttempts, numOfQuestions]);

  const [operationIcon, setOperationIcon] = useState<JSX.Element>();

  const disabled: boolean = userInput === "" ? true : false;
  // Gets our new random values on mount - passing numOneRange and numTwoRange as dependencies if they change from user changing them in the settings
  // useEffect(() => {
  //   // DIVISION PROBLEM
  //   if (operationType === "DIVISION") {
  //     const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
  //     setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
  //   } else {
  //     // NOT DIVISION
  //     const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
  //     setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
  //   }
  // }, [numOneRange, numTwoRange, operationType]);

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
    // const { userInput, numberOne, numberTwo } = globals;
    // TODO - replace this checkAnswer with a specific function for each operation
    // Passed as an object to ensure the order of the arguments doesn't matter
    const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

    // IF correct, score + 1, new question
    if (isCorrect) {
      let newNum1: number;
      let newNum2: number;

      if (operationType === "DIVISION") {
        const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
        // replace this with a
        newNum1 = num1;
        newNum2 = num2;
      } else {
        const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange); // TODO - update max value to be the user's selected number range
        newNum1 = num1;
        newNum2 = num2;
      }

      //TODO - add updateForCorrectAnswer
      // USER ANSWERED QUESTION CORRECTLY - UPDATE GLOBAL STATE - updaing the numberOne and numberTwo values to the new random numbers AND resetting the userInput to an empty string and updating our score
      // Correct Answer updates: numberOne, numberTwo, userInput = '', score + 1
      updateForCorrectAnswer(newNum1, newNum2);
      // setGlobals((prev) => ({
      //   ...prev,
      //   numberOne: newNum1,
      //   numberTwo: newNum2,
      //   userInput: "",
      //   score: prev.score + 1,
      //   numOfAttempts: numOfAttempts,
      // }));

      // SUCCESS - ALL QUESTIONS ANSWERED - GAME OVER
      if (score === numOfQuestions - 1) {
        updateIsGameOver(true);
        // setGlobals((prev) => ({ ...prev, isGameOver: true, progress: "Success" }));
      }
    } else {
      //TODO - updateForIncorrectAnswer()
      // INCORRECT ANSWER - UPDATE GLOBAL STATE
      updateForIncorrectAnswer();
      // setGlobals((prev) => ({ ...prev, numOfAttempts: prev.numOfAttempts - 1, userInput: "" }));

      // OUT OF ATTEMPTS - GAME OVER - This is checking IF user is OUT OF ATTEMPTS, this may not be necessary as we can check if the score is equal to the numOfQuestions
      // if (numOfAttempts - 1 === 0) {
      if (attemptsLeft - 1 === 0) {
        // TODO - setGameOver(true) - progress may not be necessary as we can check if the score is equal to the numOfQuestions
        updateIsGameOver(true);
        // setGlobals((prev) => ({ ...prev, isGameOver: true, progress: "Failed" }));
      }
    }
  };

  // Updates the userInput state in the global state
  const handleUserInput = (input: string) => {
    //TODO - REPLACE WITH updateUserInput(input)
    // setGlobals((prev) => ({ ...prev, userInput: input }));
    updateUserInput(input);
  };

  // GAME OVER - EITHER SUCCESS OR FAILED
  if (isGameOver) {
    return (
      <div className="b">
        <GameOverMessage
          isGameOver={isGameOver}
          // progress={globals.progress}
          // progress={"Success"}
          progress={"Failed"}
          numberOne={numberOne}
          numberTwo={numberTwo}
        />
        {/* <RestartBtn setGlobalsCallback={setGlobals} settings={settings} operationType={operationType} /> */}
        <RestartBtn settings={settings} operationType={operationType} />
      </div>
    );
  }

  return (
    <div
      className="b bg-slate-900 w-fullX flex flex-col justify-center items-center mx-4 sm:mx-0 gap-10 sm:mt-4"
      data-testid="addition-component"
    >
      <div className="b">
        <h1>FOR REFACTOR/TESTING PURPOSES - VALUES:</h1>
        <ul>
          <li>numberOne: {numberOne}</li>
          <li>numberTwo: {numberTwo}</li>
          <li>score: {score}</li>
          <li>userInput: {userInput === "" ? "Empty String" : "N/A"}</li>
          <li>progress: {progress}</li>
          <li>isGameOver: {isGameOver ? "TRUE" : "FALSE"}</li>
        </ul>
      </div>
      <div className="flex flex-col gap-2 b text-center">
        {/* <h2>/{test}</h2> */}
        <h2 className="text-2xl">{operationType}</h2>
        <span className="text-xl">
          Question: {score} / {numOfQuestions}
        </span>
        <p className="text-xl">Attempts Left: {numOfAttempts}</p>
      </div>
      {/* TODO - move this into a separate component */}
      <div className="flex flex-col gap-4 text-center b">
        <p className="flex justify-center items-center text-4xl">
          {numberOne} {operationIcon} {numberTwo} = __?
        </p>
        <div className="bg-white text-black w-full h-16" data-testid="user-answer-input" data-user-answer={userInput}>
          {userInput}
        </div>
        {/* TODO - creating a CheckAnswer button - should have the evaluate logic in there */}
        <button
          onClick={handleCheck}
          className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-xl px-2 py-3`}
          disabled={disabled}
        >
          Check Answer
        </button>
        <NumberPad handleUserInputCallback={handleUserInput} userInput={userInput} handleCheckCallback={handleCheck} />
      </div>
    </div>
  );
};

export default Problems;
