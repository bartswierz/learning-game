import { useState, useEffect } from "react";

interface ChoicesListProps {
  options: string[];
  answer: string;
  setIsCorrect: (isCorrect: boolean) => void;
  isCorrect: boolean;
}

const ChoicesList = ({ options, answer, setIsCorrect, isCorrect }: ChoicesListProps) => {
  const [incorrectChoices, setIncorrectChoices] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);

  // Reset isSolved when new problem is generated, passing in a new answer
  useEffect(() => {
    setIsSolved(false);
  }, [answer]);

  const resetSelectedChoices = () => setIncorrectChoices([]);
  // TODO - make a list of incorrect answers to make the button disabled/ or changed in color to visually show the user that they selected the wrong answer
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
      <ul className="grid grid-cols-2 gap-4 m-4 max-w-[300px] w-full">
        {options.map((choice: string) => (
          <li key={choice}>
            <button
              className={`w-full max-w-[150px] px-2 py-4 ${choice === answer ? "bg-green-500" : "bg-gray-500"}`}
              onClick={() => handleUserChoice(choice)}
              disabled={true}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="grid grid-cols-2 gap-4 m-4 max-w-[300px] w-full">
      {options.map((choice: string) => (
        <li key={choice}>
          <button
            className={`w-full max-w-[150px] px-2 py-4 ${
              incorrectChoices.includes(choice) ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
            onClick={() => handleUserChoice(choice)}
            disabled={incorrectChoices.includes(choice) || isCorrect}
          >
            {choice}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChoicesList;
