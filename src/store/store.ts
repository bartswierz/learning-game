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

const useSettingsStore = create((set) => ({
  settings: {
    numOneRange: { min: 1, max: 100 },
    numTwoRange: { min: 1, max: 100 },
    numOfQuestions: 5,
    numOfAttempts: 3,
  },
  setNumOneRange: (min: number, max: number) => set({ numOneRange: { min, max } }),
  setNumTwoRange: (min: number, max: number) => set({ numTwoRange: { min, max } }),
  setNumOfAttempts: (numOfAttempts: number) => set({ numOfAttempts }),
  setNumOfQuestions: (numOfQuestions: number) => set({ numOfQuestions }),
}));

export default useSettingsStore;
