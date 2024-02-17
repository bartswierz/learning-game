import { useState } from "react";
import useSettingsStore from "@/store/store";
// import { randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

const RestartModal = ({ handleModalCallback }: { handleModalCallback: () => void }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const resetProgress = useSettingsStore((state) => state.resetProgress);
  console.log("INSIDE RESTART MODAL");
  // const restartGame = useSettingsStore((state) => state.restartGame);
  // NEED FUNCTIONS FOR NEW NUMBERS
  // const updateNewNumbers = useSettingsStore((state) => state.updateNewNumbers);

  // TODO - first just wire it up to the random number, then update to checking whether it is division type or not
  // const newNumbers = randomTwoNumbers({ min: 1, max: 10 }, { min: 1, max: 10 });
  // console.log("RestartModal: newNumbers: ", newNumbers);

  const handleCancel = () => {
    // setIsModalOpen(false);
    handleModalCallback();
  };

  const handleReset = () => {
    console.log("INSIDE MODAL - HANDLE RESET");
    resetProgress();
    // setIsModalOpen(false);
    handleModalCallback();
  };

  // MODAL IS CLOSED
  // if (!isModalOpen) return <div className="bg-blue-500">MODAL IS CLOSED</div>;

  // MODAL IS OPEN
  return (
    <>
      {/* BACKGROUND - FULL SCREEN */}
      <div className="bb absolute z-[20] inset-0 bg-black/80 w-screen h-screen">
        {/* MODAL CONTENT */}
        <div className="bb flex items-center justify-center h-full">
          <div className="bb w-[300px] p-4 text-center bg-gray-200 rounded-md">
            <div className="mb-4 mt-2 text-gray-800 ">
              <p>This will reset progress</p>
              <p>Are you sure?</p>
            </div>

            {/* BUTTONS CONTAINER */}
            <div className="flex justify-center items-center gap-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 hover:text-white duration-200 ease-in px-4 py-2 rounded-md"
                onClick={handleCancel}
              >
                No
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 hover:text-white duration-200 ease-in px-4 py-2 rounded-md"
                onClick={handleReset}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestartModal;
