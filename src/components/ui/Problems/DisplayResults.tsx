import { useNavigate } from "react-router-dom";
import useSettingsStore from "@/store/store";
import RestartBtn from "../RestartBtn";
import Button from "../Buttons/Button";
import { SECONDARY } from "@/types/types";
import formatTime from "@/utils/formatTime";

interface DisplayResultsProps {
  score: number;
  numOfQuestions: number;
  operationType: "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";
  time: number;
  resetTimer: () => void;
}

// Display the game over message and restart button with user results
const DisplayResults = ({ score, numOfQuestions, operationType, time, resetTimer }: DisplayResultsProps) => {
  const navigate = useNavigate();
  const resetProgress = useSettingsStore((state) => state.resetProgress);

  const calculatePercentage = (score: number, numOfQuestions: number) => {
    return (score / numOfQuestions) * 100;
  };

  const percentage = calculatePercentage(score, numOfQuestions);

  // Redirect user back to home page
  const HomeButton = () => {
    const redirectBackToHome = () => {
      resetProgress();
      navigate("/");
    };

    return (
      <Button onClick={redirectBackToHome} variant={SECONDARY}>
        No
      </Button>
    );
  };

  return (
    <div className="flex justify-center gap-2 items-center flex-col h-[50vh] mt-[56px]">
      <p className="text-xl">Game Over</p>
      <p className="text-lg">
        Questions: {score} / {numOfQuestions}
      </p>
      <p className="text-lg">
        Score: <span className="text-blue-500 font-bold">{percentage}%</span>
      </p>
      {/* <p className="text-lg">Time: {time} seconds</p> */}
      <p className="text-lg">Time: {formatTime(time)}</p>
      <p>Do you want to try again?</p>
      <div className="flex flex-wrap justify-center gap-5 mt-3 h-[50px] mx-4">
        <div className="w-[150px]">
          <HomeButton />
        </div>
        <div className="w-[150px]">
          <RestartBtn operationType={operationType} resetTimer={resetTimer} />
        </div>
      </div>
    </div>
  );
};

export default DisplayResults;
