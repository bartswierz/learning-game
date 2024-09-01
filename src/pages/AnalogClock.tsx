import AnalogClock from "@/components/ui/AnalogClock/AnalogClock";
import useTTSStore from "@/store/tts_store";
import TextToSpeech from "@/components/ui/TextToSpeech/TextToSpeech";
import { TTS_DATA } from "@/constants/constants";

export default function AnalogClockPage() {
  const ttsLanguage = useTTSStore((state) => state.language);
  const { CLOCK } = TTS_DATA;
  const ttsDescription = CLOCK.description[ttsLanguage];

  return (
    <div className="pt-[4vh] pb-[8vh]">
      <h1 className="text-center text-2xl font-bold mb-4">
        Around the Clock{" "}
        <span>
          <TextToSpeech text={ttsDescription} language={ttsLanguage} />
        </span>
      </h1>
      <AnalogClock />
    </div>
  );
}
