import { create } from "zustand";
import { LanguageType } from "@/types/types";

type State = {
  language: LanguageType;
};

type Action = {
  setLanguage: (language: LanguageType) => void;
};

const initialTTSState: State = {
  language: "en-US",
};

const useTTSStore = create<State & Action>((set) => ({
  ...initialTTSState,
  setLanguage: (language: LanguageType) => set(() => ({ language })),
}));

export default useTTSStore;
