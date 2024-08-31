import { PiSpeakerHighBold } from "react-icons/pi";

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
  sentence.text = text; // Required
  sentence.lang = language ? sentence.lang : "en-US"; // Default to English

  // Example of Polish language
  // const polishSentence = new SpeechSynthesisUtterance("Ułóż litery w porządku alfabetycznym");
  // polishSentence.lang = "pl-PL";

  // TODO - may need to add a useEffect if the text changes
  // console.log("window.speechSynthesis: ", window.speechSynthesis.getVoices());
  // console.log("window.speechSynthesis: ", window.speechSynthesis);

  return (
    <div>
      <button onClick={() => window.speechSynthesis.speak(sentence)} className="bg-blue-500 px-3 py-3 rounded-full">
        <PiSpeakerHighBold />
      </button>
      {/* FOR REFERENCE ON HOW TO CREATE DIFFERENT LANGUAGES */}
      {/* <button onClick={() => window.speechSynthesis.speak(polishSentence)} className="bg-blue-500 px-3 py-3 rounded-full">
        <PiSpeakerHighBold />
      </button> */}
    </div>
  );
};

export default TextToSpeech;
