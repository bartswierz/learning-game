import TextToSpeech from "../TextToSpeech/TextToSpeech";
import DragAndDrop from "./DragAndDrop3";
/** Documentation - https://docs.dndkit.com/
 *
 * Possible YT overview video for setting up a simple vertical list: https://www.youtube.com/watch?v=wmk50PEsVrs
 * Sandbox/Codepen from medium: https://codesandbox.io/p/sandbox/lucid-leaf-trsyw7?file=%2Fsrc%2Findex.tsx
 */

// import DragAndDropExample from "./test/DragAndDropExample.jsx";
// import DragAndDropExample from "./example/singleDroppable/DragAndDropExample.jsx";
// import DragAndDropMultiple from "./example/multipleDroppable/DragAndDropMultiple.jsx";
import DragAndDropMultiple from "./example/multipleDroppable/DragAndDropMultiple.js";

type AlphabetDataType = {
  id: number;
  letter: string;
  isCorrectPos: boolean;
};

const alphabetData: AlphabetDataType[] = [
  { id: 1, letter: "A", isCorrectPos: false },
  { id: 2, letter: "B", isCorrectPos: false },
  { id: 3, letter: "C", isCorrectPos: false },
  { id: 4, letter: "D", isCorrectPos: false },
  // TODO - uncomment the rest once functionality is done - testing on a smaller number of letters first for a cleaner console log
  { id: 5, letter: "E", isCorrectPos: false },
  { id: 6, letter: "F", isCorrectPos: false },
  { id: 7, letter: "G", isCorrectPos: false },
  { id: 8, letter: "H", isCorrectPos: false },
  { id: 9, letter: "I", isCorrectPos: false },
  { id: 10, letter: "J", isCorrectPos: false },
  { id: 11, letter: "K", isCorrectPos: false },
  { id: 12, letter: "L", isCorrectPos: false },
  { id: 13, letter: "M", isCorrectPos: false },
  { id: 14, letter: "N", isCorrectPos: false },
  { id: 15, letter: "O", isCorrectPos: false },
  { id: 16, letter: "P", isCorrectPos: false },
  { id: 17, letter: "Q", isCorrectPos: false },
  { id: 18, letter: "R", isCorrectPos: false },
  { id: 19, letter: "S", isCorrectPos: false },
  { id: 20, letter: "T", isCorrectPos: false },
  { id: 21, letter: "U", isCorrectPos: false },
  { id: 22, letter: "V", isCorrectPos: false },
  { id: 23, letter: "W", isCorrectPos: false },
  { id: 24, letter: "X", isCorrectPos: false },
  { id: 25, letter: "Y", isCorrectPos: false },
  { id: 26, letter: "Z", isCorrectPos: false },
];

const AlphabeticalOrder = () => {
  return (
    <div className="bb flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">
        Arrange the Letters in Alphabetical Order
        <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
      </h2>
      {/* <DragAndDrop list={alphabetData} correctOrder={alphabetData} /> */}
      {/* TODO - our example Draggable and Droppable from Docs */}
      {/* <DragAndDropExample /> */}
      {/* <DragAndDropMultiple /> */}
      <DragAndDropMultiple className="flex flex-wrap max-w-[950px]x max-w-[1110px] gap-4 mb-6 bb" />
    </div>
  );
};

export default AlphabeticalOrder;
