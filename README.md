# Problem Solvers

Problem Solvers is a learning game and a useful resource application that helps not only **Students**, but also **Teachers**, and **Parents** enrich their children's education. This application has received the opportunity in the near future to be utilized by a second grade class, so future features are in the works! While we plan to build an MVP first, we will spare no expense on making it a great tool! Enjoy!

## Technologies Used

The website is primarily built using:

- React.js
- TypeScript
- Tailwind CSS (CSS Framework)
- Zustand (State Management Library)
- Shadcn/ui (Unstyled Re-usable Components)
- Vitest (Unit Testing & Integration Testing)

## Features

This application contains the following features(and many more to come in the future!):

- **Addition Problems**: Addition problems that are customizable to by utilizing the Settings Component in the Navigation Menu. Values 1-50 can be set for both numbers catered to your student's/child's learning.
- **Subtraction Problems**: Subtraction problems that are customizable to by utilizing the Settings Component in the Navigation Menu. Values 1-50 can be set for both numbers catered to your student's/child's learning.
- **Multiplication Problems**: Multiplication problems that are customizable to by utilizing the Settings Component in the Navigation Menu. Values 1-50 can be set for both numbers catered to your student's/child's learning.
- **Division Problems**: Division problems that are customizable to by utilizing the Settings Component in the Navigation Menu. Values 1-50 can be set for both numbers catered to your student's/child's learning.
- **Settings**: Useful tool to customize both values for your randomized problems, slider components are used to make the user experience (UX) enjoyable.
- **PDF Worksheet Generator**: Create a customizable worksheet containing 48 problems with the ability to customize both value ranges to your needs in UNDER 10 SECONDS. Built with React-pdf, the user is free to print the worksheet directly or download it, no sign in required.

  ## Future Features

- **Telling Time(Analog Clock)** - This feature introduces an engaging and interactive way for students to learn how to tell time using an analog clock within our web application. With this feature, students can visually grasp the concepts of hours, minutes, and seconds hands, aiding their understanding of time notation and its practical application.
- **Word Problems** - An exciting feature designed to enhance students' mathematical problem-solving skills within our web application. With a diverse array of numerical challenges, students will engage in fun and stimulating scenarios, such as calculating quantities, solving equations, and deciphering mathematical riddles.

## Internal Documentation
TTS(Text-to-Speech) Implementation
Text for the five current languages has been placed within the constants directory for the operation pages, take home worksheets page, and the alphabetical order page.
- Created a custom Text to Speech component from scratch using the MDN Web Docs for, "SpeechSynthesisUtterance()" method. The TextToSpeech component takes in a text prop and language prop that allows us to dynamically set text and voice language depending on which language the user has set. The default is English("en-US").

- Using Zustand Store -> useTTSStore that contains language and setLanguage state which is updated upon the user changing the language in the navigation. See LanguageList component
- We import in the constant Text to speech data object for the operations and pass that down into header.
- Within, the Header component we retrieve the set language from out store and pass it into the TextToSpeech component by matching the objects key value via tts -> passed from Problems.tsx to Header.tsx and ttsLanguage -> the value retrieve from the store = (ex. tts[ttsLanguage] = "en-US")
  - const ttsLanguage: LanguageType = useTTSStore((state) => state.language); // Header.tsx - Line 19
    - LanguageType = "en-US" | "es" | "pl" | "de" | "fr"; // types.ts - Line 79
  - TextToSpeech text={tts[ttsLanguage]} language={ttsLanguage} // Header.tsx - Line 29
