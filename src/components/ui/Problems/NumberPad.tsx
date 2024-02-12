import { ButtonInfo } from "@/types/types";
import { FaUndoAlt, FaTimes } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import useSettingsStore from "@/store/store";
import CheckAnswerBtn from "./CheckAnswerBtn";
import NumberBtn from "./NumberBtn";

interface NumberPadProps {
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
}

// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ operationType }: NumberPadProps) => {
  const userInput = useSettingsStore((state) => state.userInput);
  const isDisabled: boolean = userInput === "" ? true : false;

  return (
    <div className="flex justify-center text-xl">
      <ul className="grid grid-cols-4 max-w-[90vw] focus:h-[50%] gap-[6px] gap-y-[14px] w-[300px]">
        {buttonInfoList.map(({ value, reactIcon, className }) => (
          <li
            key={value}
            // IF 'ROWSPAN' OR 'COLSPAN' EXIST, APPLY TO THE LIST ELEMENT
            className={className}
          >
            {/* IF BUTTON VALUE IS "=" => REPLACE IT WITH OUR CHECKANSWER COMPONENT */}
            {value === "=" ? (
              <CheckAnswerBtn disabled={isDisabled} userInput={userInput} operationType={operationType} text="=" />
            ) : (
              <NumberBtn userInput={userInput} value={value} reactIcon={reactIcon} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NumberPad;

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
