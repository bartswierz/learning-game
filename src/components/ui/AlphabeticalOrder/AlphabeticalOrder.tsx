import TextToSpeech from "../TextToSpeech/TextToSpeech";
import DragAndDropMultiple from "./components/MultipleDroppable/DragAndDropMultiple.js";
/** Documentation - https://docs.dndkit.com/
 *
 * Possible YT overview video for setting up a simple vertical list: https://www.youtube.com/watch?v=wmk50PEsVrs
 * Sandbox/Codepen from medium: https://codesandbox.io/p/sandbox/lucid-leaf-trsyw7?file=%2Fsrc%2Findex.tsx
 */

const AlphabeticalOrder = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">
        Arrange the Letters in Alphabetical Order
        <span className="ml-2">
          <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
        </span>
      </h2>
      <div className="mt-4">
        <DragAndDropMultiple className="flex flex-wrap max-w-[950px]x max-w-[1110px] gap-4 mb-6" />
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
