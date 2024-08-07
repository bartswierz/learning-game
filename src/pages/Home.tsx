import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdAdd } from "react-icons/md";
import { FaDivide } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { GrSubtract } from "react-icons/gr";

type homepageLinksType = {
  link: "Addition" | "Subtraction" | "Multiplication" | "Division";
  listItemStyle: string;
  linkStyle: string;
}[];

interface LinkLogoPositionProps {
  link: "Addition" | "Subtraction" | "Multiplication" | "Division";
}

const LinkLogoPosition = ({ link }: LinkLogoPositionProps) => {
  switch (link) {
    case "Addition":
      return (
        <>
          <MdAdd className="absolute bottom-5 left-5" size={64} />
          <MdAdd className="absolute top-5 right-5" size={64} />
        </>
      );
    case "Subtraction":
      return (
        <>
          <GrSubtract className="absolute top-5 left-5" size={64} />
          <GrSubtract className="absolute bottom-5 right-5" size={64} />
        </>
      );
    case "Multiplication":
      return (
        <>
          <IoMdClose className="absolute top-5 left-5" size={64} />
          <IoMdClose className="absolute bottom-5 right-5" size={64} />
        </>
      );
    case "Division":
      return (
        <>
          <FaDivide className="absolute bottom-5 left-5" size={64} />
          <FaDivide className="absolute top-5 right-5" size={64} />
        </>
      );
    default:
      return null;
  }
};

export default function Home() {
  const { t } = useTranslation();

  const homepageLinks: homepageLinksType = [
    {
      link: "Addition",
      listItemStyle: "bg-green-500 hover:bg-green-600 focus:bg-red-500 rounded-tl-[50px] rounded-br-[50px]",
      linkStyle: "rounded-tl-[50px] rounded-br-[50px]",
    },
    {
      link: "Subtraction",
      listItemStyle: "bg-red-500 hover:bg-red-600 rounded-tr-[50px] rounded-bl-[50px]",
      linkStyle: "rounded-tr-[50px] rounded-bl-[50px]",
    },
    {
      link: "Multiplication",
      listItemStyle: "bg-blue-500 hover:bg-blue-600 rounded-bl-[50px] rounded-tr-[50px]",
      linkStyle: "rounded-bl-[50px] rounded-tr-[50px]",
    },
    {
      link: "Division",
      listItemStyle: "bg-yellow-500 hover:bg-yellow-600 rounded-br-[50px] rounded-tl-[50px]",
      linkStyle: "rounded-br-[50px] rounded-tl-[50px]",
    },
  ];

  return (
    <div className="container mt-8x pb-12 mt-[56px]">
      <h1 className="text-3xl font-bold text-center mb-6">{t("Choose a practice problem")}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homepageLinks.map(({ link, listItemStyle, linkStyle }) => {
          return (
            <li
              key={link}
              className={`relative group flex items-center justify-center h-fullX h-[20vh] md:h-[30vh] min-h-[100px] transition-all duration-200 ${listItemStyle} hover:border-[12px] hover:border-white`}
            >
              <LinkLogoPosition link={link} />
              <Link
                to={`/${link.toLowerCase()}`}
                className={`flex justify-center items-center w-full h-full font-bold text-2xl transition-all duration-300 shadow-2xl ${linkStyle}`}
                data-tooltip-target="tooltip-default"
              >
                {/* {link} */}
                {t(link)}
              </Link>
              <div></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
