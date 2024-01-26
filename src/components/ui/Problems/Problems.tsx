import { useState, useEffect } from "react";
import { randomTwoNumbers } from "@/utils";
// import { Globals } from "@/types/types";
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

// Passed settings are the default settings upon starting the app. Using currentSettings to allow the component to manage global reset for better code readability and avoid having to update multiple state values individually
const Problems = ({ operationType }: OperationProps) => {
  //TODO - currently selecting all our states from our Settings Store and displaying here, we will remove them from here as we find where they are used as we refactor the code into smaller components to prevent prop drilling
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const score = useSettingsStore((state) => state.score);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const userInput = useSettingsStore((state) => state.userInput);
  const progress = useSettingsStore((state) => state.progress);
  const isGameOver = useSettingsStore((state) => state.isGameOver);

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

  // GAME OVER - EITHER SUCCESS OR FAILED
  if (isGameOver) {
    return (
      <div className="b">
        <GameOverMessage isGameOver={isGameOver} progress={"Failed"} numberOne={numberOne} numberTwo={numberTwo} />
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
        <CheckAnswer disabled={disabled} operationType={operationType} text="Check Answer" />
        <NumberPad userInput={userInput} operationType={operationType} />
      </div>
    </div>
  );
};

export default Problems;
