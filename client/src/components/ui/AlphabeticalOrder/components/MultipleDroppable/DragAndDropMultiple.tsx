import { useEffect, useState } from "react";
import { DndContext, useSensors, PointerSensor, useSensor, TouchSensor, KeyboardSensor, DragEndEvent } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { shuffle } from "lodash";
import Droppable from "./Droppable"; // Component for the droppable container
import Draggable from "./Draggable"; // Component for the draggable items
import { MdOutlineQuestionMark } from "react-icons/md";
import { useTheme } from "@/contexts/ThemeContext";

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

const draggableLetters = alphabetList;
const droppableContainers = alphabetList;

interface DragAndDropMultipleProps {
  className?: string;
  droppableLayoutClassName?: string;
  draggableLayoutClassName?: string;
  setIsComplete?: (isComplete: boolean) => void;
}

function DragAndDropMultiple({
  className = "",
  draggableLayoutClassName = "",
  droppableLayoutClassName = "",
  setIsComplete = () => {},
}: DragAndDropMultipleProps) {
  const { theme } = useTheme();
  const [placements, setPlacements] = useState(initialPlacements);

  useEffect(() => {
    const areAllPlacementsFilled = Object.values(placements).every((value) => value !== null);

    if (areAllPlacementsFilled) {
      setIsComplete(true); // Stops the timer on completion
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placements]);

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

  // Used for Mobile as the drag and drop will not work without using sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const boxStyles = "w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] border-[3px]";

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      {/* DROPPABLE */}
      <div className={`${droppableLayoutClassName ? droppableLayoutClassName : className} mb-12`}>
        {droppableContainers.map((letter) => (
          <Droppable key={letter} id={`droppable-${letter}`} className={boxStyles}>
            {placements[letter] !== null ? (
              <Draggable id={letter} className={`bg-green-500 w-full h-full cursor-default`} isDisabled>
                {placements[letter]}
              </Draggable>
            ) : (
              <MdOutlineQuestionMark size={32} />
            )}
          </Droppable>
        ))}
      </div>

      {/* DRAGGABLE */}
      <div className={`${draggableLayoutClassName ? draggableLayoutClassName : className}`}>
        {shuffle(draggableLetters).map((letter) =>
          placements[letter] === null ? (
            <Draggable key={letter} id={letter} className={`${boxStyles} bg-${theme}-primary`}>
              {letter}
            </Draggable>
          ) : null
        )}
      </div>
    </DndContext>
  );
}

export default DragAndDropMultiple;
