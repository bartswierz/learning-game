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
