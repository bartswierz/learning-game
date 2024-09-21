import { EASY, MEDIUM, HARD, DifficultyTierType, GREEN, YELLOW, RED } from "../../../../types/types";
import Button from "../../Buttons/Button";

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
    <div className="flex flex-col gap-6 my-4 w-full max-w-[75%]">
      {isTierSelected ? (
        <Button onClick={() => setIsTierSelected(false)} className="bg-blue-500 px-2 py-2">
          Change Difficulty
        </Button>
      ) : (
        <>
          <Button onClick={() => handleTier(EASY)} variant={GREEN}>
            Easy (30 mins)
          </Button>
          <Button onClick={() => handleTier(MEDIUM)} variant={YELLOW}>
            Medium (15 mins)
          </Button>
          <Button onClick={() => handleTier(HARD)} variant={RED}>
            Hard (5 mins)
          </Button>
        </>
      )}
    </div>
  );
};

export default TierChoice;
