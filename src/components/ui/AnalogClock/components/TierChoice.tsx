import { EASY, MEDIUM, HARD, DifficultyTierType } from "../../../../types/types";

interface TierChoiceProps {
  isTierSelected: boolean;
  setIsTierSelected: (isTierSelected: boolean) => void;
  setTier: (tier: DifficultyTierType) => void;
}

const TierChoice = ({ setIsTierSelected, isTierSelected, setTier }: TierChoiceProps) => {
  const handleTier = (tier: DifficultyTierType) => {
    setTier(tier);
  };

  return (
    <div className="flex gap-4 my-4">
      {isTierSelected ? (
        <button onClick={() => setIsTierSelected(false)} className="bg-blue-500 px-2 py-2">
          Change Difficulty
        </button>
      ) : (
        <>
          <button onClick={() => handleTier(EASY)} className="cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 text-center">
            Easy
            <br />
            30 mins
          </button>
          <button
            onClick={() => handleTier(MEDIUM)}
            className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-center"
          >
            Medium <br />
            15 mins
          </button>
          <button onClick={() => handleTier(HARD)} className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 text-center">
            Hard
            <br />5 mins
          </button>
        </>
      )}
    </div>
  );
};

export default TierChoice;
