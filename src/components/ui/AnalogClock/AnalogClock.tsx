import { useEffect, useState } from "react";
import { Clock, TierChoice, ChoicesList } from "./components";

const AnalogClock = () => {
  const [answer, setAnswer] = useState<string>("");
  const [choicesArray, setChoicesArray] = useState<string[]>([]);
  const hour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
  const [isTierSelected, setIsTierSelected] = useState<boolean>(false);

  // Picks a random answer from the choicesArray
  useEffect(() => {
    setAnswer(choicesArray[Math.floor(Math.random() * choicesArray.length)]);
  }, [choicesArray]);

  // TODO - create a helper function for generating a new problem - REQUIRES having a tierChoice selected

  // TODO - refactor
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 gap-[30px] bb">
      <Clock time={answer} />
      <div className="bb flex flex-col justify-center items-center">
        {!isTierSelected && <h2 className="pt-6">Please select a difficulty below:</h2>}
        <TierChoice
          hour={hour}
          setChoicesArray={setChoicesArray}
          setIsTierSelected={setIsTierSelected}
          isTierSelected={isTierSelected}
        />
        {isTierSelected && (
          <>
            <h2>What is the correct time?</h2>
            <ChoicesList options={choicesArray} answer={answer} />
            {/* TODO - add logic to only show button once user picks the correct answer */}
            <button onClick={() => {}} className="bg-blue-500 px-2 py-3 w-full">
              New Problem
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalogClock;
