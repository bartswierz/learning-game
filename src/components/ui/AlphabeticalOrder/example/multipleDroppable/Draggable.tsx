import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function Draggable({ children, id, className = "h-[70px] w-[70px] bg-blue-500" }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`bb ${className}`}>
      {children}
    </button>
  );
}

export default Draggable;
