import { isNumberOrDecimal } from "@/utils";
import useSettingsStore from "@/store/store";
import Button from "../../Buttons/Button";
import { THEME } from "@/types/types";

interface NumberBtnProps {
  value: string;
  reactIcon: JSX.Element | undefined;
  userInput: string;
}

const NumberBtn = ({ value, reactIcon, userInput }: NumberBtnProps) => {
  const updateUserInput = useSettingsStore((state) => state.updateUserInput);
  const buttonContent = reactIcon ? reactIcon : value;
  const ariaLabel = `button-${value}`;

  // Updates userInput state in the parent component via callback functions
  const handleClick = (input: string) => {
    const isInputLessThanSixDigits = userInput.length < 6;
    // NUMBER 0 through 9 - APPEND TO THE USERINPUT STRING AND UPDATE THE STATE
    if (isNumberOrDecimal(input)) {
      const isDecimal = input === ".";
      if (isDecimal) {
        const hasDecimalAlready = userInput.includes(".");
        if (hasDecimalAlready) {
          return; // DO NOTHING, USERINPUT ALREADY HAS A DECIMAL
        } else {
          updateUserInput(userInput + ".");
        }
      } else {
        // NOT A DECIMAL / IS A NUMBER
        if (isInputLessThanSixDigits) {
          updateUserInput(userInput + input);
        }
      }
    }
    // REMOVE LAST CHARACTER FROM USERINPUT IF ITS NOT EMPTY
    else if (input === "undo" && userInput.length > 0) {
      const newInput = userInput.slice(0, userInput.length - 1);
      updateUserInput(newInput);
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
    <Button onClick={() => handleClick(value)} ariaLabel={ariaLabel} variant={THEME}>
      {buttonContent}
    </Button>
  );
};

export default NumberBtn;
