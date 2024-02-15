import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Settings from "../Settings/Settings";
const NavbarNew = () => {
  const [isOpen, setIsOpen] = useState(false);

  // NAVBAR LINKS
  const NavbarLinks = () => {
    // For color we can make two separate variables, one that all buttons share, and a second that is the unique color, pass these to the className
    return (
      <ul className="b flexx flex-colx md:flexx gap-2x">
        <li className="b bg-blue-500 rounded-full p-2">
          <Link to="/" className="">
            Home
          </Link>
        </li>
        <li className="b bg-blue-500 rounded-full p-2">
          <Link to="/addition" className="">
            Addition
          </Link>
        </li>
        <li className="b bg-blue-500 rounded-full p-2">
          <Link to="/subtraction" className="">
            Subtraction
          </Link>
        </li>
        <li className="b bg-blue-500 rounded-full p-2">
          <Link to="/multiplication" className="">
            Multiplication
          </Link>
        </li>
        <li className="b bg-blue-500 rounded-full p-2">
          <Link to="/division" className="">
            Division
          </Link>
        </li>
      </ul>
    );
  };
  // NAVBAR LOGO

  // NAVBAR TOGGLE
  const toggleMenu = () => {
    console.log("Menu toggled");
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex b justify-between text-lg p-4 sticky">
      <div>PROBLEM SOLVERS</div>
      {/* NAVBAR LINKS & MENU/SETTINGS CONTAINER */}
      <div className="flex">
        {/* NAVBAR LINKS */}
        <div className="hidden md:flex justify-endx">
          <NavbarLinks />
        </div>

        {/* MENU & SETTINGS */}
        <div className="flex items-center justify-between gap-2">
          {/* MENU ICON IS HIDDEN ON DESKTOP */}
          <div className="md:hidden">
            <GiHamburgerMenu onClick={toggleMenu} />
          </div>
          <Settings />
        </div>
      </div>

      {/* TOGGLED MENU */}
      {/* TODO - container with our menu items IF ITS STATE IS OPEN */}
      {isOpen && (
        <div className="flex flex-col">
          <NavbarLinks />
        </div>
      )}
    </nav>
  );
};

export default NavbarNew;
