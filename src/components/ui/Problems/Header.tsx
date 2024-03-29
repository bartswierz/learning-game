import useSettingsStore from "@/store/store";

interface HeaderProps {
  operationType: string;
  numOfQuestions: number;
  score: number;
}

const Header = ({ operationType, numOfQuestions, score }: HeaderProps) => {
  const questionNumber = useSettingsStore((state) => state.questionNumber);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);

  const oneAttemptLeft = attemptsLeft === 1 ? "text-red-500" : "";

  return (
    <div className="flex flex-col gap-2 text-center mb-4">
      <h2 className="text-2xl">{operationType}</h2>
      <span className="text-xl">
        Question: {questionNumber} / {numOfQuestions}
      </span>
      <span className="text-xl">Score: {score}</span>
      <p className={`text-xl ${oneAttemptLeft}`}>Attempts Left: {attemptsLeft}</p>
    </div>
  );
};

export default Header;
