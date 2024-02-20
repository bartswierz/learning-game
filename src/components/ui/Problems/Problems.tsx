import NumberPad from "./NumberPad";
import useSettingsStore from "@/store/store";
import CheckAnswerBtn from "./CheckAnswerBtn";
import Header from "./Header";
import Question from "./Question";
import InputDisplay from "./InputDisplay";
import DisplayResults from "./DisplayResults";

interface OperationProps {
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

const Problems = ({ operationType }: OperationProps) => {
  const score = useSettingsStore((state) => state.score);
  const userInput = useSettingsStore((state) => state.userInput);
  const isGameOver = useSettingsStore((state) => state.isGameOver);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const disabled: boolean = userInput === "" ? true : false;

  // if (isGameOver) {
  if (!isGameOver) {
    return (
      // <div className="flex justify-center items-center">
      <>
        <DisplayResults score={score} numOfQuestions={numOfQuestions} operationType={operationType} />
      </>
    );
  }

  return (
    <div className="">
      <Header operationType={operationType} numOfQuestions={numOfQuestions} score={score} />
      <div className="flex justify-centerx items-centerx flex-col gap-4 text-center">
        <Question operationType={operationType} numberOne={numberOne} numberTwo={numberTwo} />
        <InputDisplay userInput={userInput} />
        <CheckAnswerBtn disabled={disabled} operationType={operationType} text="Check Answer" userInput={userInput} />
        <NumberPad operationType={operationType} />
      </div>
    </div>
  );
};

export default Problems;
