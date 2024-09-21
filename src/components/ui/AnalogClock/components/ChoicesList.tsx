import { useState, useEffect } from "react";
import Button from "../../Buttons/Button";
import { GREEN, RED } from "@/types/types";

interface ChoicesListProps {
  options: string[];
  answer: string;
  setIsCorrect: (isCorrect: boolean) => void;
  isCorrect: boolean;
}

const ChoicesList = ({ options, answer, setIsCorrect }: ChoicesListProps) => {
  const [incorrectChoices, setIncorrectChoices] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  // Reset isSolved when new problem is generated, passing in a new answer
  useEffect(() => {
    setIsSolved(false);
  }, [answer]);

  const resetSelectedChoices = () => setIncorrectChoices([]);
  const handleUserChoice = (userChoice: string) => {
    if (userChoice === answer) {
      setIsCorrect(true);
      setIsSolved(true);
      resetSelectedChoices();
    } else {
      // Keep track of incorrect choices
      setIncorrectChoices([...incorrectChoices, userChoice]);
    }
  };

  if (!options) return null;

  if (isSolved)
    return (
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 max-w-[300px] w-full mb-4">
        {options.map((choice: string) => (
          <li key={choice}>
            <Button
              className={`w-full max-w-[150px]`}
              onClick={() => handleUserChoice(choice)}
              variant={choice === answer ? GREEN : RED}
            >
              {choice}
            </Button>
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 mt-4 mb-6 max-w-[300px] w-full">
      {options.map((choice: string) => (
        <li key={choice}>
          {incorrectChoices.includes(choice) ? (
            <Button onClick={() => handleUserChoice(choice)} variant={RED}>
              {choice}
            </Button>
          ) : (
            <Button onClick={() => handleUserChoice(choice)}>{choice}</Button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChoicesList;
