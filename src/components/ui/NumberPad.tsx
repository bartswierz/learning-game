interface NumberPadProps {
  setUserInputCallback: (userInput: string) => void;
}

// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ setUserInputCallback }: NumberPadProps) => {
  const numberPadValues = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "clear"];

  const gridListStyle =
    "w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300";

  // TODO - may need to replace this with a callback function by passing in the UserAnswer state to the component and update the value in the parent component
  const handleClick = (num: string) => {
    if (num === "clear") setUserInputCallback("");
    else setUserInputCallback((userAnswer) => userAnswer + num);
  };

  return (
    <ul className="grid grid-cols-3 max-w-[90vw] gap-2">
      {numberPadValues.map((num) => {
        return (
          <li key={num}>
            <button onClick={() => handleClick(num)} className={gridListStyle}>
              {num}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default NumberPad;
