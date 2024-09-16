import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  children: React.ReactNode;
  id: string;
}

function Draggable({ children, id }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className="bb w-[70px] h-[70px]">
      {children}
    </button>
  );
}

export default Draggable;
