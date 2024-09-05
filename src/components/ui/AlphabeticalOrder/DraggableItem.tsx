import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// YT Overview Video: https://www.youtube.com/watch?v=dL5SOdgMbRY&t=47s
interface DraggableItemProps {
  text: string;
  id: number;
}

const DraggableItem = ({ text, id }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // Note: touch-none is IMPORTANT FOR MOBILE to prevent the browser from scrolling when we are dragging an element
  return (
    <div key={id} className="bb p-4 touch-none" ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {text}
      <span className="text-blue-500">{id}</span>
    </div>
  );
};

export default DraggableItem;
