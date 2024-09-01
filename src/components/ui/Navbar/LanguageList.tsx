import { useTranslation } from "react-i18next";
import useTTSStore from "@/store/tts_store";

const languageList = [
  { id: "en-US", language: "English" },
  { id: "es-ES", language: "Spanish" },
  { id: "pl-PL", language: "Polish" },
  { id: "fr-FR", language: "French" },
  { id: "de-DE", language: "German" },
];

const LanguageList = () => {
  const { i18n } = useTranslation();
  const setLanguage = useTTSStore((state) => state.setLanguage);

  const switchLanguage = (languageId: string) => {
    console.log("switching language to: ", languageId);
    i18n.changeLanguage(languageId);
    setLanguage(languageId); // Update our TTS Store with the new language to match the correct TTS Voice
  };

  return (
    <>
      <ul className="flex flex-col p-4 gap-3 w-[200px]">
        {languageList.map(({ id, language }) => (
          <li
            className="bg-slate-300 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-md px-4 py-2 cursor-pointer flex align-items"
            key={id}
          >
            <button onClick={() => switchLanguage(id)}>
              {/* TODO - add country flags to the button */}
              {/* <span className="self-center">
                <EnglishFlagSvg />
              </span> */}
              {language}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LanguageList;
