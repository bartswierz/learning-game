import React, { useState } from "react";
import { DndContext, useSensors, PointerSensor, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./Droppable"; // Component for the droppable container
import Draggable from "./Draggable"; // Component for the draggable items

const draggableLetters = [
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
const droppableContainers = [
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

const initialStart = {
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
 * 1. Add conditional logic for the restart button to only appear once all letters are matched
 * 2. Add a voice chat that will say the letter when it is picked up and dragged by the user -> i.e. if the user picks up "A" it will say "A" on drag start
 * 3. Update layout of the draggable and droppable to be on 2 rows instead of 1
 *  3a. Add a max width to the droppable and draggable containers to make it responsive on desktop to mobile
 */
function DragAndDropMultipleV2() {
  // State to track placements dynamically using an object
  const [placements, setPlacements] = useState(initialStart);

  const handleRestart = () => {
    console.log("Restarting...");
    setPlacements(initialStart);
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
      <div className="flex flex-wrap max-w-[950px] gap-4 mb-6">
        {droppableContainers.map((letter) => (
          <Droppable key={letter} id={`droppable-${letter}`}>
            {placements[letter] ? <Draggable id={letter}>{placements[letter]}</Draggable> : "Drop here"}
          </Droppable>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 max-w-[950px] bb">
        {draggableLetters.map((letter) =>
          placements[letter] === null ? (
            <Draggable key={letter} id={letter}>
              {letter}
            </Draggable>
          ) : null
        )}
      </div>

      {/* TODO - add conditional logic to only render the restart button IF the user matches all letters */}
      <div className="bb w-full flex justify-center items-center">
        <button className="px-4 py-2" onClick={handleRestart}>
          Restart
        </button>
      </div>
    </DndContext>
  );

  // Handle the drag and drop logic
  function handleDragEnd(event) {
    const { active, over } = event;

    // Only proceed if the item is dropped over a valid droppable area
    if (over) {
      // Strips the "draggable-" and "droppable-" prefixes from the IDs
      const draggableContainer = active.id.replace("draggable-", "");
      const droppableContainer = over.id.replace("droppable-", "");

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

export default DragAndDropMultipleV2;
