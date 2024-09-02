import { useTranslation } from "react-i18next";
import useTTSStore from "@/store/tts_store";
import { US, PL, MX, DE, FR } from "country-flag-icons/react/3x2";
import { LanguageType } from "@/types/types";

const flagStyle = "w-[33px] h-[22px]";

type LanguageListType = {
  id: LanguageType;
  language: string;
  flag: JSX.Element;
};

const languageList: LanguageListType[] = [
  { id: "en-US", language: "English", flag: <US className={flagStyle} /> },
  { id: "es-ES", language: "Spanish", flag: <MX className={flagStyle} /> },
  { id: "pl-PL", language: "Polish", flag: <PL className={flagStyle} /> },
  { id: "fr-FR", language: "French", flag: <FR className={flagStyle} /> },
  { id: "de-DE", language: "German", flag: <DE className={flagStyle} /> },
];

const LanguageList = () => {
  const { i18n } = useTranslation();
  const setLanguage = useTTSStore((state) => state.setLanguage);
  const activeLanguage = useTTSStore((state) => state.language);

  const switchLanguage = (languageId: LanguageType) => {
    i18n.changeLanguage(languageId);
    setLanguage(languageId); // Update our TTS Store with the new language to match the correct TTS Voice
  };

  return (
    <>
      <ul className="flex flex-col p-4 gap-3 w-[200px]">
        {languageList.map(({ id, language, flag }) => (
          <li key={id}>
            <button
              onClick={() => switchLanguage(id)}
              className={`${
                activeLanguage === id ? "bg-blue-500 text-white" : "bg-slate-300"
              } px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-md cursor-pointer flex align-items w-full gap-2`}
            >
              {flag}
              {language}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LanguageList;
