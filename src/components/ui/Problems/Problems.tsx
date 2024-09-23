import NumberPad from "./NumberPad";
import CheckAnswerBtn from "./CheckAnswerBtn";
import Header from "./Header";
import Question from "./Question";
import InputDisplay from "./InputDisplay";
import DisplayResults from "./DisplayResults";
import { TTS_DATA } from "@/constants/constants";
import { DescriptionType } from "@/types/types";

import useSettingsStore from "@/store/store";

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

  const { operations } = TTS_DATA;
  const tts_description: DescriptionType = operations[operationType].description;

  // User will see this after game is complete
  if (isGameOver) {
    return (
      <>
        <DisplayResults score={score} numOfQuestions={numOfQuestions} operationType={operationType} />
      </>
    );
  }

  return (
    <div className="flex items-center flex-col justify-center mt-[56px]">
      <Header operationType={operationType} numOfQuestions={numOfQuestions} score={score} tts={tts_description} />
      <div className="flex flex-col gap-4 text-center">
        <Question operationType={operationType} numberOne={numberOne} numberTwo={numberTwo} />
        <InputDisplay userInput={userInput} />
        <CheckAnswerBtn disabled={disabled} operationType={operationType} text="Check Answer" userInput={userInput} />
        <NumberPad operationType={operationType} />
      </div>
    </div>
  );
};

export default Problems;
