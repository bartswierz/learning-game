interface GameOverProps {
  isGameOver: boolean;
  progress: "Success" | "InProgress" | "Failed" | null;
  numberOne: number;
  numberTwo: number;
}

// Display the Game Over message, and percentage button
// USER ANSWER ALL QUESTIONS CORRECTLY OR RAN OUT OF ATTEMPTS
const GameOverMessage = ({ isGameOver, progress, numberOne, numberTwo }: GameOverProps) => {
  // USER ANSWERED ALL QUESTIONS CORRECTLY
  const SuccessMessage = () => {
    return <span className="text-green-500 font-bold">Good Job!</span>;
  };

  interface FailedProps {
    numberOne: number;
    numberTwo: number;
  }

  // USER RAN OUT OF ATTEMPTS
  const FailedMessage = ({ numberOne, numberTwo }: FailedProps) => {
    const correctAnswer = numberOne + numberTwo;

    return (
      <div className="text-center font-bold">
        <p>Incorrect</p>
        <p>The correct answer is {correctAnswer}</p>
        <p>Game Over</p>
      </div>
    );
  };

  // GAME IS STILL IN PROGRESS - DO NOT DISPLAY GAME OVER COMPONENT
  if (!isGameOver) return null;

  // USER ANSWERED ALL QUESTIONS CORRECTLY
  if (progress === "Success") return <SuccessMessage />;

  // USER RAN OUT OF ATTEMPTS
  if (progress === "Failed") return <FailedMessage numberOne={numberOne} numberTwo={numberTwo} />;
};

export default GameOverMessage;
