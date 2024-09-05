import TextToSpeech from "../TextToSpeech/TextToSpeech";
import DragAndDrop from "./DragAndDrop";
/** Documentation - https://docs.dndkit.com/
 *
 * Possible YT overview video for setting up a simple vertical list: https://www.youtube.com/watch?v=wmk50PEsVrs
 * Sandbox/Codepen from medium: https://codesandbox.io/p/sandbox/lucid-leaf-trsyw7?file=%2Fsrc%2Findex.tsx
 */

type AlphabetDataType = {
  id: number;
  letter: string;
};

const alphabetData: AlphabetDataType[] = [
  { id: 1, letter: "A" },
  { id: 2, letter: "B" },
  { id: 3, letter: "C" },
  { id: 4, letter: "D" },
  { id: 5, letter: "E" },
  { id: 6, letter: "F" },
  { id: 7, letter: "G" },
  { id: 8, letter: "H" },
  { id: 9, letter: "I" },
  { id: 10, letter: "J" },
  { id: 11, letter: "K" },
  { id: 12, letter: "L" },
  { id: 13, letter: "M" },
  { id: 14, letter: "N" },
  { id: 15, letter: "O" },
  { id: 16, letter: "P" },
  { id: 17, letter: "Q" },
  { id: 18, letter: "R" },
  { id: 19, letter: "S" },
  { id: 20, letter: "T" },
  { id: 21, letter: "U" },
  { id: 22, letter: "V" },
  { id: 23, letter: "W" },
  { id: 24, letter: "X" },
  { id: 25, letter: "Y" },
  { id: 26, letter: "Z" },
];

const AlphabeticalOrder = () => {
  return (
    <div className="bb flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">
        Arrange the Letters in Alphabetical Order
        <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
      </h2>
      <DragAndDrop list={alphabetData} />
    </div>
  );
};

export default AlphabeticalOrder;
