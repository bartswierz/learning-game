// import { Fragment, useState } from "react";
// import { Link } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import Settings from "../Settings/Settings";
// const NavbarNew = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // NAVBAR LINKS
//   const NavbarLinks = () => {
//     // For color we can make two separate variables, one that all buttons share, and a second that is the unique color, pass these to the className
//     return (
//       <>
//         <Link to="/" className="b bg-blue-500 rounded-full p-2">
//           Home
//         </Link>
//         <Link to="/addition" className="b bg-blue-500 rounded-full p-2">
//           Addition
//         </Link>
//         <Link to="/subtraction" className="b bg-blue-500 rounded-full p-2">
//           Subtraction
//         </Link>
//         <Link to="/multiplication" className="b bg-blue-500 rounded-full p-2">
//           Multiplication
//         </Link>
//         <Link to="/division" className="b bg-blue-500 rounded-full p-2">
//           Division
//         </Link>
//       </>
//     );
//   };
//   // NAVBAR LOGO

//   // NAVBAR TOGGLE
//   const toggleMenu = () => {
//     console.log("Menu toggled");
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="flex b justify-between text-lg p-4 sticky">
//       <div>PROBLEM SOLVERS</div>
//       {/* NAVBAR LINKS & MENU/SETTINGS CONTAINER */}
//       <div className="flex b">
//         {/* NAVBAR LINKS */}
//         <div className="hidden w-full md:flex">
//           <NavbarLinks />
//         </div>

//         {/* MENU & SETTINGS */}
//         <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
//           {/* MENU ICON IS HIDDEN ON DESKTOP */}
//           <div className="flex gap-2">
//             <div className="md:hidden b cursor-pointer">
//               <button onClick={toggleMenu}>{isOpen ? <span className="text-xl">X</span> : <GiHamburgerMenu size={36} />}</button>
//             </div>
//             <Settings />
//           </div>
//           {isOpen && (
//             <div className="flex flex-col basis-full items-center">
//               <NavbarLinks />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* TOGGLED MENU */}
//       {/* TODO - container with our menu items IF ITS STATE IS OPEN */}
//     </nav>
//   );
// };
// https://www.youtube.com/watch?v=vYowvsUiChs
// export default NavbarNew;
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Settings from "../Settings/Settings";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/shadcn/navigation-menu";
import NavMenu from "./NavMenu";

const NavbarNew = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navbar links component
  const NavbarLinks = () => {
    return (
      <ul className="flex items-center">
        <li>
          <Link to="/" className="b bg-blue-500 rounded-full p-2 my-1">
            Home
          </Link>
        </li>
        <li>
          <Link to="/addition" className="b bg-blue-500 rounded-full p-2 my-1">
            Addition
          </Link>
        </li>
        <li>
          <Link to="/subtraction" className="b bg-blue-500 rounded-full p-2 my-1">
            Subtraction
          </Link>
        </li>
        <li>
          {" "}
          <Link to="/multiplication" className="b bg-blue-500 rounded-full p-2 my-1">
            Multiplication
          </Link>
        </li>
        <li>
          <Link to="/division" className="b bg-blue-500 rounded-full p-2 my-1">
            Division
          </Link>
        </li>
      </ul>
    );
  };

  const NavigationMenuTest = () => {
    return (
      <>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-white bg-blue-500 hover:bg-blue-500 hover:bg-red-500x">
                Choose Problems
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
                <NavigationMenuLink>
                  <ul className="flex items-center">
                    <li>
                      <Link to="/" className="b bg-blue-500 rounded-full p-2 my-1">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/addition" className="b bg-blue-500 rounded-full p-2 my-1">
                        Addition
                      </Link>
                    </li>
                    <li>
                      <Link to="/subtraction" className="b bg-blue-500 rounded-full p-2 my-1">
                        Subtraction
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/multiplication" className="b bg-blue-500 rounded-full p-2 my-1">
                        Multiplication
                      </Link>
                    </li>
                    <li>
                      <Link to="/division" className="b bg-blue-500 rounded-full p-2 my-1">
                        Division
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </>
    );
  };

  // Navbar toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <nav className="flex b justify-between text-lg p-4 sticky">
    //   <div>PROBLEM SOLVERS</div>

    //   {/* Navbar links & menu/settings container */}
    //   <div className="flex items-center">
    //     {/* Navbar links */}
    //     <div className="hidden md:flex">
    //       <NavbarLinks />
    //     </div>

    //     {/* Menu & settings */}
    //     <div className="flex items-center">
    //       {/* Menu icon */}
    //       <div className="md:hidden cursor-pointer">
    //         <button onClick={toggleMenu}>{isOpen ? <span className="text-xl">X</span> : <GiHamburgerMenu size={36} />}</button>
    //       </div>

    //       {/* Settings */}
    //       <Settings />
    //     </div>
    //   </div>

    //   {/* Toggled menu */}
    //   {isOpen && (
    //     <div className="flex md:hidden flex-col items-center">
    //       <NavbarLinks />
    //     </div>
    //   )}
    //   <NavigationMenuTest />
    // </nav>
    <nav className="flex bb justify-between p-2">
      <div>
        <Link to="/">Problem Solvers</Link>
      </div>

      <div className="bb flex gap-4">
        <NavMenu />
        <Settings />
      </div>
    </nav>
  );
};

export default NavbarNew;
