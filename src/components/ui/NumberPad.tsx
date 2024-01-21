import { FaArrowLeft, FaDivide } from "react-icons/fa6";

interface NumberPadProps {
  handleUserInputCallback: (userInput: string) => void;
  checkAnswerCallback: () => void;
  userInput: string;
}

// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ handleUserInputCallback, checkAnswerCallback, userInput }: NumberPadProps) => {
  // const numberPadValues = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "Clear"];
  // const numberPadValues = ["+", "-", "x", "/", "7", "8", "9", "[]", "4", "5", "6", "[]", "1", "2", "3", "[]", "0", "Clear"];
  // const numberPadValues = ["<-", "/", "x", "-", "7", "8", "9", "+", "4", "5", "6", "[]", "1", "2", "3", "[]", "0", ".", "Clear"];
  // const numberPadValues = ["<-", "/", "x", "-", "7", "8", "9", "+", "4", "5", "6", "[]", "1", "2", "3", "[]", "0", ".", "Clear"];
  const numberPadValues = [
    {
      id: "undo",
      value: "undo",
      bgColor: "bg-red-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "divide",
      value: "/",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "multiply",
      value: "x",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "subtract",
      value: "-",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "seven",
      value: "7",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "eight",
      value: "8",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "nine",
      value: "9",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "add",
      value: "+",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-2",
      colSpan: "col-span-1",
    },
    {
      id: "four",
      value: "4",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "five",
      value: "5",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "six",
      value: "6",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "one",
      value: "1",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "two",
      value: "2",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "three",
      value: "3",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
    {
      id: "enter",
      value: "=",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-2",
      colSpan: "col-span-1",
    },
    {
      id: "zero",
      value: "0",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-2",
    },
    {
      id: "period",
      value: ".",
      bgColor: "bg-blue-500",
      rowSpan: "row-span-1",
      colSpan: "col-span-1",
    },
  ];

  // const disabled: boolean = globals.userInput === "" ? true : false;

  // Updates userInput state in the parent component via callback function
  const handleClick = (value: string) => {
    if (value === "Clear" || value === "check") handleUserInputCallback(""); // RESET INPUT
    else handleUserInputCallback(userInput + value); // ADD VALUE TO THE END OF THE CURRENT INPUT
  };

  const handleCheck = () => {
    console.log("user clicked check");
    checkAnswerCallback();
  };

  const NumberPadButtons = () => {
    return (
      <ul className="grid grid-cols-4 grid-rows-4 max-w-[90vw] gap-2 w-[400px]">
        {numberPadValues.map(({ value, id, bgColor, colSpan, rowSpan }) => {
          return (
            // <li key={value}>
            <li key={id} className={`${colSpan} ${rowSpan} w-full h-full`}>
              <button
                onClick={() => handleClick(value)}
                className={`${bgColor} align-middle w-full h-full bg-blue-500 text-white px-2 py-1 rounded-xl hover:bg-blue-700 transition-color duration-300`}
              >
                {value === "undo" ? <FaArrowLeft /> : value}
              </button>
            </li>
          );
        })}
        {/* <li className="row-span-2 col-span-2 b">
        <button
          onClick={handleCheck}
          className="w-full bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-700 transition-color duration-300 align-middle"
        >
          =
        </button>
      </li> */}
      </ul>
    );
  };

  return (
    <div className="flex justify-center">
      <NumberPadButtons />
    </div>
  );
};

export default NumberPad;
