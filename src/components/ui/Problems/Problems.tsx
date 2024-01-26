import { useState, useEffect } from "react";
import { randomTwoNumbers, checkAnswer } from "@/utils";
import { Globals } from "@/types/types";
import NumberPad from "./NumberPad";
import RestartBtn from "../RestartBtn";
import { getOperationIcon, randomTwoNumbersForDivision } from "@/utils";
import useSettingsStore from "@/store/store";
import GameOverMessage from "./GameOverMessage";
import CheckAnswer from "./CheckAnswer";

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
  const settings = useSettingsStore((state) => state.settings);
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
  // const appendUserInput = useSettingsStore((state) => state.appendUserInput);
  const updateForCorrectAnswer = useSettingsStore((state) => state.updateForCorrectAnswer);
  const updateForIncorrectAnswer = useSettingsStore((state) => state.updateForIncorrectAnswer);
  const updateNewNumbers = useSettingsStore((state) => state.updateNewNumbers);
  console.log("inside operation component");

  const [operationIcon, setOperationIcon] = useState<JSX.Element>();

  const disabled: boolean = userInput === "" ? true : false;
  // Gets our new random values on mount - passing numOneRange and numTwoRange as dependencies if they change from user changing them in the settings
  useEffect(() => {
    // DIVISION PROBLEM
    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      updateNewNumbers(num1, num2);
      // setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
    } else {
      // NOT DIVISION
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      updateNewNumbers(num1, num2);
      // setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
    }
  }, [numOneRange, numTwoRange, operationType, updateNewNumbers]);

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
  // const handleCheck = () => {
  //   console.log("inside handleCheck");
  //   // const { userInput, numberOne, numberTwo } = globals;
  //   // TODO - replace this checkAnswer with a specific function for each operation
  //   // Passed as an object to ensure the order of the arguments doesn't matter
  //   const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

  //   // IF correct, score + 1, new question
  //   if (isCorrect) {
  //     let newNum1: number;
  //     let newNum2: number;

  //     if (operationType === "DIVISION") {
  //       const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
  //       // replace this with a
  //       newNum1 = num1;
  //       newNum2 = num2;
  //     } else {
  //       const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
  //       newNum1 = num1;
  //       newNum2 = num2;
  //     }

  //     // USER ANSWERED CORRECTLY - UPDATES: numberOne = newNum1, numberTwo = newNum2, userInput = '', score + 1
  //     updateForCorrectAnswer(newNum1, newNum2);

  //     // SUCCESS: ALL QUESTIONS ANSWERED - GAME OVER
  //     if (score === numOfQuestions - 1) {
  //       updateIsGameOver(true);
  //     }
  //   } else {
  //     // INCORRECT ANSWER - attemptsLeft - 1 & userInput = ''
  //     updateForIncorrectAnswer();

  //     // FAILED: USER RAN OUT OF ATTEMPTS - GAME OVER
  //     if (attemptsLeft - 1 === 0) {
  //       updateIsGameOver(true);
  //     }
  //   }
  // };

  // Updates the userInput state in the global state
  // const handleUserInput = (input: string) => {
  //   //TODO - REPLACE WITH updateUserInput(input)
  //   // setGlobals((prev) => ({ ...prev, userInput: input }));
  //   // updateUserInput(input);
  //   // appendUserInput(input);
  //   updateUserInput(input);
  // };

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
        {/* <RestartBtn settings={settings} operationType={operationType} /> */}
        <RestartBtn operationType={operationType} />
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
          <li>userInput: {userInput === "" ? "Empty String" : userInput}</li>
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
        <p className="text-xl">Attempts Left: {attemptsLeft}</p>
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
        {/* <button
          onClick={handleCheck}
          className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-xl px-2 py-3`}
          disabled={disabled}
        >
          Check Answer
        </button> */}
        <CheckAnswer disabled={disabled} operationType={operationType} text="Check Answer" />
        <NumberPad
          userInput={userInput}
          operationType={operationType}
          // handleUserInputCallback={handleUserInput}
          // handleCheckCallback={handleCheck}
        />
      </div>
    </div>
  );
};

export default Problems;
