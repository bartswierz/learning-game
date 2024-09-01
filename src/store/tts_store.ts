import { create } from "zustand";
import { LanguageType } from "@/types/types";

type State = {
  language: LanguageType;
};

// isPlaying: false,
// isPaused: false,
// isStopped: true,
// isResumed: false,
// isFinished: false,
// text: "",
// voice: "Google US English",
// rate: 1.0,
// pitch: 1.0,
// volume: 1.0,
// voices: [],
const initialTTSState: State = {
  language: "en-US",
};

const useTTSStore = create((set) => ({
  ...initialTTSState,
  // language: "en-US",
  // setLanguage: (language: string) => set(() => ({ language })),
  setLanguage: (language: LanguageType) => set(() => ({ language })),
}));

export default useTTSStore;
