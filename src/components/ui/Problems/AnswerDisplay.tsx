interface AnswerDisplayProps {
  userInput: string;
}

const AnswerDisplay = ({ userInput }: AnswerDisplayProps) => {
  return (
    <div
      className="flex items-center justify-center bg-white text-black w-full p-2 text-2xl b h-12"
      data-testid="user-answer-input"
      data-user-answer={userInput}
    >
      <span className="bx h-fullx w-fullx text-middlex">{userInput}</span>
    </div>
  );
};

export default AnswerDisplay;
