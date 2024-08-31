import { useEffect, useState } from "react";
import { Clock, TierChoice, ChoicesList } from "./components";

const AnalogClock = () => {
  const [answer, setAnswer] = useState<string>("");
  const [choicesArray, setChoicesArray] = useState<string[]>([]);
  const hour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12

  // Picks a random answer from the choicesArray
  useEffect(() => {
    setAnswer(choicesArray[Math.floor(Math.random() * choicesArray.length)]);
  }, [choicesArray]);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {/* <h2>DEV TESTING*: {answer}</h2> */}
      <Clock time={answer} />
      <TierChoice hour={hour} setChoicesArray={setChoicesArray} />
      <ChoicesList options={choicesArray} answer={answer} />
    </div>
  );
};

export default AnalogClock;
