import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Settings from "../Settings/Settings";
import NavMenu from "./NavMenu";

const NavbarNew = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navbar toggle function
  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
      <ul className="flex items-center flex-col gap-7 mt-4 mb-6 text-sm">
        <ListItemLink route="addition" text="Addition Problems" className="bg-green-500" />
        <ListItemLink route="subtraction" text="Subtraction Problems" className="bg-red-500" />
        <ListItemLink route="multiplication" text="Multiplication Problems" className="bg-blue-500" />
        <ListItemLink route="division" text="Division Problems" className="bg-yellow-500" />
        <ListItemLink route="pdf" text="Take Home Worksheets" className="bg-teal-500" />
      </ul>
    );
  };

  // Mobile Menu displayed when user clicks on the hamburger menu
  const MobileMenu = () => {
    return (
      <div className="flex w-full md:hidden flex-col items-center bb">
        <div className="absolute z-[1] left-0 mx-auto w-full top-[0vh] bg-gray-500x bg-black p-2">
          <div className="bb relative">
            <h1 className="bb text-xl text-center">Problem Solvers</h1>
            <button onClick={closeMenu} className="absolute top-0 right-0">
              <IoMdClose size={36} />
            </button>
            <NavbarLinks />
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="flex bb justify-between p-2 relative">
      <div className="self-center">
        <Link to="/">Problem Solvers</Link>
      </div>

      <div className="bb flex gap-4">
        {/* HIDDEN ON MOBILE SCREEN */}
        <div className="hidden md:flex gap-2">
          <NavMenu />
          <Settings />
        </div>

        {/* Menu icon */}
        <div className="md:hidden cursor-pointer align-middle">
          {/* <button onClick={toggleMenu}>{isOpen ? <IoMdClose size={36} /> : <GiHamburgerMenu size={36} />}</button> */}
          <button onClick={openMenu}>
            <GiHamburgerMenu size={36} />
          </button>
        </div>
        {/* Toggled menu */}
        {isOpen && <MobileMenu />}
      </div>
    </nav>
  );
};

export default NavbarNew;
