interface HeaderProps {
  operationType: string;
  score: number;
  numOfQuestions: number;
  attemptsLeft: number;
}

const Header = ({ operationType, score, numOfQuestions, attemptsLeft }: HeaderProps) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h2 className="text-2xl">{operationType}</h2>
      <span className="text-xl">
        Question: {score} / {numOfQuestions}
      </span>
      <p className="text-xl">Attempts Left: {attemptsLeft}</p>
    </div>
  );
};

export default Header;
