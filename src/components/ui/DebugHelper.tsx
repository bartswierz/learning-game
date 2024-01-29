import useSettingsStore from "../../store/store";

// This component is used to display the current state of the Settings Store for debugging purposes
const DebugHelper = () => {
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const numberOne = useSettingsStore((state) => state.numberOne);
  const numberTwo = useSettingsStore((state) => state.numberTwo);
  const score = useSettingsStore((state) => state.score);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);
  const userInput = useSettingsStore((state) => state.userInput);
  const progress = useSettingsStore((state) => state.progress);
  const isGameOver = useSettingsStore((state) => state.isGameOver);

  return (
    <div className="relative w-full z-[-1]">
      <div className="b absolute left-[15%] mt-[100px] text-xl bg-black p-2">
        <h2 className="underline">Debugging Helper</h2>
        <ul>
          <li>
            numOfQuestions: <span className="font-bold text-green-500 text-2xl">{numOfQuestions}</span>
          </li>
          <li>
            userInput: <span className="font-bold text-green-500 text-2xl">{userInput.length === 0 ? "''" : userInput}</span>
          </li>
          <li>
            attemptsLeft: <span className="font-bold text-green-500 text-2xl">{attemptsLeft}</span>
          </li>
          <li>
            score: <span className="font-bold text-green-500 text-2xl">{score}</span>
          </li>
          <li>
            numberOne: <span className="font-bold text-green-500 text-2xl">{numberOne}</span>
          </li>
          <li>
            numberTwo: <span className="font-bold text-green-500 text-2xl">{numberTwo}</span>
          </li>
          {/* <li>
            progress: <span className="font-bold text-green-500 text-2xl">{progress}</span>
          </li> */}
          <li>
            isGameOver: <span className="font-bold text-green-500 text-2xl">{isGameOver ? "Yes" : "No"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DebugHelper;
