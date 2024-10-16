import { useState } from "react";
import NumberPad from "./components/NumberPad";
import CheckAnswerBtn from "./components/CheckAnswerBtn";
import Header from "./components/Header";
import Question from "./components/Question";
import InputDisplay from "./components/InputDisplay";
import DisplayResults from "./components/DisplayResults";
import Timer from "../Timer/Timer";

import { TTS_DATA } from "@/constants/constants";
import { DescriptionType } from "@/types/types";

import useSettingsStore from "@/store/store"; // Zustand store

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

  const { operations } = TTS_DATA;
  const tts_description: DescriptionType = operations[operationType].description;

  const [finishTime, setFinishTime] = useState(0);
  const handleCompletionTime = (finishedTime: number) => {
    setFinishTime(finishedTime);
  };

  if (isGameOver && finishTime) {
    return (
      <>
        <DisplayResults
          score={score}
          numOfQuestions={numOfQuestions}
          operationType={operationType}
          time={finishTime}
          resetTimer={() => setFinishTime(0)}
        />
      </>
    );
  }

  return (
    <div className="flex items-center flex-col justify-center pt-[40px] pb-[56px]">
      <Header operationType={operationType} numOfQuestions={numOfQuestions} score={score} tts={tts_description} />
      <div className="flex flex-col gap-4 text-center">
        <Timer onCompletion={handleCompletionTime} stopTimer={isGameOver} displayText />
        <Question operationType={operationType} numberOne={numberOne} numberTwo={numberTwo} />
        <InputDisplay userInput={userInput} />
        <CheckAnswerBtn disabled={userInput === ""} operationType={operationType} userInput={userInput} text="Check Answer" />
        <NumberPad operationType={operationType} />
      </div>
    </div>
  );
};

export default Problems;
