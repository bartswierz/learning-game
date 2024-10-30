import { useNavigate } from "react-router-dom";
import Button from "../../Buttons/Button";
import { SECONDARY, THEME } from "@/types/types";
import formatTime from "@/utils/formatTime";
import { useTheme } from "@/contexts/ThemeContext";

interface DisplayResultsProps {
  time: number;
  handleReset: () => void;
}

const DisplayResults = ({ time = 0, handleReset = () => {} }: DisplayResultsProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleRedirectToHome = () => navigate("/");

  return (
    <div className="flex justify-center gap-2 items-center flex-col h-[50vh] mt-[56px]">
      <p className="text-xl">Game Over</p>
      <p className="text-lg">
        Time: <span className={`text-${theme}-primary font-bold`}>{formatTime(time)}</span>
      </p>
      <p>Do you want to try again?</p>
      <div className="flex flex-wrap justify-center gap-5 mt-3 h-[50px] mx-4">
        <div className="w-[150px]">
          <Button onClick={handleRedirectToHome} variant={SECONDARY}>
            No
          </Button>
        </div>
        <div className="w-[150px]">
          <Button onClick={handleReset} variant={THEME}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisplayResults;
