import NumberPad from "./NumberPad";
import CheckAnswerBtn from "./CheckAnswerBtn";
import Header from "./Header";
import Question from "./Question";
import InputDisplay from "./InputDisplay";
import DisplayResults from "./DisplayResults";
import { TTS_DATA } from "@/constants/constants";
import { DescriptionType } from "@/types/types";

import useSettingsStore from "@/store/store";
import Timer from "../Timer/Timer";
import { useEffect, useState } from "react";

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
  // TODO - create time variable in our store -- for now we are using the state in this component

  const [finishTime, setFinishTime] = useState(0);
  // let timeFinished = 0;
  // const handleTimeFinished = (time: number) => {
  //   return (timeFinished = time);
  // };

  // const timeFinished = 0;
  function handleCompletionTime(finishedTime: number) {
    console.log("finishedTime:", finishedTime);
    // TODO - replace our setFinishTime with a new time variable in our store
    setFinishTime(finishedTime);
  }

  const disabled: boolean = userInput === "" ? true : false;

  const { operations } = TTS_DATA;
  const tts_description: DescriptionType = operations[operationType].description;

  // User will see this after game is complete
  if (isGameOver && finishTime) {
    console.log("game is over, and time is set");
    return (
      <>
        {/* TODO - pass in time finished result to DisplayResults */}
        <DisplayResults score={score} numOfQuestions={numOfQuestions} operationType={operationType} time={finishTime} />
      </>
    );
  }

  // useEffect(() => {
  //   console.log("useEffect - isGameOver:", isGameOver);
  //   if (isGameOver) {
  //     // Game is over, so stop the timer and set the final time.
  //     setTimeFinished((prevTime) => prevTime); // Ensure timeFinished is set properly.
  //   }
  // }, [isGameOver]);

  return (
    <div className="flex items-center flex-col justify-center mt-[56px]">
      {/* {!isGameOver ? (
        <> */}
      <Header operationType={operationType} numOfQuestions={numOfQuestions} score={score} tts={tts_description} />
      <div className="flex flex-col gap-4 text-center">
        {/* TODO - pass in a function when we pause the timer to give us the time finished */}
        {/* <IncrementTimer onCompletion={(finishedtime: number) => CompletionTime(finishedtime)} stopTimer={isGameOver} /> */}
        <Timer onCompletion={handleCompletionTime} stopTimer={isGameOver} />
        <Question operationType={operationType} numberOne={numberOne} numberTwo={numberTwo} />
        <InputDisplay userInput={userInput} />
        <CheckAnswerBtn disabled={disabled} operationType={operationType} text="Check Answer" userInput={userInput} />
        <NumberPad operationType={operationType} />
      </div>
      {/* </>
      ) : (
        <> */}
      {/* TODO - pass in time finished result to DisplayResults */}

      {/* </> */}
      {/* )} */}
    </div>
  );
};

export default Problems;
