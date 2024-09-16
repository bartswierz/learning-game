import { useEffect, useState } from "react";
import { DndContext, closestCorners, useSensors, PointerSensor, useSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";
import { shuffle } from "lodash";
import MultipleDroppables from "./Droppable";

type ListType = {
  id: number;
  letter: string;
  isCorrectPos: boolean;
};

interface DragAndDropProps {
  list: ListType[];
  correctOrder: ListType[];
}

/** TODO - may be able to refactor to one list once we have the functionality in place
 * 1. Shuffle the list of letters to start
 * 2. User can drag and drop the letters to arrange them in alphabetical order
 * 3. Once the user has arranged the letters in the correct order, we can check if the order is correct
 * Plan #1  4. Idea - we can use the ID of the changed element to determine if it is in the correct position. Example: b = id: 2, if we move b into the 2nd position, we should set the background to green indicating the correct position
 *          4b - We should also LOCK the letter in place to prevent users from moving it again, this can cause confusion if they are able to move it again
 *          5. If the user places the letter in the WRONG location, we can change the background of the letter to red
 *            5b - this could be temporary for 2-3 seconds and then go back to  the default color. The goal of this is to provide feedback to the user that the letter is in the wrong location
 *
 * *******
 * Plan #2
 * Since our drag moves the entire row one to the right or left, it makes more sense to add a button that the user can click that will then check each position of the letters to see if they are in the correct order
 * 1. This requires going through the entire list and comparing our id position against the answer key that is the alphabet list in order
 * 2. If the user clicks the button and the letters are in the correct order, we can display a message that the letters are in the correct order IF ALL letters are in the correct order
 * 2a. If there are only a few letters correct, we should LOCK the correct positions and change the background color to green
 * 3. If the user gets all correct, we should display a button that allow the user to shuffle the letters again to try again
 */
const DragAndDrop = ({ list, correctOrder }: DragAndDropProps) => {
  const [answerKey, setAnswerKey] = useState(correctOrder);

  // TODO - use the list given and ADD a third property to the object that will be used to determine if the letter is in the correct position - correct: boolean
  const [alphabetList, setAlphabetList] = useState(shuffle(list));
  // console.log("alphabetList: ", alphabetList);

  // useEffect(() => {
  //   // console.log("alphabetList: ", alphabetList);
  // }, [alphabetList]);
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

  const handleCheckAnswer = () => {
    const updatedAlphabetList = answerKey.map(({ id, letter }) => {
      const userLetter = alphabetList[id - 1].letter;
      const userLetterID = alphabetList[id - 1].id;

      // LETTERS MATCH
      if (letter === userLetter) {
        return { id: userLetterID, letter: userLetter, isCorrectPos: true };
      }

      // NO MATCH
      return { id: userLetterID, letter: userLetter, isCorrectPos: false };
    });

    // Update the state once we finish comparing the user's choices against the answer key
    setAlphabetList(updatedAlphabetList);
  };

  return (
    <div>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
        {/* <SortableContext items={alphabetList} strategy={verticalListSortingStrategy}> */}
        <SortableContext items={alphabetList}>
          <div className="flex flex-row flex-wrap gap-2 bb max-w-[950px]">
            {alphabetList.map(({ id, letter, isCorrectPos }) => (
              <DraggableItem
                key={id}
                id={id}
                text={letter}
                className={`bb hover:border-blue-400 transition-colors duration-200 ${isCorrectPos ? "bg-green-500" : "bg-red-500"}`}
                isDisabled={isCorrectPos}
                // isDisabled={true}
              />
            ))}
          </div>
        </SortableContext>
        <MultipleDroppables />
      </DndContext>

      <div className="bb mt-4">
        <button onClick={handleCheckAnswer} className="bg-blue-500 px-4 py-2 w-full">
          Check Order2
        </button>
      </div>
    </div>
  );
};

export default DragAndDrop;
