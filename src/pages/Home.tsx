import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdAdd } from "react-icons/md";
import { FaDivide } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { PiClockClockwiseFill } from "react-icons/pi";
import Heading from "@/components/ui/Layout/Heading";
import { TTS_DATA } from "@/constants/constants";
import useTTSStore from "@/store/tts_store";

export default function HomePage() {
  const { t } = useTranslation();

  const ttsLanguage = useTTSStore((state) => state.language);
  const { HOME } = TTS_DATA;
  const tts_description: string = HOME.description[ttsLanguage];

  return (
    <div className="container pb-12 mt-[56px]">
      <Heading text={tts_description} voiceText={tts_description} className="text-3xl font-bold mb-6" language={ttsLanguage} />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homepageLinks.map(({ link, title, listItemStyle }) => {
          return (
            <li
              key={link}
              className={`relative group flex items-center justify-center h-[20vh] md:h-[30vh] min-h-[100px] transition-all duration-200 hover:border-[12px] hover:border-white ${listItemStyle}`}
            >
              <LogoPlacement title={title} />
              <Link
                to={link}
                className="flex justify-center items-center w-full h-full font-bold text-2xl transition-all duration-300 shadow-2xl"
                data-tooltip-target="tooltip-default"
              >
                {t(title)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type homepageLinksType = {
  title: string;
  link: "/addition" | "/subtraction" | "/multiplication" | "/division" | "/alphabetical-order" | "/analog-clock";
  listItemStyle: string;
}[];

const homepageLinks: homepageLinksType = [
  {
    link: "/addition",
    title: "Addition",
    listItemStyle: "bg-green-500 hover:bg-green-600 focus:bg-red-500 rounded-tl-[50px] rounded-br-[50px]",
  },
  {
    link: "/subtraction",
    title: "Subtraction",
    listItemStyle: "bg-red-500 hover:bg-red-600 rounded-tr-[50px] rounded-bl-[50px]",
  },
  {
    link: "/multiplication",
    title: "Multiplication",
    listItemStyle: "bg-blue-500 hover:bg-blue-600 rounded-bl-[50px] rounded-tr-[50px]",
  },
  {
    link: "/division",
    title: "Division",
    listItemStyle: "bg-yellow-500 hover:bg-yellow-600 rounded-br-[50px] rounded-tl-[50px]",
  },
  {
    link: "/alphabetical-order",
    title: "Alphabet",
    listItemStyle: "bg-indigo-500 hover:bg-indigo-600 rounded-tl-[50px] rounded-br-[50px]",
  },
  {
    link: "/analog-clock",
    title: "Time",
    listItemStyle: "bg-cyan-500 hover:bg-cyan-600 rounded-tr-[50px] rounded-bl-[50px]",
  },
];

interface LinkLogosProps {
  title: string;
  size: number;
}

const LinkLogos = ({ title, size = 64 }: LinkLogosProps) => {
  switch (title) {
    case "Addition":
      return (
        <>
          <MdAdd className="absolute bottom-5 left-5" size={size} />
          <MdAdd className="absolute top-5 right-5" size={size} />
        </>
      );
    case "Subtraction":
      return (
        <>
          <GrSubtract className="absolute top-5 left-5" size={size} />
          <GrSubtract className="absolute bottom-5 right-5" size={size} />
        </>
      );
    case "Multiplication":
      return (
        <>
          <IoMdClose className="absolute top-5 left-5" size={size} />
          <IoMdClose className="absolute bottom-5 right-5" size={size} />
        </>
      );
    case "Division":
      return (
        <>
          <FaDivide className="absolute bottom-5 left-5" size={size} />
          <FaDivide className="absolute top-5 right-5" size={size} />
        </>
      );
    case "Alphabet":
      return (
        <>
          <TiSortAlphabeticallyOutline className="absolute bottom-5 left-5" size={size} />
          <TiSortAlphabeticallyOutline className="absolute top-5 right-5" size={size} />
        </>
      );
    case "Time":
      return (
        <>
          <PiClockClockwiseFill className="absolute top-5 left-5" size={size} />
          <PiClockClockwiseFill className="absolute bottom-5 right-5" size={size} />
        </>
      );
    default:
      return null;
  }
};

// Adjusts the size of the logos based on the screen size
const LogoPlacement = ({ title }: { title: string }) => {
  return (
    <>
      <div className="hidden sm:block">
        <LinkLogos title={title} size={48} />
      </div>
      <div className="block sm:hidden">
        <LinkLogos title={title} size={32} />
      </div>
    </>
  );
};
