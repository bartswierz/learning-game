import { FaUndoAlt } from "react-icons/fa";

interface NumberPadProps {
  handleUserInputCallback: (userInput: string) => void;
  checkAnswerCallback: () => void;
  userInput: string;
}

// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ handleUserInputCallback, checkAnswerCallback, userInput }: NumberPadProps) => {
  // Updates userInput state in the parent component via callback function
  const handleClick = (value: string) => {
    console.log("user clicked: ", value);
    // USER CLICKED A NUMBER 0 through 9 - APPEND TO THE USERINPUT STRING AND UPDATE THE STATE
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(value)) handleUserInputCallback(userInput + value);
    // USER CLICKED UNDO - Remove last character from the userInput string and update the state
    else if (value === "undo") handleUserInputCallback(userInput.slice(0, userInput.length - 1));
    // USER CLICKED EQUAL
    else if (value === "=") checkAnswerCallback();
  };

  interface ButtonInfo {
    value: string;
    reactIcon?: JSX.Element;
    colSpan?: number;
    rowSpan?: number;
  }

  const NumberPadButtons = () => {
    // Numberpad values & option custom icons for a few buttons
    const buttonInfoList: ButtonInfo[] = [
      { value: "undo", reactIcon: <FaUndoAlt /> },
      { value: "/" },
      { value: "*" },
      { value: "-" },
      { value: "7" },
      { value: "8" },
      { value: "9" },
      { value: "+", rowSpan: 2 },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "=", rowSpan: 2 },
      { value: "0", colSpan: 2 },
      { value: "." },
    ];

    return (
      <ul className="grid grid-cols-4 max-w-[90vw] gap-2 w-[400px] justify-centerX place-content-centerX">
        {buttonInfoList.map((item) => (
          <li
            key={item.value}
            // IF 'ROWSPAN' OR 'COLSPAN' EXIST, APPLY TO THE LIST ELEMENT
            className={`${item.rowSpan && `row-span-${item.rowSpan}`} 
              ${item.colSpan && `col-span-${item.colSpan}`}`}
          >
            <button className="place-self-center place-content-center b w-full h-full p-2" onClick={() => handleClick(item.value)}>
              {item.reactIcon ? item.reactIcon : item.value}
            </button>
          </li>
        ))}
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
