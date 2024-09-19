import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

function Droppable({ id, children, className = "" }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id ? id : "droppable",
  });

  const styles = {
    backgroundColor: isOver ? "#60A5FA" : "rgba(65, 114, 178, 0.7)",
  };

  return (
    <div ref={setNodeRef} style={styles} className={`flex justify-center items-center text-center ${className}`}>
      {children}
    </div>
  );
}

export default Droppable;
