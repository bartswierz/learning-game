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

export type Route =
  | "/addition"
  | "/subtraction"
  | "/multiplication"
  | "/division"
  | "/take-home-worksheets"
  | "/analog-clock"
  | "/alphabetical-order"
  | "";

export interface ProblemDetails {
  numberOneMinimum: string;
  numberOneMaximum: string;
  numberTwoMinimum: string;
  numberTwoMaximum: string;
  problemType: OperationType;
}

// Problem Tiers - Analog Clock
export const EASY = "EASY";
export const MEDIUM = "MEDIUM";
export const HARD = "HARD";
export type Tier = typeof EASY | typeof MEDIUM | typeof HARD | "";
