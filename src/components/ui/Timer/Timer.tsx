import { useState, useEffect } from "react";

interface TimerProps {
  onCompletion: (time: number) => void;
  stopTimer: boolean;
  isIncrementing?: boolean;
}

const Timer = ({ onCompletion, stopTimer = false, isIncrementing = true }: TimerProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timerId;

    if (!stopTimer) {
      console.log("currentTime:", time);
      timerId = setInterval(() => {
        setTime((prevTime) => (isIncrementing ? prevTime + 1 : prevTime - 1));
      }, 1000);
    } else {
      // console.log("currentTime:", time);
      // timerId = setInterval(() => {
      //   setTime((prevTime) => prevTime + 1);
      // }, 1000);
      console.log("stopTimer at:", time);
      onCompletion(time);
    }

    return () => clearInterval(timerId); // Cleanup interval on unmount or when timeLeft changes
  }, [stopTimer, time, onCompletion]);

  return <div className="">{time} seconds</div>;
};

export default Timer;
