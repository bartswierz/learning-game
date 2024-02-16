import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Settings from "../Settings/Settings";
import NavigationMenu from "./NavigationMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const MenuButton = () => {
    return (
      <button onClick={openMenu} className="xsm:hidden cursor-pointer align-middle">
        <GiHamburgerMenu size={36} />
      </button>
    );
  };

  // INDIVIDUAL LINK
  const ListItemLink = ({ route, text, className }: { route: string; text: string; className: string }) => {
    return (
      <li>
        <Link to={`/${route}`} className={`px-4 py-2 rounded-full cursor-pointer ${className}`}>
          {text}
        </Link>
      </li>
    );
  };

  // Navbar links component
  const NavbarLinks = () => {
    return (
      <ul className="flex items-center flex-col gap-12 mt-4 mb-6 text-base">
        <ListItemLink route="addition" text="Addition Problems" className="bg-green-500" />
        <ListItemLink route="subtraction" text="Subtraction Problems" className="bg-red-500" />
        <ListItemLink route="multiplication" text="Multiplication Problems" className="bg-blue-500" />
        <ListItemLink route="division" text="Division Problems" className="bg-yellow-500" />
        <ListItemLink route="pdf" text="Take Home Worksheets" className="bg-teal-500" />
      </ul>
    );
  };

  // MOBILE DISPLAY WHEN USER CLICKS THE MENU BUTTON
  const MobileMenu = ({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) => {
    return (
      <div
        className={`fixed xsm:hidden z-[10] inset-0 bg-gray-500x bg-black/90 bg-opacity-75 transition-all duration-300 ${
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
            <button onClick={closeMenu} className="absolute top-0 right-0 m-4 text-white">
              <IoMdClose size={36} />
            </button>
            <div className="pt-[3vh]">
              <NavbarLinks />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="flex justify-between p-2 relative">
      <div className="self-center">
        <Link to="/">Problem Solvers</Link>
      </div>

      <div className="flex gap-2">
        {/* HIDDEN ON MOBILE SCREEN */}
        <div className="hidden xsm:block gap-2">
          <NavigationMenu />
        </div>
        <MenuButton />
        <Settings />
      </div>

      {/* OPENS WHEN USER CLICKS MENU BUTTON */}
      {isOpen && <MobileMenu isOpen={isOpen} closeMenu={closeMenu} />}
    </nav>
  );
};

export default Navbar;
