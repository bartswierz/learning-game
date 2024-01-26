import { isNumberOrDecimal } from "@/utils";
import { ButtonInfo } from "@/types/types";
import { FaUndoAlt, FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import useSettingsStore from "@/store/store";

const buttonInfoList: ButtonInfo[] = [
  { value: "undo", reactIcon: <FaUndoAlt size={26} />, className: "bg-red-500 hover:bg-red-600" },
  { value: "divide", reactIcon: <FaDivide size={26} />, className: "h-[48px]" },
  { value: "multiply", reactIcon: <FaTimes size={26} />, className: "h-[48px]" },
  { value: "subtract", reactIcon: <RiSubtractFill size={26} />, className: "h-[48px]" },
  { value: "7", className: "" },
  { value: "8", className: "" },
  { value: "9", className: "" },
  { value: "add", reactIcon: <IoMdAdd size={26} />, className: "row-span-2" },
  { value: "4", className: "" },
  { value: "5", className: "" },
  { value: "6", className: "" },
  { value: "1", className: "" },
  { value: "2", className: "" },
  { value: "3", className: "" },
  { value: "=", className: "row-span-2" },
  { value: "0", className: "col-span-2" },
  { value: ".", className: "b" },
];

interface NumberPadProps {
  handleUserInputCallback: (userInput: string) => void;
  handleCheckCallback: () => void;
  userInput: string;
}
// TODO - add conditionals for add, subtract, multiply, divide buttons for future problems
// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ handleUserInputCallback, handleCheckCallback, userInput }: NumberPadProps) => {
  // Removes the need for our handleUserInputCallback
  const updateUserInput = useSettingsStore((state) => state.updateUserInput);
  // const appendUserInput = useSettingsStore((state) => state.appendUserInput);
  // Updates userInput state in the parent component via callback functions
  const handleClick = (input: string) => {
    console.log("user clicked: ", input);
    // NUMBER 0 through 9 - APPEND TO THE USERINPUT STRING AND UPDATE THE STATE
    if (isNumberOrDecimal(input)) {
      updateUserInput(userInput + input);
      // handleUserInputCallback(userInput + input);
      // appendUserInput(input);
    }

    // TODO - handleCheckCallback can stay for now but we need to remove it once we have fixed the other sections of children components in the Problems component
    // CHECK ANSWER
    else if (input === "=") handleCheckCallback();
    // REMOVE LAST CHARACTER FROM USERINPUT IF ITS NOT EMPTY
    else if (input === "undo" && userInput.length > 0) {
      const newInput = userInput.slice(0, userInput.length - 1);
      updateUserInput(newInput);
      // handleUserInputCallback(userInput.slice(0, userInput.length - 1));
    }
    // ADD SUBTRACT SIGN TO THE FRONT OF THE USERINPUT STRING
    else if (input === "subtract") {
      // ADD CASE IF USERINPUT ALREADY HAS A SUBTRACT SIGN TO REMOVE IT
      if (userInput[0] === "-") {
        // '-' exists in our number remove it and update the state
        const newInput = userInput.slice(1, userInput.length);
        console.log('user input already had a "-" sign, removing it and updating the state to: ', newInput);
        updateUserInput(newInput);
      } else {
        // '-' does not exist in our number add it and update the state
        console.log('user input did not have a "-" sign, adding it and updating the state to: ', "-" + userInput);
        updateUserInput("-" + userInput);
      }
      // handleUserInputCallback("-" + userInput);
    } else return;
  };

  return (
    <div className="flex justify-center text-xl">
      <ul className="grid grid-cols-4 max-w-[90vw] gap-2 w-[300px]">
        {buttonInfoList.map((item) => (
          <li
            key={item.value}
            // IF 'ROWSPAN' OR 'COLSPAN' EXIST, APPLY TO THE LIST ELEMENT
            className={`bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 ease-in-out ${item.className}`}
          >
            <button className="flex items-center justify-center w-full h-full p-2" onClick={() => handleClick(item.value)}>
              {/* DISPLAY CUSTOM ICON IF IT EXISTS, ELSE VALUE */}
              {item.reactIcon ? item.reactIcon : item.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberPad;
