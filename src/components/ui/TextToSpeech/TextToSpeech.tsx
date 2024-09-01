import { PiSpeakerHighBold } from "react-icons/pi";

interface TextToSpeechProps {
  text: string;
  language?: string;
}

/*
 * window.speechSynthesis.getVoices() returns an array of voice objects.
 * Each voice object has a name, lang, and voiceURI property.
 */

// TODO - Add different languages and voices for the current 5 languages
const TextToSpeech = ({ text, language }: TextToSpeechProps) => {
  const sentence = new SpeechSynthesisUtterance();
  console.log("textToSpeech - language: ", language);
  sentence.text = text; // Text to be spoken
  sentence.lang = language ? language : "en-US"; // Voice to use - Default is English

  return (
    <>
      <button onClick={() => window.speechSynthesis.speak(sentence)} className="bg-blue-500 p-2 rounded-full w-8x h-8x">
        <PiSpeakerHighBold size={18} />
      </button>
    </>
  );
};

export default TextToSpeech;
