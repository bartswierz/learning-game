import { useEffect, useState } from "react";
import { DndContext, useSensors, PointerSensor, useSensor, DragOverlay } from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { shuffle } from "lodash";

// Draggable Alphabet Letter Component
const DraggableItem = ({ letter, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: id,
  });

  const style = {
    transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    transition,
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="bg-red-500 p-4 text-center">
      {letter}
    </div>
  );
};

// Droppable Zone Component
const DroppableZone = ({ id, letter, onDrop }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const handleDrop = (event) => {
    onDrop(id, event.active.id); // Get the id of the dropped item
  };

  const style = {
    backgroundColor: isOver ? "lightblue" : "white",
    border: "2px solid black",
    width: "70px",
    height: "70px",
    textAlign: "center",
    // lineHeight: "70px",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  return (
    <div className="flex items-center justify-center bb">
      <div ref={setNodeRef} style={style} onDrop={handleDrop}>
        {letter || "Drop here"}
      </div>
    </div>
  );
};

// Main Component
const DragAndDrop = () => {
  const [alphabetList, setAlphabetList] = useState(shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")));
  const [placements, setPlacements] = useState({}); // Keep track of where items were dropped

  // Sensors for dragging
  const sensors = useSensors(useSensor(PointerSensor));

  // Handle when an item is dropped into a zone
  const handleDrop = (zoneId, letterId) => {
    setPlacements((prev) => ({ ...prev, [zoneId]: letterId }));
  };

  const handleCheckAnswer = () => {
    let correct = true;
    for (let i = 0; i < 26; i++) {
      const correctLetter = String.fromCharCode(65 + i); // A -> Z
      if (placements[i] !== correctLetter) {
        correct = false;
        break;
      }
    }
    alert(correct ? "Correct!" : "Incorrect, try again.");
  };

  return (
    <div className="">
      <DndContext sensors={sensors}>
        {/* Render Draggable Alphabet Letters */}
        <div className="flex items-center justify-center bb">
          <div className="flex flex-wrap gap-2 bg-slate-600 max-w-[950px]">
            {alphabetList.map((letter, index) => (
              <DraggableItem key={letter} id={letter} letter={letter} />
            ))}
          </div>
        </div>

        {/* Render 26 Droppable Zones */}
        <div className="flex items-center justify-center bb">
          <div className="flex flex-wrap gap-2 mt-4 bg-orange-200 max-w-[950px]">
            {[...Array(26)].map((_, index) => (
              <DroppableZone key={index} id={index} letter={placements[index] || null} onDrop={handleDrop} />
            ))}
          </div>
        </div>
      </DndContext>

      <button onClick={handleCheckAnswer} className="mt-4 bg-blue-500 text-white px-4 py-2">
        Check Answer
      </button>
    </div>
  );
};

export default DragAndDrop;
