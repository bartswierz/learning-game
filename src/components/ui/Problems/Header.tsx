import useSettingsStore from "@/store/store";

interface HeaderProps {
  operationType: string;
  numOfQuestions: number;
  score: number;
}

const Header = ({ operationType, numOfQuestions, score }: HeaderProps) => {
  const questionNumber = useSettingsStore((state) => state.questionNumber);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  console.log("score: ", score);
  // const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  // const score = useSettingsStore((state) => state.score);

  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="text-2xl">{operationType}</h2>
      <span className="text-xl">
        Question: {questionNumber} / {numOfQuestions}
      </span>
      <span className="text-xl">Score: {score}</span>
      <p className="text-xl">Attempts Left: {attemptsLeft}</p>
    </div>
  );
};

export default Header;
