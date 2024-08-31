interface ChoicesListProps {
  options: string[];
  answer: string;
}

const ChoicesList = ({ options, answer }: ChoicesListProps) => {
  const handleUserChoice = (userChoice: string) => {
    console.log("User Choice: ", userChoice);
    if (userChoice === answer) {
      console.log("CORRECT!");
    } else {
      console.log("INCORRECT! - answer is ", answer);
    }
  };

  if (!options) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 m-4 max-w-[300px] w-full">
      {options &&
        options.map((choice: string) => (
          <li key={choice}>
            <button
              className="bg-blue-500 w-full max-w-[150px] px-2 py-4 hover:bg-blue-600 cursor-pointer"
              onClick={() => handleUserChoice(choice)}
            >
              {choice} P.M.
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ChoicesList;
