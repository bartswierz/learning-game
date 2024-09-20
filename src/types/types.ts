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
  progress: typeof SUCCESS | typeof IN_PROGRESS | typeof FAILED | null;
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

// Used for button variants but can be extended for other components too
export const PRIMARY = "PRIMARY";
export const SECONDARY = "SECONDARY";
export const DANGER = "DANGER";
export const ROUNDED = "ROUNDED";
export const OUTLINE = "OUTLINE";
export const DISABLED = "DISABLED";

// Used for the progress of the games - currently only used in the Problems component but can be extended to other components
export const SUCCESS = "SUCCESS";
export const IN_PROGRESS = "IN_PROGRESS";
export const INCOMPLETE = "INCOMPLETE";
export const FAILED = "FAILED";

// Used for the AnalogClock component and future components that have a tier choice for difficulty
export const EASY = "EASY";
export const HARD = "HARD";
export type DifficultyTierType = typeof EASY | typeof MEDIUM | typeof HARD | null;

// Used for the TextToSpeech component
export type DescriptionType = {
  "en-US": string;
  "es-ES": string;
  "pl-PL": string;
  "de-DE": string;
  "fr-FR": string;
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
