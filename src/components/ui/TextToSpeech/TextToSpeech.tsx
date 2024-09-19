import { PiSpeakerHighBold } from "react-icons/pi";

interface TextToSpeechProps {
  text: string;
  language?: string;
}

/*
 * window.speechSynthesis.getVoices() returns an array of voice objects.
 * Each voice object has a name, lang, and voiceURI property.
 */

const TextToSpeech = ({ text, language }: TextToSpeechProps) => {
  const handleSpeak = () => {
    // Cancel any ongoing speech - Prevents overlapping speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const sentence = new SpeechSynthesisUtterance();

    sentence.text = text; // Text to be spoken
    sentence.lang = language ? language : "en-US"; // Voice to use - Default is English

    window.speechSynthesis.speak(sentence);
  };

  return (
    <button onClick={handleSpeak} className="bg-blue-500 p-2 rounded-full">
      <PiSpeakerHighBold size={18} />
    </button>
  );
};

export default TextToSpeech;
