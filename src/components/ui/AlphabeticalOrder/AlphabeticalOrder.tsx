import Heading from "../Layout/Heading.js";
import DragAndDropMultiple from "./components/MultipleDroppable/DragAndDropMultiple.js";
import { TTS_DATA } from "@/constants/constants.js";
import useTTSStore from "@/store/tts_store.ts";

const dndMultipleStyles = "flex flex-wrap justify-center max-w-[1110px] gap-4 mb-6 text-2xl";

const AlphabeticalOrder = () => {
  const ttsLanguage = useTTSStore((state) => state.language);
  const { ALPHABETICAL_ORDER } = TTS_DATA;
  const ttsDescription: string = ALPHABETICAL_ORDER.description[ttsLanguage];

  return (
    <div className="flex flex-col justify-center items-center mx-6 my-[56px]">
      <Heading text={ttsDescription} voiceText={ttsDescription} language={ttsLanguage} />
      <div className="mt-4">
        <DragAndDropMultiple className={dndMultipleStyles} />
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
