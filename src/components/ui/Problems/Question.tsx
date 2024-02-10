import { useState, useEffect } from "react";
import useSettingsStore from "@/store/store";
import { getOperationIcon, randomTwoNumbers, randomTwoNumbersForDivision } from "@/utils";

interface QuestionProps {
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  // operationIcon: JSX.Element | undefined;
  numberOne: number;
  numberTwo: number;
}

const Question = ({ operationType, numberOne, numberTwo }: QuestionProps) => {
  const [operationIcon, setOperationIcon] = useState<JSX.Element>();
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const updateNewNumbers = useSettingsStore((state) => state.updateNewNumbers);

  // We are using two separate functions because we need to ensure division numbers returned will give the user a whole number
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
      {numberOne} {operationIcon} {numberTwo} = _?
    </span>
  );
};

export default Question;
