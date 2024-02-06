interface InputDisplayProps {
  userInput: string;
}

// User Input Display Box
const InputDisplay = ({ userInput }: InputDisplayProps) => {
  return (
    <div className="flex items-center justify-center bg-white text-black w-full p-2 text-2xl h-12">
      <span aria-label="user-input-value">{userInput}</span>
    </div>
  );
};

export default InputDisplay;
