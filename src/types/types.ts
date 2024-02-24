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
  min: number | string;
  max: number | string;
}

// NumberPad.tsx
export interface ButtonInfo {
  value: string;
  reactIcon?: JSX.Element;
  className: string;
}

export type OperationType = "ADDITION" | "SUBTRACTION" | "MULTIPLICATION" | "DIVISION";

export interface CheckAnswer {
  numberOne: number;
  numberTwo: number;
  userInput: string;
  operationType: OperationType;
}

export type Route = "/addition" | "/subtraction" | "/multiplication" | "/division" | "/take-home-worksheets" | "";
