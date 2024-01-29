import useSettingsStore from "../../store/store";

// This component is used to display the current state of the Settings Store for debugging purposes
const DebugHelper = () => {
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const questionNumber = useSettingsStore((state) => state.questionNumber);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const score = useSettingsStore((state) => state.score);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const userInput = useSettingsStore((state) => state.userInput);
  const progress = useSettingsStore((state) => state.progress);
  const isGameOver = useSettingsStore((state) => state.isGameOver);

  return (
    <div className="relative w-full z-[-1]x">
      <div className="b absolute left-[15%]x mt-[100px]x text-xl bg-black p-2 w-[200px]">
        <h2 className="underline">Debugging Helper</h2>
        <ul>
          <li className="flex justify-between">
            <span>numOfQuestions: </span>
            <span className="text-green-500 text-xl">{numOfQuestions}</span>
          </li>
          <li className="flex justify-between">
            Question #: <span className="text-green-500 text-xl">{questionNumber}</span>
          </li>
          <li className="flex justify-between">
            attemptsLeft: <span className="text-green-500 text-xl">{attemptsLeft}</span>
          </li>
          <li className="flex justify-between">
            score: <span className="text-green-500 text-xl">{score}</span>
          </li>
          <li className="flex justify-between">
            userInput: <span className="text-green-500X text-xl">{userInput.length === 0 ? "N/A" : userInput}</span>
          </li>
          <li className="flex justify-between">
            numberOne: <span className="text-green-500X text-xl">{numberOne}</span>
          </li>
          <li className="flex justify-between">
            numberTwo: <span className="text-green-500X text-xl">{numberTwo}</span>
          </li>
          {/* <li>
            progress: <span className="font-bold text-green-500 text-2xl">{progress}</span>
          </li> */}
          <li className="flex justify-between">
            isGameOver: <span className="text-green-500X text-2xl">{isGameOver ? "Yes" : "No"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DebugHelper;
