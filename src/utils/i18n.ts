import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Choose a practice problem": "Choose a practice problem",
      Addition: "Addition",
      Subtraction: "Subtraction",
      Multiplication: "Multiplication",
      Division: "Division",
      "Take Home Worksheets": "Take Home Worksheets",
      "Generate PDF worksheets for practice (45 Problems)": "Generate PDF worksheets for practice (45 Problems)",
      "Check Answer": "Check Answer",
      ADDITION: "ADDITION",
      SUBTRACTION: "SUBTRACTION",
      MULTIPLICATION: "MULTIPLICATION",
      DIVISION: "DIVISION",
      Question: "Question",
      Score: "Score",
      "Attempts Left": "Attempts Left",
      "This will reset progress": "This will reset progress",
      "Are you sure?": "Are you sure?",
      No: "No",
      Yes: "Yes",
      "Generate Take Home Problems": "Generate Take Home Problems",
      "Take Home Problems": "Take Home Problems",
      "Generate Worksheet": "Generate Worksheet",
      "Number One Ranges (1-50)": "Number One Ranges (1-50)",
      "Number Two Ranges (1-50)": "Number Two Ranges (1-50)",
      "Minimum Value:": "Minimum Value:",
      "Maximum Value:": "Maximum Value:",
      "Enter a minimum value": "Enter a minimum value",
      "Enter a maximum value": "Enter a maximum value",
      "Problem Type:": "Problem Type:",
      "Select Problem Type": "Select Problem Type",
      "View PDF": "View PDF",
      Extras: "Extras",
      Languages: "Languages",
    },
  },
  es: {
    translation: {
      "Choose a practice problem": "Elige un problema de práctica",
      Addition: "Suma",
      Subtraction: "Resta",
      Multiplication: "Multiplicación",
      Division: "División",
      "Take Home Worksheets": "Llevar hojas de trabajo a casa",
      "Generate PDF worksheets for practice (45 Problems)": "Generar hojas de trabajo en PDF para practicar (45 problemas)",
      "Check Answer": "Comprobar respuesta",
      ADDITION: "SUMA",
      SUBTRACTION: "RESTA",
      MULTIPLICATION: "MULTIPLICACIÓN",
      DIVISION: "DIVISIÓN",
      Question: "Pregunta",
      Score: "Puntuación",
      "Attempts Left": "Intentos restantes",
      "This will reset progress": "Esto restablecerá el progreso",
      "Are you sure?": "¿Estás seguro?",
      No: "No",
      Yes: "Sí",
      "Generate Take Home Problems": "Generar problemas para llevar a casa",
      "Take Home Problems": "Problemas para llevar a casa",
      "Generate Worksheet": "Generar hoja de trabajo",
      "Number One Ranges (1-50)": "Rangos de número uno (1-50)",
      "Number Two Ranges (1-50)": "Rangos de número dos (1-50)",
      "Minimum Value:": "Valor mínimo:",
      "Maximum Value:": "Valor máximo:",
      "Enter a minimum value": "Introduzca un valor mínimo",
      "Enter a maximum value": "Introduzca un valor máximo",
      "Problem Type:": "Tipo de problema:",
      "Select Problem Type": "Seleccionar tipo de problema",
      "View PDF": "Ver PDF",
      Extras: "Extras",
      Languages: "Idiomas",
    },
  },
  pl: {
    translation: {
      "Choose a practice problem": "Wybierz problem do ćwiczeń",
      Addition: "Dodawanie",
      Subtraction: "Odejmowanie",
      Multiplication: "Mnożenie",
      Division: "Dzielenie",
      "Take Home Worksheets": "Zabierz arkusze do domu",
      "Generate PDF worksheets for practice (45 Problems)": "Wygeneruj arkusze PDF do ćwiczeń (45 zadań)",
      "Check Answer": "Sprawdź odpowiedź",
      ADDITION: "DODAWANIE",
      SUBTRACTION: "ODEJMOWANIE",
      MULTIPLICATION: "MNOŻENIE",
      DIVISION: "DZIELENIE",
      Question: "Pytanie",
      Score: "Wynik",
      "Attempts Left": "Pozostałe próby",
      "This will reset progress": "To zresetuje postęp",
      "Are you sure?": "Jesteś pewny?",
      No: "Nie",
      Yes: "Tak",
      "Generate Take Home Problems": "Generuj problemy do zabrania do domu",
      "Take Home Problems": "Problemy do zabrania do domu",
      "Generate Worksheet": "Generuj arkusz",
      "Number One Ranges (1-50)": "Zakresy liczby jeden (1-50)",
      "Number Two Ranges (1-50)": "Zakresy liczby dwa (1-50)",
      "Minimum Value:": "Minimalna wartość:",
      "Maximum Value:": "Maksymalna wartość:",
      "Enter a minimum value": "Wprowadź minimalną wartość",
      "Enter a maximum value": "Wprowadź maksymalną wartość",
      "Problem Type:": "Typ problemu:",
      "Select Problem Type": "Wybierz typ problemu",
      "View PDF": "Zobacz PDF",
      Extras: "Dodatki",
      Languages: "Języki",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
