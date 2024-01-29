import { useState, useEffect } from "react";
import useSettingsStore from "@/store/store";
import { getOperationIcon, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

interface QuestionProps {
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  // operationIcon: JSX.Element | undefined;
}

// TODO - move the question login from problems here
const Question = ({ operationType }: QuestionProps) => {
  const [operationIcon, setOperationIcon] = useState<JSX.Element>();
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const updateNewNumbers = useSettingsStore((state) => state.updateNewNumbers);

  useEffect(() => {
    // DIVISION PROBLEM
    if (operationType === "DIVISION") {
      const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
      updateNewNumbers(num1, num2);
      // setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
    } else {
      // NOT DIVISION
      const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
      updateNewNumbers(num1, num2);
      // setGlobals((prev) => ({ ...prev, numberOne: num1, numberTwo: num2 }));
    }
  }, [numOneRange, numTwoRange, operationType, updateNewNumbers]);

  useEffect(() => {
    setOperationIcon(getOperationIcon(operationType));
  }, [operationType]);

  return (
    <span className="flex justify-center items-center text-4xl">
      {numberOne} {operationIcon} {numberTwo} = __?
    </span>
  );
};

export default Question;
