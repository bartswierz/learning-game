import { useDroppable, DndContext } from "@dnd-kit/core";

function MultipleDroppables() {
  const { setNodeRef: setFirstDroppableRef } = useDroppable({
    id: "droppable-1",
  });
  const { setNodeRef: setsecondDroppableRef } = useDroppable({
    id: "droppable-2",
  });

  console.log("setFirstDroppableRef: ", setFirstDroppableRef);
  console.log("setsecondDroppableRef: ", setsecondDroppableRef);
  return (
    <>
      {/* <DndContext> */}
      <div ref={setFirstDroppableRef} className="bb w-[100px] h-[100px]">
        Drop Here
      </div>
      <div ref={setsecondDroppableRef} className="bb w-[100px] h-[100px]">
        Drop Here
      </div>
      {/* </DndContext> */}
    </>
  );
}

export default MultipleDroppables;

// function Droppable() {
//   const { setNodeRef } = useDroppable({
//     id: "unique-id",
//   });

//   return (
//     <div ref={setNodeRef} className="bb w-[70px] h-[70px]">
//       Drop Here
//     </div>
//   );
// }

// export default Droppable;
