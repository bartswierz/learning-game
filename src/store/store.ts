import { create } from "zustand";

interface Settings {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
}

type State = {
  settings: Settings;
  score: number;
  numberOne: number;
  numberTwo: number;
  attemptsLeft: number;
  userInput: string;
  progress: "Success" | "InProgress" | "Failed" | null;
  isGameOver: boolean;
  questionNumber: number;
};

type Action = {
  setSettings: (settings: Settings) => void;
  incrementScore: () => void;
  updateUserInput: (userInput: string) => void;
  updateForCorrectAnswer: (newNumOne: number, newNumTwo: number) => void;
  updateForIncorrectAnswer: () => void;
  updateForMoreAttempts: (newNumOne: number, newNumTwo: number) => void;
  updateIsGameOver: (isGameOver: boolean) => void;
  updateNewNumbers: (newNumberOne: number, newNumberTwo: number) => void;
  restartGame: (newNumberOne: number, newNumberTwo: number) => void;
  resetProgress: () => void;
};

const initialState: State = {
  settings: {
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  },
  attemptsLeft: 3,
  numberOne: 0,
  numberTwo: 0,
  score: 0,
  questionNumber: 1,
  userInput: "",
  progress: null,
  isGameOver: false,
};

// const useSettingsStore = create<SettingsStore>((set) => ({
const useSettingsStore = create<State & Action>((set) => ({
  ...initialState,
  setSettings: (settings: Settings) => set(() => ({ settings })),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  updateNewNumbers: (newNumberOne: number, newNumberTwo: number) => set(() => ({ numberOne: newNumberOne, numberTwo: newNumberTwo })),
  updateUserInput: (userInputValue: string) => set(() => ({ userInput: userInputValue })),
  // APPEND USER INPUT TO THE END OF THE CURRENT USER INPUT
  updateIsGameOver: (isGameOver: boolean) => set(() => ({ isGameOver })),
  // UPDATE numberOne & numberTwo & Increase score by 1 & RESET USER INPUT FOR NEXT QUESTION
  updateForCorrectAnswer: (newNumOne, newNumTwo) =>
    set((state) => ({
      numberOne: newNumOne,
      numberTwo: newNumTwo,
      attemptsLeft: state.settings.numOfAttempts,
      score: state.score + 1,
      userInput: "",
      questionNumber: state.questionNumber + 1,
    })),
  // DECREASE ATTEMPTS BY 1 & RESET USER INPUT FOR NEXT QUESTION
  updateForIncorrectAnswer: () => set((state) => ({ attemptsLeft: state.attemptsLeft - 1, userInput: "" })),
  // USER HAS MORE QUESTIONS TO ANSWER, REPLENISH ATTEMPTS & RESET USER INPUT FOR NEXT QUESTION
  updateForMoreAttempts: (newNumOne, newNumTwo) =>
    set((state) => ({
      numberOne: newNumOne,
      numberTwo: newNumTwo,
      attemptsLeft: state.settings.numOfAttempts,
      userInput: "",
      questionNumber: state.questionNumber + 1,
    })),
  // RESET THE NECESSARY STATE VALUES FOR A NEW GAME
  restartGame: (newNumberOne: number, newNumberTwo: number) => {
    set((state) => ({
      numberOne: newNumberOne,
      numberTwo: newNumberTwo,
      userInput: "",
      attemptsLeft: state.settings.numOfAttempts,
      isGameOver: false,
      score: 0,
      questionNumber: 1,
    }));
  },
  resetProgress: () => {
    set(() => ({ score: 0, questionNumber: 1, attemptsLeft: 3, isGameOver: false, userInput: "" }));
    console.log("RESET PROGRESS CALLED");
  },
}));

export default useSettingsStore;
