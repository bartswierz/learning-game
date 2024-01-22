export interface Settings {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
}

export interface Globals {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
  score: number;
  progress: "Success" | "InProgress" | "Failed" | null;
  isGameOver: boolean;
  userInput: string;
  numberOne: number;
  numberTwo: number;
}

export interface NumberMinMax {
  min: number;
  max: number;
}

// NumberPad.tsx
export interface ButtonInfo {
  value: string;
  reactIcon?: JSX.Element;
  className: string;
}

export interface CheckAnswer {
  numberOne: number;
  numberTwo: number;
  userInput: string;
  operationType: string;
}