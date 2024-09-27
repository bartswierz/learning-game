import { useState, useEffect } from "react";

/** TODO
 * 1. Create a Timer component that takes in an initialTime prop and a callback prop called onTimeUp.
 * 2. Should allow increment and decrement of the time to make the timer more flexible.
 * 3. The timer should start counting down/up when the isActive prop is true.
 */
interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const DecrementTimer = ({ initialTime = 0, onTimeUp, isActive }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timerId;

    if (isActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Call the onTimeUp callback when timeLeft reaches 0 - this should be a times up component screen that shows the user the results
      onTimeUp();
    }

    return () => clearInterval(timerId); // Cleanup interval on unmount or when timeLeft changes
  }, [isActive, timeLeft, onTimeUp]);

  return <div className="">{timeLeft} seconds left</div>;
};

export default DecrementTimer;
