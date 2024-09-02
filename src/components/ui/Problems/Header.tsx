import useSettingsStore from "@/store/store";
import { useTranslation } from "react-i18next";
import TextToSpeech from "@/components/ui/TextToSpeech/TextToSpeech";
import { DescriptionType, LanguageType } from "@/types/types";
import useTTSStore from "@/store/tts_store";

interface HeaderProps {
  operationType: string;
  numOfQuestions: number;
  score: number;
  tts: DescriptionType;
}

const Header = ({ operationType, numOfQuestions, score, tts }: HeaderProps) => {
  const { t } = useTranslation();
  const questionNumber = useSettingsStore((state) => state.questionNumber);
  const attemptsLeft = useSettingsStore((state) => state.attemptsLeft);

  // Retrieves the current language set by the user from our store -- this will be used for setting the appropriate voice for the TextToSpeech component
  const ttsLanguage: LanguageType = useTTSStore((state) => state.language);

  const oneAttemptLeft = attemptsLeft === 1 ? "text-red-500" : "";

  return (
    <div className="flex flex-col gap-2 text-center mb-4">
      <h2>
        <span className="text-2xl">{t(operationType)} </span>
        <TextToSpeech text={tts[ttsLanguage]} language={ttsLanguage} />
      </h2>
      <span className="text-xl">
        {t("Question")}: {questionNumber} / {numOfQuestions}
      </span>
      <span className="text-xl">
        {t("Score")}: {score}
      </span>
      <p className={`text-xl ${oneAttemptLeft}`}>
        {t("Attempts Left")}: {attemptsLeft}
      </p>
    </div>
  );
};

export default Header;
