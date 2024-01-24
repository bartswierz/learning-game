import { create } from "zustand";

interface Settings {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
}

// const settings: Settings = {
const initialState: Settings = {
  numOneRange: { min: 1, max: 10 },
  numTwoRange: { min: 1, max: 10 },
  numOfQuestions: 5,
  numOfAttempts: 3,
};

interface SettingsStore {
  settings: Settings;
  setNumOneRange: (min: number, max: number) => void;
  setNumTwoRange: (min: number, max: number) => void;
  setNumOfAttempts: (numOfAttempts: number) => void;
  setNumOfQuestions: (numOfQuestions: number) => void;
  setSettings: (settings: Settings) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    ...initialState,
  },
  setSettings: (settings: Settings) => set(() => ({ settings })),
  setNumOneRange: (min: number, max: number) => set((state) => ({ settings: { ...state.settings, numOneRange: { min, max } } })),
  setNumTwoRange: (min: number, max: number) => set((state) => ({ settings: { ...state.settings, numTwoRange: { min, max } } })),
  setNumOfAttempts: (numOfAttempts: number) => set((state) => ({ settings: { ...state.settings, numOfAttempts } })),
  setNumOfQuestions: (numOfQuestions: number) => set((state) => ({ settings: { ...state.settings, numOfQuestions } })),
}));

export default useSettingsStore;
