import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { currentRouteType } from "./components/NavigationLinksDesktop";
import LearningAppSVG from "/LearningAppIcon.svg";
import NavigationMenuMobile from "./components/NavigationMenuMobile";

// THEME - ~14 Color Options
import { useTheme } from "@/contexts/ThemeContext";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

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

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const backgroundTheme = `bg-${theme}-primary`;
  console.log("backgroundTheme", backgroundTheme);
  return (
    // <nav className="inset-x-0 z-[100] flex justify-between items-center p-2 bg-gradient-to-r from-blue-700/80 to-transparent shadow-2xl">
    <nav
      className={`inset-x-0 z-[100] flex justify-between items-center p-2 bg-gradient-to-r from-${theme}-700/80 to-transparent shadow-2xl bg-${theme}-primary ${backgroundTheme}x`}
    >
      <ThemeSwitcher />
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

      <div className="flex gap-2">
        <NavigationLinksDesktop currentRoute={location.pathname as currentRouteType} />
        <MenuOpenButton openMenu={openMenu} />
        {isOnGameRoute && <Settings />}
      </div>

      {/* OPENS WHEN USER CLICKS MENU BUTTON */}
      <NavigationMenuMobile isOpen={isOpen} closeMenu={closeMenu} />
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
