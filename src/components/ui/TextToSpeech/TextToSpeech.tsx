import { PiSpeakerHighBold } from "react-icons/pi";
import useTTSStore from "@/store/tts_store";

// TODO - should pass in REQUIRED TEXT and OPTIONAL LANGUAGE TYPE
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

  // console.log("window.speechSynthesis: ", window.speechSynthesis.getVoices());
  // console.log("window.speechSynthesis: ", window.speechSynthesis);

  return (
    <>
      <button onClick={() => window.speechSynthesis.speak(sentence)} className="bg-blue-500 px-2 py-2 rounded-full">
        <PiSpeakerHighBold />
      </button>
      {/* FOR REFERENCE ON HOW TO CREATE DIFFERENT LANGUAGES */}
      {/* <button onClick={() => window.speechSynthesis.speak(polishSentence)} className="bg-blue-500 px-3 py-3 rounded-full">
        <PiSpeakerHighBold />
      </button> */}
    </>
  );
};

export default TextToSpeech;
