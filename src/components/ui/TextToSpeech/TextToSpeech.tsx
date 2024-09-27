import { PiSpeakerHighBold } from "react-icons/pi";
import Button from "../Buttons/Button";

interface TextToSpeechProps {
  text: string;
  language?: string;
}

/*
 * window.speechSynthesis.getVoices() returns an array of voice objects.
 * Each voice object has a name, lang, and voiceURI property.
 */

const TextToSpeech = ({ text, language = "en-US" }: TextToSpeechProps) => {
  const handleSpeak = () => {
    // Cancel any ongoing speech - Prevents overlapping speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const sentence = new SpeechSynthesisUtterance();
    sentence.text = text; // Text to be spoken
    sentence.lang = language ? language : "en-US"; // Voice to use - Default is English

    // Speaks the sentence
    window.speechSynthesis.speak(sentence);
  };

  return (
    <div className="w-10 h-7">
      <Button onClick={handleSpeak} ariaLabel="text-to-speech">
        <PiSpeakerHighBold size={18} />
      </Button>
    </div>
  );
};

export default TextToSpeech;
