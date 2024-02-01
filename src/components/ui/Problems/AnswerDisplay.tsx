interface AnswerDisplayProps {
  userInput: string;
}

const AnswerDisplay = ({ userInput }: AnswerDisplayProps) => {
  return (
    <div className="flex items-center justify-center bg-white text-black w-full p-2 text-2xl h-12">
      <span className="" aria-label="user-input-value">
        {userInput}
      </span>
    </div>
  );
};

export default AnswerDisplay;
