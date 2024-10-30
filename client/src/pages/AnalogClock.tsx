import AnalogClock from "@/components/ui/AnalogClock/AnalogClock";
import useTTSStore from "@/store/tts_store";
import { TTS_DATA } from "@/constants/constants";
import Heading from "@/components/ui/Layout/Heading";

export default function AnalogClockPage() {
  const ttsLanguage = useTTSStore((state) => state.language);
  const { CLOCK } = TTS_DATA;
  const ttsDescription: string = CLOCK.description[ttsLanguage];

  return (
    <div className="pt-[4vh] pb-[8vh]">
      <Heading text="Around the Clock" voiceText={ttsDescription} language={ttsLanguage} className="font-bold" />
      <AnalogClock />
    </div>
  );
}
