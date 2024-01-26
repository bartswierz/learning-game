import { create } from "zustand";

interface Settings {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
}

// Initialize our store with all the variables and functions we need
// const settings: Settings = {
// const initialState = {
//   settings: {
//     numOneRange: { min: 1, max: 10 },
//     numTwoRange: { min: 1, max: 10 },
//     numOfQuestions: 5,
//     numOfAttempts: 3,
//   },
//   score: 0,
// };
type State = {
  settings: Settings;
  score: number;
  numberOne: number;
  numberTwo: number;
  attemptsLeft: number;
  userInput: string;
  progress: "Success" | "InProgress" | "Failed" | null;
  isGameOver: boolean;
};

type Action = {
  setSettings: (settings: Settings) => void;
  incrementScore: (score: number) => void;
  updateUserInput: (userInput: string) => void;
  updateForCorrectAnswer: (newNumOne: number, newNumTwo: number) => void;
  updateForIncorrectAnswer: () => void;
  updateIsGameOver: (isGameOver: boolean) => void;
  // updateNumbers: (numberOne: number, numberTwo: number) => void;
};

const initialState: State = {
  settings: {
    numOneRange: { min: 1, max: 0 },
    numTwoRange: { min: 0, max: 0 },
    numOfAttempts: 1,
    numOfQuestions: 1,
  },
  score: 0,
  numberOne: 0,
  numberTwo: 0,
  userInput: "",
  progress: null,
  isGameOver: false,
};

// const initialState: Settings = {
//   numOneRange: { min: 1, max: 10 },
//   numTwoRange: { min: 1, max: 10 },
//   numOfQuestions: 5,
//   numOfAttempts: 3,
// };

// interface SettingsStore {
//   settings: Settings;
//   score: number;
//   // setNumOneRange: (min: number, max: number) => void;
//   // setNumTwoRange: (min: number, max: number) => void;
//   // setNumOfAttempts: (numOfAttempts: number) => void;
//   // setNumOfQuestions: (numOfQuestions: number) => void;
//   setSettings: (settings: Settings) => void;
// }

// const useSettingsStore = create<SettingsStore>((set) => ({
const useSettingsStore = create<State & Action>((set) => ({
  // ...initialState,
  settings: { numOneRange: { min: 1, max: 10 }, numTwoRange: { min: 1, max: 10 }, numOfAttempts: 3, numOfQuestions: 5 },
  attemptsLeft: 3,
  numberOne: 0,
  numberTwo: 0,
  score: 0,
  userInput: "",
  progress: null,
  isGameOver: false,
  setSettings: (settings: Settings) => set(() => ({ settings })),
  incrementScore: (score: number) => set(() => ({ score: score + 1 })),
  updateUserInput: (userInputValue: string) => set((state) => ({ userInput: state.userInput + userInputValue })),
  updateIsGameOver: (isGameOver: boolean) => set(() => ({ isGameOver })),
  // UPDATE numberOne & numberTwo & Increase score by 1 & RESET USER INPUT FOR NEXT QUESTION
  updateForCorrectAnswer: (newNumOne, newNumTwo) =>
    set((state) => ({
      numberOne: newNumOne,
      numberTwo: newNumTwo,
      attemptsLeft: state.settings.numOfAttempts,
      score: state.score + 1,
      userInput: "",
    })),
  // DECREASE ATTEMPTS BY 1 & RESET USER INPUT FOR NEXT QUESTION
  updateForIncorrectAnswer: () => set((state) => ({ numOfAttempts: state.settings.numOfAttempts - 1, userInput: "" })),
}));

export default useSettingsStore;
