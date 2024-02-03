import { checkAnswer, isNumberOrDecimal } from "@/utils";
import { ButtonInfo } from "@/types/types";
import { FaUndoAlt, FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import useSettingsStore from "@/store/store";
import CheckAnswer from "./CheckAnswer";
import { useEffect } from "react";
// import { useState } from "react";

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
  { value: ".", className: "" },
];

interface NumberPadProps {
  // handleUserInputCallback: (userInput: string) => void;
  // handleCheckCallback: () => void;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ operationType }: NumberPadProps) => {
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const userInput = useSettingsStore((state) => state.userInput);
  const updateUserInput = useSettingsStore((state) => state.updateUserInput);
  const isDisabled: boolean = userInput === "" ? true : false;

  // Updates userInput state in the parent component via callback functions
  const handleClick = (input: string) => {
    console.log("Button pressed: ", input);
    // NUMBER 0 through 9 - APPEND TO THE USERINPUT STRING AND UPDATE THE STATE
    if (isNumberOrDecimal(input)) {
      const isDecimal = input === ".";
      if (isDecimal) {
        const hasDecimalAlready = userInput.includes(".");
        if (hasDecimalAlready) {
          return;
        } else {
          updateUserInput(userInput + ".");
        }
      } else {
        // IS A NUMBER
        console.log("user input: ", userInput, "and input: ", input);
        updateUserInput(userInput + input);
      }
    }
    // CHECK ANSWER
    else if (input === "=") checkAnswer({ userInput, numberOne, numberTwo, operationType });
    // REMOVE LAST CHARACTER FROM USERINPUT IF ITS NOT EMPTY
    else if (input === "undo" && userInput.length > 0) {
      const newInput = userInput.slice(0, userInput.length - 1);
      updateUserInput(newInput);
      // handleUserInputCallback(userInput.slice(0, userInput.length - 1));
    }
    // ADD SUBTRACT SIGN TO THE FRONT OF THE USERINPUT STRING
    else if (input === "subtract") {
      const hasNegativeSignAlready = userInput[0] === "-";

      if (hasNegativeSignAlready) {
        // REMOVE THE NEGATIVE SIGN AND UPDATE THE STATE
        const newInput = userInput.slice(1, userInput.length);
        updateUserInput(newInput);
      } else {
        // NO NEGATIVE SIGN FOUND, ADD IT TO THE FRONT OF THE USERINPUT STRING
        console.log('user input did not have a "-" sign, adding it and updating the state to: ', "-" + userInput);
        updateUserInput("-" + userInput);
      }
    } else return;
  };

  // TODO - FIX CONDITIONAL LOGIC FOR THE CHECK ANSWER BUTTON ONCE THE REMAINING CHILDREN COMPONENTS IN THE PROBLEMS COMPONENT ARE REFACTORED
  return (
    <div className="flex justify-center text-xl">
      <ul className="grid grid-cols-4 max-w-[90vw] gap-2 w-[300px]">
        {buttonInfoList.map((item) => (
          <li
            key={item.value}
            // IF 'ROWSPAN' OR 'COLSPAN' EXIST, APPLY TO THE LIST ELEMENT
            className={`bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 ease-in-out ${item.className}`}
          >
            {/* IF BUTTON VALUE IS ""=" => REPLACE IT WITH OUR CHECKANSWER COMPONENT */}
            {item.value === "=" ? (
              <CheckAnswer
                disabled={isDisabled}
                userInput={userInput}
                operationType={operationType}
                text="="
                className="w-full h-full rounded-lg hover:bg-blue-600 disabled:hover:bg-gray-500 transition-all duration-300 ease-in-out"
              />
            ) : (
              <button
                className="flex items-center justify-center w-full h-full p-2"
                onClick={() => handleClick(item.value)}
                aria-label={`button-${item.value}`}
              >
                {/* DISPLAY CUSTOM ICON IF IT EXISTS, ELSE VALUE */}
                {item.reactIcon ? item.reactIcon : item.value}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberPad;
