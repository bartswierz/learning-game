import NumberPad from "./NumberPad";
import useSettingsStore from "@/store/store";
import CheckAnswer from "./CheckAnswer";
import Header from "./Header";
import Question from "./Question";
import AnswerDisplay from "./AnswerDisplay";
import DisplayResults from "./GameOver";
// import DebugHelper from "../DebugHelper";

interface OperationProps {
  // settings: Settings;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

const Problems = ({ operationType }: OperationProps) => {
  const score = useSettingsStore((state) => state.score);
  const userInput = useSettingsStore((state) => state.userInput);
  const isGameOver = useSettingsStore((state) => state.isGameOver);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const disabled: boolean = userInput === "" ? true : false;

  // TESTING PURPOSES, SET TO TRUE AFTER WE RESOLVE REFACTORING
  if (isGameOver) {
    // if (!isGameOver) {
    return (
      <>
        {/* <DebugHelper /> */}
        <DisplayResults score={score} numOfQuestions={numOfQuestions} operationType={operationType} />
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mx-4 sm:mx-0 gap-10 sm:mt-4 mb-[10vh]" data-testid="addition-component">
      {/* <DebugHelper /> */}
      <Header operationType={operationType} numOfQuestions={numOfQuestions} score={score} />
      <div className="flex justify-centerx items-centerx flex-col gap-4 text-center">
        <Question operationType={operationType} />
        <AnswerDisplay userInput={userInput} />
        <CheckAnswer disabled={disabled} operationType={operationType} text="Check Answer" userInput={userInput} />
        <NumberPad userInput={userInput} operationType={operationType} />
      </div>
    </div>
  );
};

export default Problems;
