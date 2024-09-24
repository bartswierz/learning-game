import { useDraggable } from "@dnd-kit/core";
import speakText from "@/utils/speakText";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
}

function Draggable({ children, id, isDisabled = false, className = "h-[70px] w-[70px] bg-blue-500" }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
    disabled: isDisabled,
  });

  // Say the letter when dragging starts
  const handleDragStart = () => speakText(id);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${className} touch-none`}
      onMouseDown={handleDragStart} // For desktop
      onTouchStart={handleDragStart} // For mobile
    >
      {children}
    </button>
  );
}

export default Draggable;
