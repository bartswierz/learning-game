interface InputDisplayProps {
  userInput: string;
}

// User Input Display Box
const InputDisplay = ({ userInput }: InputDisplayProps) => {
  return (
    <div className="flex items-center justify-center max-w-[300px] w-full h-12 bg-white text-black p-2 text-2xl">
      <span aria-label="user-input-value">{userInput}</span>
    </div>
  );
};

export default InputDisplay;
