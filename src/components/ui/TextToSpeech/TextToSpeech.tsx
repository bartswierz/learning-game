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

    // // Get the available voices
    // const voices = window.speechSynthesis.getVoices();

    // // Find a voice that matches the selected language
    // const selectedVoice = voices.find((voice) => voice.lang === language);

    // // If a voice is found for the specified language, use it
    // if (selectedVoice) {
    //   console.log("selectedVoice", selectedVoice);
    //   sentence.voice = selectedVoice;
    // } else {
    //   console.warn(`No voice found for language: ${language}. Using default.`);
    // }

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
  {
    /*
    // <>
         <button onClick={handleSpeak} className="bg-blue-500 p-2 rounded-full">
        <PiSpeakerHighBold size={18} />
      </button> */
  }
  {
    /* </> */
  }
  // );
};

export default TextToSpeech;
