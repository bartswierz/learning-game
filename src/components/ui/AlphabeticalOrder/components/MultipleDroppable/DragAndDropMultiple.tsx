import { useEffect, useState } from "react";
import { DndContext, useSensors, PointerSensor, useSensor, TouchSensor, KeyboardSensor, DragEndEvent } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { shuffle } from "lodash";
import Droppable from "./Droppable"; // Component for the droppable container
import Draggable from "./Draggable"; // Component for the draggable items
import { MdOutlineQuestionMark } from "react-icons/md";

const alphabetList = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// const draggableLetters = shuffle(alphabetList);
const draggableLetters = alphabetList;
const droppableContainers = alphabetList;

type PlacementsType = {
  [key: string]: string | null;
};

const initialPlacements: PlacementsType = {
  A: null,
  B: null,
  C: null,
  D: null,
  E: null,
  F: null,
  G: null,
  H: null,
  I: null,
  J: null,
  K: null,
  L: null,
  M: null,
  N: null,
  O: null,
  P: null,
  Q: null,
  R: null,
  S: null,
  T: null,
  U: null,
  V: null,
  W: null,
  X: null,
  Y: null,
  Z: null,
};
/** TODO
 * Add a voice chat that will say the letter when it is picked up and dragged by the user -> i.e. if the user picks up "A" it will say "A" on drag start
 */
interface DragAndDropMultipleProps {
  className?: string;
  droppableLayoutClassName?: string;
  draggableLayoutClassName?: string;
}

function DragAndDropMultiple({
  className = "",
  draggableLayoutClassName = "",
  droppableLayoutClassName = "",
}: DragAndDropMultipleProps) {
  // State to track placements dynamically using an object
  // const [placements, setPlacements] = useState(shuffle(initialStart));
  const [placements, setPlacements] = useState(initialPlacements);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const areAllPlacementsFilled = Object.values(placements).every((value) => value !== null);

    if (areAllPlacementsFilled) {
      setIsComplete(true);
    }
  }, [placements]);

  const handleRestart = () => {
    setPlacements(initialPlacements);
    setIsComplete(false);
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
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      {/* DROPPABLE */}
      <div className={droppableLayoutClassName ? droppableLayoutClassName : className}>
        {droppableContainers.map((letter) => (
          <Droppable key={letter} id={`droppable-${letter}`}>
            {placements[letter] !== null ? (
              <Draggable id={letter}>{placements[letter]}</Draggable>
            ) : (
              <MdOutlineQuestionMark size={32} />
            )}
          </Droppable>
        ))}
      </div>

      {/* TODO - add text to speech ON DRAG */}
      {/* DRAGGABLE */}
      <div className={draggableLayoutClassName ? draggableLayoutClassName : className}>
        {shuffle(draggableLetters).map((letter) =>
          placements[letter] === null ? (
            <Draggable key={letter} id={letter}>
              {letter}
            </Draggable>
          ) : null
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        {isComplete && (
          <button className="px-4 py-2 bg-blue-500" onClick={handleRestart}>
            Reset
          </button>
        )}
      </div>
    </DndContext>
  );

  // Handle the drag and drop logic
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Only proceed if the item is dropped over a valid droppable area
    if (over) {
      const draggableContainer = String(active.id).replace("draggable-", ""); // "draggable-A" => "A"
      const droppableContainer = String(over.id).replace("droppable-", ""); // "droppable-B" => "B"

      // MATCHING DROPPABLE CONTAINER
      if (draggableContainer === droppableContainer) {
        setPlacements((prevPlacements) => ({
          ...prevPlacements,
          [droppableContainer]: draggableContainer, // "A" => "A"
        }));
      }
    }
  }
}

export default DragAndDropMultiple;
