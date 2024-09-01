import { useEffect, useState } from "react";
import { Clock, TierChoice, ChoicesList } from "./components";
import { DifficultyTierType } from "@/types/types";
import { EASY, MEDIUM, HARD } from "@/types/types";
import { createEasyTierArray, createMediumTierArray, createHardTierArray } from "@/utils/createTierChoiceArray";

const AnalogClock = () => {
  const [answer, setAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [choicesArray, setChoicesArray] = useState<string[]>([]);
  const [isTierSelected, setIsTierSelected] = useState<boolean>(false);
  const [tier, setTier] = useState<DifficultyTierType>(null);

  // Picks a random answer from the choicesArray
  useEffect(() => {
    setAnswer(choicesArray[Math.floor(Math.random() * choicesArray.length)]);
  }, [choicesArray]);

  useEffect(() => {
    const hour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
    switch (tier) {
      case EASY:
        setChoicesArray(createEasyTierArray(hour));
        break;
      case MEDIUM:
        setChoicesArray(createMediumTierArray(hour));
        break;
      case HARD:
        setChoicesArray(createHardTierArray(hour));
        break;
      default:
    }
  }, [tier]);

  // Resets difficulty
  const handleResetDifficulty = () => {
    setTier(null);
    setIsCorrect(false);
  };

  // Generates a new problem based on the difficulty tier
  const handleNewProblem = (tier: DifficultyTierType) => {
    switch (tier) {
      case EASY:
        setChoicesArray(createEasyTierArray(Math.floor(Math.random() * 12) + 1));
        setIsCorrect(false);
        break;
      case MEDIUM:
        setChoicesArray(createMediumTierArray(Math.floor(Math.random() * 12) + 1));
        setIsCorrect(false);
        break;
      case HARD:
        setChoicesArray(createHardTierArray(Math.floor(Math.random() * 12) + 1));
        setIsCorrect(false);
        break;
      default:
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-[30px]">
      <Clock time={answer} />
      <div className="flex flex-col justify-center items-center">
        {!tier && (
          <>
            <h2 className="pt-6">Please select a difficulty below:</h2>
            <TierChoice isTierSelected={isTierSelected} setIsTierSelected={setIsTierSelected} setTier={setTier} />
          </>
        )}
        {tier && (
          <>
            <button onClick={handleResetDifficulty} className="bg-blue-500 px-4 py-2 mb-4">
              Change Difficulty
            </button>
            <h2 className="text-xl">What is the correct time?</h2>
            {isCorrect && <h3 className="text-green-500 text-xl ">Correct!</h3>}
            <ChoicesList options={choicesArray} answer={answer} setIsCorrect={setIsCorrect} isCorrect={isCorrect} />
            {isCorrect && (
              <button onClick={() => handleNewProblem(tier)} className="bg-blue-500 px-2 py-3 w-full">
                New Problem
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AnalogClock;
