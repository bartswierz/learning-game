import { useState } from "react";
import { DndContext, closestCorners, useSensors, PointerSensor, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";

type ListType = {
  id: number;
  letter: string;
};

interface DragAndDropProps {
  list: ListType[];
}

const DragAndDrop = ({ list }: DragAndDropProps) => {
  const [correctOrder, setCorrectOrder] = useState(list);
  const [alphabetList, setAlphabetList] = useState(list);

  const getAlphabetPos = (id: number) => {
    return alphabetList.findIndex((alphabet) => alphabet.id === id);
  };

  // Used for Mobile as the drag and drop will not work without using sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const { active, over } = event;

      if (active.id === over.id) return;

      setAlphabetList((alphabetList) => {
        const originalPos = getAlphabetPos(active.id);
        const newPos = getAlphabetPos(over.id);

        return arrayMove(alphabetList, originalPos, newPos);
      });
    }
  };

  return (
    <div>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
        {/* <SortableContext items={alphabetList} strategy={verticalListSortingStrategy}> */}
        <SortableContext items={alphabetList}>
          <div className="flex flex-row flex-wrap gap-2 bb max-w-[950px]">
            {alphabetList.map((alphabet) => (
              <DraggableItem key={alphabet.id} id={alphabet.id} text={alphabet.letter} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragAndDrop;
