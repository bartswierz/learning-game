import { LanguageType } from "@/types/types";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

interface HeadingProps {
  text: string;
  voiceText?: string;
  language?: LanguageType;
  className?: string;
}

const Heading = ({ text, voiceText, language, className = "" }: HeadingProps) => {
  if (voiceText && language) {
    return (
      <h2 className={`flex gap-2 justify-center items-baseline flex-wrap text-2xl text-center ${className}`}>
        {text}
        <TextToSpeech text={voiceText} language={language} />
      </h2>
    );
  }

  return <h2 className="flex gap-2 justify-center items-baseline text-center">{text}</h2>;
};

export default Heading;
