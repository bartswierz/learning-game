import { useState } from "react";
import Heading from "../Layout/Heading.js";
import Timer from "../Timer/Timer.js";
import DragAndDropMultiple from "./components/MultipleDroppable/DragAndDropMultiple.js";
import { TTS_DATA } from "@/constants/constants.js";
import useTTSStore from "@/store/tts_store.ts";
import DisplayResults from "./components/DisplayResults.js";

const dndMultipleStyles = "flex flex-wrap justify-center max-w-[1110px] gap-4 mb-6 text-2xl";

const AlphabeticalOrder = () => {
  const ttsLanguage = useTTSStore((state) => state.language);
  const { ALPHABETICAL_ORDER } = TTS_DATA;
  const ttsDescription: string = ALPHABETICAL_ORDER.description[ttsLanguage];

  const [isComplete, setIsComplete] = useState(false);
  const [finishTime, setFinishTime] = useState(0);

  const handleCompletionTime = (finishedTime: number) => setFinishTime(finishedTime);

  const handleReset = () => {
    setIsComplete(false);
    setFinishTime(0);
  };

  if (isComplete && finishTime !== 0) {
    return <DisplayResults time={finishTime} handleReset={handleReset} />;
  }

  return (
    <div className="flex flex-col justify-center items-center mx-6 py-[56px]">
      <Heading text={ttsDescription} voiceText={ttsDescription} language={ttsLanguage} />
      <div className="my-3">
        <Timer onCompletion={handleCompletionTime} stopTimer={isComplete} displayText />
      </div>
      <div className="mt-4">
        <DragAndDropMultiple setIsComplete={setIsComplete} className={dndMultipleStyles} />
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
