import { TTSDataType } from "../types/types";

// Text-To-Speech data object for each operation / page
export const TTS_DATA: TTSDataType = {
  operations: {
    ADDITION: {
      description: {
        "en-US": "Use the calculator to add the two numbers together",
        "es-ES": "Use la calculadora para sumar los dos números",
        "pl-PL": "Użyj kalkulatora, aby dodać do siebie dwie liczby",
        "de-DE": "Verwenden Sie den Taschenrechner, um die beiden Zahlen zusammenzuzählen",
        "fr-FR": "Utilisez la calculatrice pour ajouter les deux nombres ensemble",
      },
    },
    SUBTRACTION: {
      description: {
        "en-US": "Use the calculator to subtract the two numbers",
        "es-ES": "Use la calculadora para restar los dos números",
        "pl-PL": "Użyj kalkulatora, aby odjąć od siebie dwie liczby",
        "de-DE": "Verwenden Sie den Taschenrechner, um die beiden Zahlen voneinander abzuziehen",
        "fr-FR": "Utilisez la calculatrice pour soustraire les deux nombres",
      },
    },
    MULTIPLICATION: {
      description: {
        "en-US": "Use the calculator to multiply the two numbers",
        "es-ES": "Use la calculadora para multiplicar los dos números",
        "pl-PL": "Użyj kalkulatora, aby pomnożyć dwie liczby",
        "de-DE": "Verwenden Sie den Taschenrechner, um die beiden Zahlen zu multiplizieren",
        "fr-FR": "Utilisez la calculatrice pour multiplier les deux nombres",
      },
    },
    DIVISION: {
      description: {
        "en-US": "Use the calculator to divide the two numbers",
        "es-ES": "Use la calculadora para dividir los dos números",
        "pl-PL": "Użyj kalkulatora, aby podzielić dwie liczby",
        "de-DE": "Verwenden Sie den Taschenrechner, um die beiden Zahlen zu dividieren",
        "fr-FR": "Utilisez la calculatrice pour diviser les deux nombres",
      },
    },
  },
  CLOCK: {
    description: {
      "en-US": "Pick a level and match the correct time from the options",
      "es-ES": "Elige un nivel y empareja la hora correcta de las opciones",
      "pl-PL": "Wybierz poziom i dopasuj prawidłowy czas z opcji",
      "de-DE": "Wählen Sie ein Level und passen Sie die richtige Zeit aus den Optionen an",
      "fr-FR": "Choisissez un niveau et associez l'heure correcte parmi les options",
    },
  },
  TAKE_HOME_WORKSHEETS: {
    description: {
      "en-US": "Generate PDF worksheets for practice. Contains 45 Problems. You can select the range of numbers for each problem",
      "es-ES":
        "Genera hojas de trabajo en PDF para practicar. Contiene 45 problemas. Puede seleccionar el rango de números para cada problema",
      "pl-PL": "Generuj arkusze ćwiczeń w formacie PDF. Zawiera 45 problemów. Możesz wybrać zakres liczb dla każdego problemu",
      "de-DE":
        "Generieren Sie PDF-Arbeitsblätter zum Üben. Enthält 45 Probleme. Sie können den Zahlenbereich für jedes Problem auswählen",
      "fr-FR":
        "Générer des feuilles de travail PDF pour la pratique. Contient 45 problèmes. Vous pouvez sélectionner la plage de nombres pour chaque problème",
    },
  },
  ALPHABETICAL_ORDER: {
    description: {
      "en-US": "Drag and drop the words into the correct order",
      "es-ES": "Arrastra y suelta las palabras en el orden correcto",
      "pl-PL": "Przeciągnij i upuść słowa w odpowiedniej kolejności",
      "de-DE": "Ziehen Sie die Wörter in die richtige Reihenfolge",
      "fr-FR": "Faites glisser et déposez les mots dans le bon ordre",
    },
  },
};
