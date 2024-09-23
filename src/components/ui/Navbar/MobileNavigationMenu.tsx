import { Link } from "react-router-dom";
import { MenuCloseButton } from "./Navbar";
import LearningAppSVG from "/LearningAppIcon.svg";

interface MobileNavigationProps {
  isOpen: boolean;
  openMenu?: () => void;
  closeMenu: () => void;
}

// This is the Opened Mobile Navigation Menu
const MobileNavigationMenu = ({ isOpen, closeMenu }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed xsm:hiddenx md:hidden z-[10] inset-0 bg-black/90 bg-opacity-75 transition-all duration-300">
      <div className="h-full bg-gray-900 transition-all transform duration-300 ease-in-out">
        <div className="p-4">
          <h1 className="flex items-center gap-2 text-xl text-white mb-4">
            <img src={LearningAppSVG} alt="Problem Solvers Logo" className="w-12 h-12" />
            Problem Solvers
          </h1>
          {/* TODO - turn Menu Button into one component */}
          <MenuCloseButton closeMenu={closeMenu} />
          <ul className="flex flex-col items-center justify-center gap-y-5 mt-6">
            {mobileLinkInfo.map(({ route, text, className }) => (
              <li className="flex  max-w-[234px] w-full text-center">
                <Link
                  to={`${route}`}
                  className={`px-4 py-2 rounded-md border-[3px] cursor-pointer shadow-xl transition-color duration-200 ease-in w-full ${className}`}
                  onClick={closeMenu}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationMenu;

// LINKS FOR MOBILE NAVIGATION
const mobileLinkInfo = [
  { route: "/", text: "Home", className: "bg-white hover:bg-white/90 text-black" },
  { route: "/addition", text: "Addition Problems", className: "bg-green-500 hover:bg-green-600" },
  { route: "/subtraction", text: "Subtraction Problems", className: "bg-red-500 hover:bg-red-600" },
  { route: "/multiplication", text: "Multiplication Problems", className: "bg-blue-500 hover:bg-blue-600" },
  { route: "/division", text: "Division Problems", className: "bg-yellow-500 hover:bg-yellow-600" },
  { route: "/alphabetical-order", text: "Alphabetical Order", className: "bg-indigo-500 hover:bg-indigo-600" },
  { route: "/analog-clock", text: "Time Problems", className: "bg-cyan-500 hover:bg-cyan-600" },
  { route: "/take-home-worksheets", text: "Take Home Worksheets", className: "bg-teal-500 hover:bg-teal-600" },
];
