import { useState } from "react";
import NumberPad from "./NumberPad";
import CheckAnswerBtn from "./CheckAnswerBtn";
import Header from "./Header";
import Question from "./Question";
import InputDisplay from "./InputDisplay";
import DisplayResults from "./DisplayResults";
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
        <DisplayResults score={score} numOfQuestions={numOfQuestions} operationType={operationType} time={finishTime} />
      </>
    );
  }

  return (
    <div className="flex items-center flex-col justify-center mt-[56px]">
      <Header operationType={operationType} numOfQuestions={numOfQuestions} score={score} tts={tts_description} />
      <div className="flex flex-col gap-4 text-center">
        <Timer onCompletion={handleCompletionTime} stopTimer={isGameOver} />
        <Question operationType={operationType} numberOne={numberOne} numberTwo={numberTwo} />
        <InputDisplay userInput={userInput} />
        <CheckAnswerBtn disabled={userInput === ""} operationType={operationType} userInput={userInput} text="Check Answer" />
        <NumberPad operationType={operationType} /> {/* This updates Zustand */}
      </div>
    </div>
  );
};

export default Problems;
