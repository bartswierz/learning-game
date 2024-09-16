import React from "react";
import { useDroppable } from "@dnd-kit/core";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    // id: "droppable",
    id: props.id ? props.id : "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
    backgroundColor: isOver ? "lightgreen" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="border-2 border-green-600 w-[100px] h-[100px] flex justify-center items-center">
      {props.children}
    </div>
  );
}

export default Droppable;
