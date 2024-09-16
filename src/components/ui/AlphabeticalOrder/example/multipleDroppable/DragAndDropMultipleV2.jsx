import React, { useState } from "react";
import { DndContext, closestCorners, useSensors, PointerSensor, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./Droppable"; // Component for the droppable container
import Draggable from "./Draggable"; // Component for the draggable items

function DragAndDropMultipleV2() {
  // Multiple containers for "A", "B", "C"
  const draggableLetters = ["A", "B", "C"];
  const droppableContainers = ["A", "B", "C"];

  // TODO - refactor to use an object to track placements
  // State to track placements dynamically using an object
  const [placements, setPlacements] = useState({ A: null, B: null, C: null });
  const [letterA, setLetterA] = useState(null);
  const [letterB, setLetterB] = useState(null);
  const [letterC, setLetterC] = useState(null);

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
      {/* TODO - Add logic to ONLY DISPLAY Draggable Containers OUTSIDE the droppable containers IF THEY HAVEN'T BEEN MATCHED YET */}
      {/* Draggable components */}
      {/* <div className="flex gap-4 mb-4"> */}
      {/* {draggableLetters.map((letter) => (
        <Draggable key={letter} id={`draggable-${letter}`}>
          {letter}
        </Draggable>
      ))} */}
      <div className="flex gap-4 mb-6">
        {/* Condition will remove the container from this location when we have a match */}
        {/* {letterA === null ? <Draggable id="A">A</Draggable> : null}
        {letterB === null ? <Draggable id="B">B</Draggable> : null}
        {letterC === null ? <Draggable id="C">C</Draggable> : null} */}
        {draggableLetters.map((letter) =>
          placements[letter] === null ? (
            <Draggable key={letter} id={letter}>
              {letter}
            </Draggable>
          ) : null
        )}
      </div>

      {/* TODO - Add logic for rendering the correct Draggable within Droppable */}
      {/* Droppable containers */}
      <div className="flex gap-4">
        {droppableContainers.map((letter) => (
          <Droppable key={letter} id={`droppable-${letter}`}>
            {/* {parent === id ? draggableMarkup : "Drop here"} */}
            {/* {parent === id ? <Draggable id="A">A</Draggable>  : "Drop here"} */}
            {/* TODO - find logic to compare that our draggableContainer is of the same type as the container -> i.e. draggable container "A" === droppable container "A" */}
            {/* Drop ({letter}) */}
            {placements[letter] ? `Contains: ${placements[letter]}` : "Drop here"}
          </Droppable>
        ))}
      </div>
    </DndContext>
  );

  // Handle the drag and drop logic
  function handleDragEnd(event) {
    const { active, over } = event;

    // Only proceed if the item is dropped over a valid droppable area
    if (over) {
      const draggableContainer = active.id.replace("draggable-", "");
      const droppableContainer = over.id.replace("droppable-", "");
      // const draggedLetter = active.id.strip("draggable-");

      console.log("draggableContainer:", draggableContainer);
      console.log("droppableContainer:", droppableContainer);

      // TODO - refactor logic
      // Ensure the dragged item matches the droppable area
      if (draggableContainer === droppableContainer) {
        setPlacements((prevPlacements) => ({
          ...prevPlacements,
          [droppableContainer]: draggableContainer, // Mark the letter as placed in the correct container
        }));
        // switch (droppableContainer) {
        //   case "A":
        //     setLetterA(draggableContainer);
        //     break;
        //   case "B":
        //     setLetterB(draggableContainer);
        //     break;
        //   case "C":
        //     setLetterC(draggableContainer);
        //     break;
        //   default:
        //     break;
        // }
      }
    }
  }
}

export default DragAndDropMultipleV2;
