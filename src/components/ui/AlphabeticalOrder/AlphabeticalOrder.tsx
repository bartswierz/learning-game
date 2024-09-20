import TextToSpeech from "../TextToSpeech/TextToSpeech";
import DragAndDropMultiple from "./components/MultipleDroppable/DragAndDropMultiple.js";

const dndMultipleStyles = "flex flex-wrap justify-center max-w-[1110px] gap-4 mb-6 text-2xl";

const AlphabeticalOrder = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl flex gap-2 justify-center items-baseline">
        Arrange the Letters in Alphabetical Order
        <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
      </h2>
      <div className="mt-4">
        <DragAndDropMultiple className={dndMultipleStyles} />
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
