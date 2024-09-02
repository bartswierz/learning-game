import AlphabetGrid from "./AlphabetGrid";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

// Place the following code in localStorage to retrieve later OR use the initialStateTodos - requires using useEffect
// const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [
//   {
//     id: 1,
//     title: "Ir de Juerga",
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Ir al gimnasio",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Estudiar React",
//     completed: true,
//   },
// ];

// const alphabetList = [
const initialStateAlphabetOrder = JSON.parse(localStorage.getItem("Alphabet Order")) || [
  { id: 1, letter: "A" },
  { id: 2, letter: "B" },
  { id: 3, letter: "C" },
  { id: 4, letter: "D" },
  { id: 5, letter: "E" },
  { id: 6, letter: "F" },
  { id: 7, letter: "G" },
  { id: 8, letter: "H" },
  { id: 9, letter: "I" },
  { id: 10, letter: "J" },
  { id: 11, letter: "K" },
  { id: 12, letter: "L" },
  { id: 13, letter: "M" },
  { id: 14, letter: "N" },
  { id: 15, letter: "O" },
  { id: 16, letter: "P" },
  { id: 17, letter: "Q" },
  { id: 18, letter: "R" },
  { id: 19, letter: "S" },
  { id: 20, letter: "T" },
  { id: 21, letter: "U" },
  { id: 22, letter: "V" },
  { id: 23, letter: "W" },
  { id: 24, letter: "X" },
  { id: 25, letter: "Y" },
  { id: 26, letter: "Z" },
];

const AlphabeticalOrder = () => {
  // console.log("window.speechSynthesis: ", window.speechSynthesis.getVoices());

  // const [alphabetOrder, setAlphabetOrder] = useState(initialStateTodos);
  const [alphabetOrder, setAlphabetOrder] = useState(initialStateAlphabetOrder);

  // Saves todo list order changes to localStorage. This will be retrieved on refresh/open if it was changed, otherwise we will use the initial state setup of the list
  useEffect(() => {
    localStorage.setItem("Alphabet Order", JSON.stringify(alphabetOrder));
  }, [alphabetOrder]);

  const handleDragEnd = (result) => {
    console.log("result: ", result);
    if (!result.destination) return;
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const copyAlphabetOrder = [...alphabetOrder];
    const [reorderAlphabet] = copyAlphabetOrder.splice(startIndex, 1);
    copyAlphabetOrder.splice(endIndex, 0, reorderAlphabet);
    setAlphabetOrder(copyAlphabetOrder);
  };

  return (
    <div className="bb flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">
        Arrange the Letters in Alphabetical Order
        <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
        {/* <TextToSpeech text="Es a nice, great success" /> */}
      </h2>
      <div className="flex flex-col gap-[50px]">
        <AlphabetGrid isShuffled />
        {/* <AlphabetGrid /> */}
        {/* <AlphabetGrid isEmpty /> */}
      </div>
      <div className="bb">
        <h2>DRAG - DROP AREA</h2>
        <div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <h1>Alphabet Order</h1>
            <Droppable droppableId="AlphabetOrder">
              {(droppableProvider) => (
                <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>
                  {alphabetOrder.map((item, index) => (
                    <Draggable index={index} key={item.id} draggableId={`${item.id}`}>
                      {(draggableProvider) => (
                        <li
                          ref={draggableProvider.innerRef}
                          {...draggableProvider.draggableProps}
                          {...draggableProvider.dragHandleProps}
                          className="bb px-2 py-2 my-2"
                        >
                          {item.letter}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {/* Makes our section element where we can drag and drop our items */}
                  {droppableProvider.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
