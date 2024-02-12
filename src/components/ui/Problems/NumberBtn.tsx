import { isNumberOrDecimal } from "@/utils";
import useSettingsStore from "@/store/store";

interface NumberBtnProps {
  value: string;
  reactIcon: JSX.Element | undefined;
  userInput: string;
}

const NumberBtn = ({ value, reactIcon, userInput }: NumberBtnProps) => {
  const updateUserInput = useSettingsStore((state) => state.updateUserInput);
  // console.log("inside NumberBtn component");
  const buttonContent = reactIcon ? reactIcon : value;
  const ariaLabel = `button-${value}`;

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
        console.log("No negative sign found, applying to user input...", "-" + userInput);
        updateUserInput("-" + userInput);
      }
    } else return;
  };

  return (
    <button
      className={`relative flex items-center justify-center w-full h-full transition-all duration-700 ease-in-out`}
      onClick={() => handleClick(value)}
      aria-label={ariaLabel}
    >
      {/* BACKGROUND*/}
      <div className="absolute inset-x-0 h-full -bottom-2 bg-blue-600 rounded-lg"></div>

      {/* TEXT CONTAINER */}
      <div className="relative flex items-center justify-center w-full h-full bg-blue-500 border-[1.5px] border-blue-600 rounded-lg py-2 transition transform duration-600 active:translate-y-2">
        {buttonContent}
      </div>
    </button>
  );
};

export default NumberBtn;
