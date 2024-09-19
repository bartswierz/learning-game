import { isNumberOrDecimal } from "@/utils";
import useSettingsStore from "@/store/store";
import Button from "../Button/Button";

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
        updateUserInput("-" + userInput);
      }
    } else return;
  };

  return (
    <>
      <Button onClick={() => handleClick(value)} ariaLabel={ariaLabel}>
        {buttonContent}
      </Button>
    </>
  );
};

export default NumberBtn;
