import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { currentRouteType } from "./NavigationMenu";

import Settings from "../Settings/Settings";
import NavigationMenu from "./NavigationMenu";
import useSettingsStore from "@/store/store";

const Navbar = () => {
  const location = useLocation();
  const resetProgressOnRedirectToHome = useSettingsStore((state) => state.resetProgress);
  const [isOpen, setIsOpen] = useState(false);
  const isOnGameRoute =
    location.pathname.includes("addition") ||
    location.pathname.includes("subtraction") ||
    location.pathname.includes("multiplication") ||
    location.pathname.includes("division");

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const MenuOpenButton = () => {
    return (
      <button onClick={openMenu} className="xsm:hidden cursor-pointer align-middle">
        <GiHamburgerMenu size={36} />
      </button>
    );
  };

  const MenuCloseButton = () => {
    return (
      <button onClick={closeMenu} className="absolute top-0 right-0 m-4 text-white">
        <IoMdClose size={36} />
      </button>
    );
  };

  // INDIVIDUAL LINK
  const ListItemNavLink = ({
    route,
    text,
    className,
    closeMenu,
  }: {
    route: string;
    text: string;
    className: string;
    closeMenu?: () => void;
  }) => {
    return (
      <li>
        <Link
          to={`${route}`}
          className={`px-4 py-2 rounded-md border-[3px] cursor-pointer shadow-xl transition-color duration-200 ease-in ${className}`}
          onClick={closeMenu}
        >
          {text}
        </Link>
      </li>
    );
  };

  // Navbar links component
  const MobileNavLinks = () => {
    return (
      <ul className="flex items-center flex-col gap-12 mt-4 mb-6 text-base">
        <ListItemNavLink route="/" text="Home" className="bg-white hover:bg-white/90 text-black" closeMenu={closeMenu} />
        <ListItemNavLink
          route="/addition"
          text="Addition Problems"
          className="bg-green-500 hover:bg-green-600"
          closeMenu={closeMenu}
        />
        <ListItemNavLink
          route="/subtraction"
          text="Subtraction Problems"
          className="bg-red-500 hover:bg-red-600"
          closeMenu={closeMenu}
        />
        <ListItemNavLink
          route="/multiplication"
          text="Multiplication Problems"
          className="bg-blue-500 hover:bg-blue-600"
          closeMenu={closeMenu}
        />
        <ListItemNavLink
          route="/division"
          text="Division Problems"
          className="bg-yellow-500 hover:bg-yellow-600"
          closeMenu={closeMenu}
        />
        <ListItemNavLink
          route="/take-home-worksheets"
          text="Take Home Worksheets"
          className="bg-teal-500 hover:bg-teal-600"
          closeMenu={closeMenu}
        />
      </ul>
    );
  };

  // MOBILE DISPLAY WHEN USER CLICKS THE MENU BUTTON
  const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <div
        className={`fixed xsm:hidden z-[10] inset-0 bg-black/90 bg-opacity-75 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-y-0 left-0 bg-gray-900 w-full max-w-xsx transition-all transform transition-transformX duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <h1 className="text-xl text-white mb-4">Problem Solvers</h1>
            <MenuCloseButton />
            <div className="pt-[3vh]">
              <MobileNavLinks />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="stickyx top-0x inset-x-0 z-[100] flex justify-between p-2 bg-gradient-to-r from-blue-700/80 to-transparent shadow-2xl">
      <div className="self-center">
        <Link
          to="/"
          onClick={() => {
            console.log("user clicked home button");
            resetProgressOnRedirectToHome();
          }}
        >
          Problem Solvers
        </Link>
      </div>

      <div className="flex gap-2">
        {/* HIDDEN ON MOBILE SCREEN */}
        <div className="hidden xsm:block gap-2">
          <NavigationMenu currentRoute={location.pathname as currentRouteType} />
        </div>
        <MenuOpenButton />
        {isOnGameRoute && <Settings />}
      </div>

      {/* OPENS WHEN USER CLICKS MENU BUTTON */}
      {isOpen && <MobileMenu isOpen={isOpen} />}
    </nav>
  );
};

export default Navbar;
