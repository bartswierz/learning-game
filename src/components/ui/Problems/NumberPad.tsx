import { checkAnswer, isNumberOrDecimal } from "@/utils";
import { ButtonInfo } from "@/types/types";
import { FaUndoAlt, FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import useSettingsStore from "@/store/store";
import CheckAnswerBtn from "./CheckAnswerBtn";
// import { useState } from "react";

const buttonInfoList: ButtonInfo[] = [
  { value: "undo", reactIcon: <FaUndoAlt size={26} />, className: "bg-red-500x hover:bg-red-600x" },
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
  const userInput = useSettingsStore((state) => state.userInput);
  const updateUserInput = useSettingsStore((state) => state.updateUserInput);
  const isDisabled: boolean = userInput === "" ? true : false;

  // Updates userInput state in the parent component via callback functions
  const handleClick = (input: string) => {
    console.log("Clicked: ", input);
    // NUMBER 0 through 9 - APPEND TO THE USERINPUT STRING AND UPDATE THE STATE
    if (isNumberOrDecimal(input)) {
      const isDecimal = input === ".";
      if (isDecimal) {
        const hasDecimalAlready = userInput.includes(".");
        if (hasDecimalAlready) {
          return; // DO NOTHING IF USERINPUT ALREADY HAS A DECIMAL IN THE NUMBER
        } else {
          updateUserInput(userInput + ".");
        }
      } else {
        // IS A NUMBER
        updateUserInput(userInput + input);
      }
    }
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

  interface NumberBtnProps {
    value: string;
    reactIcon: JSX.Element | undefined;
  }

  // TODO - add integration test for this refactor
  const NumberBtn = ({ value, reactIcon }: NumberBtnProps) => {
    const buttonContent = reactIcon ? reactIcon : value;
    const ariaLabel = `button-${value}`;

    return (
      <>
        <button
          className={`relative flex items-center justify-center w-full h-full transition-all duration-[5000ms] ease-in-out`}
          onClick={() => handleClick(value)}
          aria-label={ariaLabel}
        >
          {/* BACKGROUND*/}
          <div className="absolute inset-x-0 h-full -bottom-2 bg-blue-600 rounded-lg"></div>

          {/* TEXT CONTAINER */}
          <div className="relative flex items-center justify-center w-full h-full bg-blue-500 border border-blue-600 rounded-lg py-2 transition transform duration-600 active:translate-y-2">
            {buttonContent}
          </div>
        </button>
      </>
    );
  };

  return (
    <div className="flex justify-center text-xl">
      <ul className="grid grid-cols-4 max-w-[90vw] focus:h-[50%] gap-[6px] gap-x-[6px]x gap-y-[14px] w-[300px]">
        {buttonInfoList.map(({ value, reactIcon, className }) => (
          <li
            key={value}
            // IF 'ROWSPAN' OR 'COLSPAN' EXIST, APPLY TO THE LIST ELEMENT
            // className={`bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300 ease-in-out ${className}`}
            // className={` ${className}`}
            //className adds row-span or col-span
            className={` ${className}`}
          >
            {/* IF BUTTON VALUE IS ""=" => REPLACE IT WITH OUR CHECKANSWER COMPONENT */}
            {value === "=" ? (
              <CheckAnswerBtn
                disabled={isDisabled}
                userInput={userInput}
                operationType={operationType}
                text="="
                // className={`w-full h-full rounded-lg hover:bg-blue-600 disabled:hover:bg-gray-500 transition-all duration-300 ease-in-out ${className}`}
                className={`w-full h-full rounded-lg hover:bg-blue-600 disabled:hover:bg-gray-500 transition-all duration-300 ease-in-out ${className}`}
              />
            ) : (
              // <button
              //   className="flex items-center justify-center w-full h-full p-2"
              //   onClick={() => handleClick(value)}
              //   aria-label={`button-${value}`}
              // >
              //   {reactIcon ? reactIcon : value}
              // </button>
              <NumberBtn value={value} reactIcon={reactIcon} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberPad;
