import { SUCCESS, IN_PROGRESS, FAILED } from "@/types/types";

interface GameOverProps {
  isGameOver: boolean;
  progress: typeof SUCCESS | typeof IN_PROGRESS | typeof FAILED | null;
  numberOne: number;
  numberTwo: number;
}

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
  if (progress === SUCCESS) return <SuccessMessage />;

  // USER RAN OUT OF ATTEMPTS
  if (progress === FAILED) return <FailedMessage numberOne={numberOne} numberTwo={numberTwo} />;
};

export default GameOverMessage;
