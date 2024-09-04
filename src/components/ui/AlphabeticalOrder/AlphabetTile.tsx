import Droppable from "./Droppable";
import Draggable from "./Draggable";
import { useDroppable, DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// YT Overview Video: https://www.youtube.com/watch?v=dL5SOdgMbRY&t=47s

// TODO - refactor into a separate component file
interface AlphabetTileProps {
  letter: string;
  id: number;
}

const AlphabetTile = ({ letter, id }: AlphabetTileProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // Note: touch-none is IMPORTANT FOR MOBILE to prevent the browser from scrolling when we are dragging an element
  return (
    <div key={id} className="bb p-2 touch-none" ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {letter}
    </div>
  );
};

export default AlphabetTile;
