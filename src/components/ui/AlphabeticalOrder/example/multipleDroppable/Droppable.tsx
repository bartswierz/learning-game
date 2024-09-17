import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

function Droppable({ id, children, className }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id ? id : "droppable",
  });

  const style = {
    color: isOver ? "green" : undefined,
    backgroundColor: isOver ? "lightgreen" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border-2 border-blue-500 w-[70px] h-[70px] flex justify-center items-center text-center"
    >
      {children}
    </div>
  );
}

export default Droppable;
