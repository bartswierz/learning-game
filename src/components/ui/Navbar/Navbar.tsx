import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { currentRouteType } from "./NavigationMenu";
import LearningAppSVG from "/LearningAppIcon.svg";
import MobileNavigationMenu from "./MobileNavigationMenu";

import Settings from "../Settings/Settings";
import NavigationMenu from "./NavigationMenu";
import useSettingsStore from "@/store/store";

const Navbar = () => {
  const location = useLocation();
  const resetProgressOnRedirectToHome = useSettingsStore((state) => state.resetProgress);
  const [isOpen, setIsOpen] = useState(false);
  const isOnGameRoute = ["addition", "subtraction", "multiplication", "division"].some((operationsTypeRoute) =>
    location.pathname.includes(operationsTypeRoute)
  );

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="inset-x-0 z-[100] flex justify-between items-center p-2 bg-gradient-to-r from-blue-700/80 to-transparent shadow-2xl">
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

      {/* TODO - Refactor to only being DESKTOP */}
      <div className="flex gap-2">
        {/* HIDDEN ON MOBILE SCREEN */}
        <div className="hidden xsm:blockx md:block gap-2">
          <NavigationMenu currentRoute={location.pathname as currentRouteType} />
        </div>
        <MenuOpenButton openMenu={openMenu} />
        {isOnGameRoute && <Settings />}
      </div>

      {/* OPENS WHEN USER CLICKS MENU BUTTON */}
      {/* {isOpen && <MobileNavigationMenu isOpen={isOpen} closeMenu={closeMenu} />} */}
      <MobileNavigationMenu isOpen={isOpen} closeMenu={closeMenu} />
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

export const MenuCloseButton = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <button onClick={closeMenu} className="absolute top-0 right-0 m-4 text-white">
      <IoMdClose size={36} />
    </button>
  );
};
