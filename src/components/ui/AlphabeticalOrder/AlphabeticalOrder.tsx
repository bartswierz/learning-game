import AlphabetGrid from "./AlphabetGrid";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import { useEffect, useState } from "react";
import Droppable from "./Droppable";
import Draggable from "./Draggable";
import {
  useDroppable,
  DndContext,
  closestCorners,
  useSensors,
  PointerSensor,
  useSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AlphabetTile from "./AlphabetTile";
/** Documentation - https://docs.dndkit.com/
 *
 * Possible YT overview video for setting up a simple vertical list: https://www.youtube.com/watch?v=wmk50PEsVrs
 * Sandbox/Codepen from medium: https://codesandbox.io/p/sandbox/lucid-leaf-trsyw7?file=%2Fsrc%2Findex.tsx
 */

// const alphabetList = [
// const initialStateAlphabetOrder = JSON.parse(localStorage.getItem("Alphabet Order")) || [
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
  // console.log("window.speechSynthesis: ", window.speechSynthesis.getVoices());

  const [alphabetList, setAlphabetList] = useState(alphabetData);
  // const [alphabetOrder, setAlphabetOrder] = useState(initialStateAlphabetOrder);

  const getAlphabetPos = (id: number) => {
    return alphabetList.findIndex((alphabet) => alphabet.id === id);
  };

  // To ADD a new tile(i.e. adding a new task to a TODO list) - Important for the future when we have multiple lists
  /*
  const addAlphabetTile = (letter: string) => {
    setAlphabetList((alphabetList) => {
      const newAlphabet = {
        id: alphabetList.length + 1,
        letter,
      };
 
      // Adds the new tile to the end of the list
      return [...alphabetList, newAlphabet];
    });
  };
  */

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const { active, over } = event;

      if (active.id === over.id) return;

      setAlphabetList((alphabetList) => {
        const originalPos = getAlphabetPos(active.id);
        const newPos = getAlphabetPos(over.id);

        return arrayMove(alphabetList, originalPos, newPos);
      });
    }
  };

  // Used for Mobile as the drag and drop will not work without using sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="bb flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">
        Arrange the Letters in Alphabetical Order
        <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
        {/* <TextToSpeech text="Es a nice, great success" /> */}
      </h2>
      <div className="flex flex-col gap-[50px]">
        <AlphabetGrid isShuffled />
      </div>
      <div className="bb">
        <h2>DRAG - DROP AREA</h2>
        {/* TESTING DND Kit HERE */}
        <div>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            {/* <SortableContext items={alphabetList} strategy={verticalListSortingStrategy}> */}
            <SortableContext items={alphabetList}>
              <div className="flex flex-row flex-wrap gap-2">
                {alphabetList.map((alphabet) => (
                  <AlphabetTile key={alphabet.id} id={alphabet.id} letter={alphabet.letter} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
