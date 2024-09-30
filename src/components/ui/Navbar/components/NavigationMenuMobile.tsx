import { Link } from "react-router-dom";
import LearningAppSVG from "/LearningAppIcon.svg";
import { IoMdClose } from "react-icons/io";
import LanguageCombobox from "./LanguageCombobox";
import { useTranslation } from "react-i18next";

interface MobileNavigationMenuProps {
  isOpen: boolean;
  openMenu?: () => void;
  closeMenu: () => void;
}

const NavigationMenuMobile = ({ isOpen, closeMenu }: MobileNavigationMenuProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed md:hidden z-[10] inset-0 bg-black/90 bg-opacity-75 transition-all duration-300 bg-gradient-to-r from-blue-700/80 to-transparent shadow-2xl">
      <div className="h-full bg-gray-900 transition-all transform duration-300 ease-in-out">
        <div className="p-4">
          <h1 className="flex items-center gap-2 text-xl text-white mb-4">
            <img src={LearningAppSVG} alt="Problem Solvers Logo" className="w-12 h-12" />
            Problem Solvers
          </h1>

          <MenuCloseButton closeMenu={closeMenu} />
          <ul className="flex flex-col items-center justify-center gap-y-5 mt-6">
            {mobileLinkInfo.map(({ route, text, className }) => (
              <li className="flex max-w-[296px] w-full text-center" key={route}>
                <Link
                  to={`${route}`}
                  className={`px-4 py-2 rounded-md border-[3px] cursor-pointer shadow-xl transition-color duration-200 ease-in w-full ${className}`}
                  onClick={closeMenu}
                >
                  {t(text)}
                </Link>
              </li>
            ))}
            <li key="language_combobox" className="flex max-w-[296px] w-full text-center">
              <LanguageCombobox />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenuMobile;

const mobileLinkInfo = [
  { route: "/", text: "Home", className: "bg-white hover:bg-white/90 text-black" },
  { route: "/addition", text: "Addition Problems", className: "bg-green-500 hover:bg-green-600" },
  { route: "/subtraction", text: "Subtraction Problems", className: "bg-red-500 hover:bg-red-600" },
  { route: "/multiplication", text: "Multiplication Problems", className: "bg-blue-500 hover:bg-blue-600" },
  { route: "/division", text: "Division Problems", className: "bg-yellow-500 hover:bg-yellow-600" },
  {
    route: "/alphabetical-order",
    text: "Alphabetical Order",
    className: "bg-indigo-500 hover:bg-indigo-600",
  },
  { route: "/analog-clock", text: "Time Problems", className: "bg-cyan-500 hover:bg-cyan-600" },
  { route: "/take-home-worksheets", text: "Take Home Worksheets", className: "bg-teal-500 hover:bg-teal-600" },
];

export const MenuCloseButton = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <button onClick={closeMenu} className="absolute top-0 right-0 m-4 text-white">
      <IoMdClose size={36} />
    </button>
  );
};