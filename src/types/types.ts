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

// Will be used for general size of components
export const SMALL = "SMALL";
export const MEDIUM = "MEDIUM";
export const LARGE = "LARGE";

// Used for the AnalogClock component and future components that have a tier choice for difficulty
export const EASY = "EASY";
export const HARD = "HARD";
export type DifficultyTierType = typeof EASY | typeof MEDIUM | typeof HARD | null;

// Used for the TextToSpeech component
export type DescriptionType = {
  "en-US": string;
  es: string;
  pl: string;
  de: string;
  fr: string;
};

export type LanguageType = "en-US" | "es-ES" | "pl-PL" | "de-DE" | "fr-FR";

export type TTSDataType = {
  operations: {
    ADDITION: {
      description: DescriptionType;
    };
    SUBTRACTION: {
      description: DescriptionType;
    };
    MULTIPLICATION: {
      description: DescriptionType;
    };
    DIVISION: {
      description: DescriptionType;
    };
  };
  CLOCK: {
    description: DescriptionType;
  };
  TAKE_HOME_WORKSHEETS: {
    description: DescriptionType;
  };
  ALPHABETICAL_ORDER: {
    description: DescriptionType;
  };
};
