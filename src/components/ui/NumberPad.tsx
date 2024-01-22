import { isNumberOrDecimal } from "@/utils";
import { ButtonInfo } from "@/types/types";
import { FaUndoAlt, FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

interface NumberPadProps {
  handleUserInputCallback: (userInput: string) => void;
  checkAnswerCallback: () => void;
  userInput: string;
}

// TODO - add conditionals for add, subtract, multiply, divide buttons for future problems
// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ handleUserInputCallback, checkAnswerCallback, userInput }: NumberPadProps) => {
  // Updates userInput state in the parent component via callback functions
  const handleClick = (input: string) => {
    // console.log("user clicked: ", input);

    // NUMBER 0 through 9 - APPEND TO THE USERINPUT STRING AND UPDATE THE STATE
    if (isNumberOrDecimal(input)) {
      handleUserInputCallback(userInput + input);
    }

    // CHECK ANSWER
    else if (input === "=") checkAnswerCallback();
    // REMOVE LAST CHARACTER FROM USERINPUT IF ITS NOT EMPTY
    else if (input === "undo" && userInput.length > 0) {
      handleUserInputCallback(userInput.slice(0, userInput.length - 1));
    }
    // ADD SUBTRACT SIGN TO THE FRONT OF THE USERINPUT STRING
    else if (input === "subtract") {
      handleUserInputCallback("-" + userInput);
    } else return;
  };

  const buttonInfoList: ButtonInfo[] = [
    { value: "undo", reactIcon: <FaUndoAlt size={40} />, className: "bg-red-500 hover:bg-red-600" },
    { value: "divide", reactIcon: <FaDivide size={40} />, className: "" },
    { value: "multiply", reactIcon: <FaTimes size={40} />, className: "" },
    { value: "subtract", reactIcon: <RiSubtractFill size={42} />, className: "" },
    { value: "7", className: "" },
    { value: "8", className: "" },
    { value: "9", className: "" },
    { value: "add", reactIcon: <IoMdAdd size={42} />, className: "row-span-2" },
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

  return (
    <div className="flex justify-center">
      <ul className="grid grid-cols-4 max-w-[90vw] gap-2 w-[400px]">
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
