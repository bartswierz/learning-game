import { PiSpeakerHighBold } from "react-icons/pi";

interface TextToSpeechProps {
  text: string;
}

// TODO - Add different languages and voices for the current 5 languages
const TextToSpeech = ({ text }: TextToSpeechProps) => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  // msg.lang = "pl-PL";

  const utterance = new SpeechSynthesisUtterance("Ułóż litery w porządku alfabetycznym");
  utterance.lang = "pl-PL";
  // msg.lang = "es-ES";

  // msg.name = "Google español de Estados Unidos";
  // msg.voiceURI = "Google español de Estados Unidos";
  // TODO - may need to add a useEffect if the text changes
  console.log("window.speechSynthesis: ", window.speechSynthesis.getVoices());
  console.log("window.speechSynthesis: ", window.speechSynthesis);

  return (
    <div>
      <button onClick={() => window.speechSynthesis.speak(msg)} className="bg-blue-500 px-3 py-3 rounded-full">
        <PiSpeakerHighBold />
      </button>
      <button onClick={() => window.speechSynthesis.speak(utterance)} className="bg-blue-500 px-3 py-3 rounded-full">
        <PiSpeakerHighBold />
      </button>
    </div>
  );
};

export default TextToSpeech;
