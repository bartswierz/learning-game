import { useState, useEffect } from "react";
import formatTime from "@/utils/formatTime";

interface TimerProps {
  onCompletion: (time: number) => void;
  stopTimer: boolean;
  isIncrementing?: boolean;
  displayText?: boolean;
}

const Timer = ({ onCompletion, stopTimer = false, isIncrementing = true, displayText = false }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!stopTimer) {
      timerId = setInterval(() => {
        setSeconds((prevTime) => (isIncrementing ? prevTime + 1 : prevTime - 1));
      }, 1000);
    } else {
      onCompletion(seconds);
    }

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopTimer, seconds, isIncrementing]);

  return (
    <div className="text-xl">
      {displayText ? "Time: " : ""}
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;
