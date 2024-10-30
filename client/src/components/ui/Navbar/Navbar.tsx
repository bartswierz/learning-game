import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { currentRouteType } from "./components/NavigationLinksDesktop";
import LearningAppSVG from "/LearningAppIcon.svg";
import NavigationMenuMobile from "./components/NavigationMenuMobile";

import { useTheme } from "../../../contexts/ThemeContext.tsx";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.tsx";

import Settings from "../Settings/Settings";
import NavigationLinksDesktop from "./components/NavigationLinksDesktop";
import useSettingsStore from "@/store/store";

const Navbar = () => {
  const location = useLocation();
  const resetProgressOnRedirectToHome = useSettingsStore((state) => state.resetProgress);
  const [isOpen, setIsOpen] = useState(false);
  const isOnGameRoute = ["addition", "subtraction", "multiplication", "division"].some((operationsTypeRoute) =>
    location.pathname.includes(operationsTypeRoute)
  );

  const { theme } = useTheme();
  const gradientTheme = `bg-gradient-to-r from-${theme}-primary/80`;

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={`inset-x-0 z-[100] flex justify-between items-center p-2 shadow-2xl ${gradientTheme}`}>
      <div className="self-center">
        <Link
          to="/"
          onClick={() => {
            resetProgressOnRedirectToHome();
          }}
          className="flex gap-2 items-center text-lg"
        >
          <img src={LearningAppSVG} alt="Problem Solvers Logo" className="w-12 h-12" />
          Problem Solvers
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <NavigationLinksDesktop currentRoute={location.pathname as currentRouteType} />
        <MenuOpenButton openMenu={openMenu} />
        {isOnGameRoute && <Settings />}
        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>
      </div>

      {/* OPENS WHEN USER CLICKS MENU BUTTON */}
      <div className="fixed md:hidden z-[10] inset-0x top-0 left-0 right-0 scroll-auto">
        <NavigationMenuMobile isOpen={isOpen} closeMenu={closeMenu} />
      </div>
    </nav>
  );
};

export default Navbar;

export const MenuOpenButton = ({ openMenu }: { openMenu: () => void }) => {
  return (
    <button onClick={openMenu} className="md:hidden cursor-pointer align-middle">
      <GiHamburgerMenu size={36} />
    </button>
  );
};
