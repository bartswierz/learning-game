import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "../Draggable";
import Droppable from "../Droppable";

const DragAndDropExample = () => {
  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* OUTSIDE OF DROPPABLE CONTAINER */}
      {!isDropped ? <Draggable>Drag me</Draggable> : null}

      {/* DROPPABLE CONTAINER */}
      <Droppable>{isDropped ? <Draggable>Drag me</Draggable> : "Drop here"}</Droppable>
    </DndContext>
  );
};

export default DragAndDropExample;
