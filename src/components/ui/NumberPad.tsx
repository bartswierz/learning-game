interface NumberPadProps {
  handleUserInputCallback: (userInput: string) => void;
  checkAnswerCallback: () => void;
  userInput: string;
}

// Component containing buttons 0-9 and a clear button to reset user input
const NumberPad = ({ handleUserInputCallback, checkAnswerCallback, userInput }: NumberPadProps) => {
  const numberPadValues = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "Clear"];

  // Updates userInput state in the parent component via callback function
  const handleClick = (value: string) => {
    if (value === "Clear" || value === "check") handleUserInputCallback(""); // RESET INPUT
    else handleUserInputCallback(userInput + value); // ADD VALUE TO THE END OF THE CURRENT INPUT
  };

  const handleCheck = () => {
    console.log("user clicked check");
    checkAnswerCallback();
  };

  return (
    <ul className="grid grid-cols-3 max-w-[90vw] gap-2">
      {numberPadValues.map((value) => {
        return (
          <li key={value}>
            <button
              onClick={() => handleClick(value)}
              className="w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300"
            >
              {value}
            </button>
          </li>
        );
      })}
      <li>
        <button
          onClick={handleCheck}
          className="w-full bg-blue-500 text-white text-center px-4 py-2 rounded-xl hover:bg-blue-700 transition-color duration-300"
        >
          =
        </button>
      </li>
    </ul>
  );
};

export default NumberPad;
