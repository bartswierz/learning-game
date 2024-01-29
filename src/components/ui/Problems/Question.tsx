interface QuestionProps {
  numberOne: number;
  numberTwo: number;
  operationIcon: JSX.Element | undefined;
}

const Question = ({ numberOne, numberTwo, operationIcon }: QuestionProps) => {
  return (
    <span className="flex justify-center items-center text-4xl">
      {numberOne} {operationIcon} {numberTwo} = __?
    </span>
  );
};

export default Question;
