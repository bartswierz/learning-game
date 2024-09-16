import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// YT Overview Video: https://www.youtube.com/watch?v=dL5SOdgMbRY&t=47s
interface DraggableItemProps {
  text: string;
  id: number;
  isDisabled?: boolean;
  className?: string;
}

const DraggableItem = ({ text, id, isDisabled = false, className = "" }: DraggableItemProps) => {
  // const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const { attributes, listeners, setNodeRef, transform, transition, disabled } = useSortable({ id, disabled: isDisabled });
  // console.log("disabled: ", disabled);
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // Note: touch-none is IMPORTANT FOR MOBILE to prevent the browser from scrolling when we are dragging an element
  return (
    <div
      key={id}
      className={`bb p-4 touch-none ${className}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      {...disabled}
      aria-disabled={isDisabled} // Ensure it's disabled visually as well
    >
      {text}
      <button className="text-blue-500">{id}</button>
    </div>
  );
};

export default DraggableItem;
