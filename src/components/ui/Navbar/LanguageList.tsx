// import { ReactComponent as EnglishFlagSvg } from "../../../assets/EnglishFlag.svg";
import EnglishFlagSvg from "../../../assets/EnglishFlag";
import { useTranslation } from "react-i18next";

const languageList = [
  { id: "en", language: "English" },
  { id: "es", language: "Spanish" },
  { id: "pl", language: "Polish" },
  { id: "fr", language: "French" },
  { id: "de", language: "German" },
];

const LanguageList = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (languageId: string) => {
    console.log("switching language to: ", languageId);
    i18n.changeLanguage(languageId);
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
