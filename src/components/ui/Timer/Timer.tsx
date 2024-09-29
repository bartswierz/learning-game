import { useState, useEffect } from "react";

interface TimerProps {
  onCompletion: (time: number) => void;
  stopTimer: boolean;
  isIncrementing?: boolean;
}

const Timer = ({ onCompletion, stopTimer = false, isIncrementing = true }: TimerProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (!stopTimer) {
      timerId = setInterval(() => {
        setTime((prevTime) => (isIncrementing ? prevTime + 1 : prevTime - 1));
      }, 1000);
    } else {
      onCompletion(time);
    }

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stopTimer, time, isIncrementing]);

  return <div>{time} seconds</div>;
};

export default Timer;
