import Settings from "./Settings";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import Tooltip from "./tooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const navbarLinks = [
    { link: "Addition", bgColor: "bg-green-500 hover:bg-green-600 focus:bg-green-700" },
    { link: "Subtraction", bgColor: "bg-red-500 hover:bg-red-600 focus:bg-red-700" },
    { link: "Multiplication", bgColor: "bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" },
    { link: "Division", bgColor: "bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-700" },
  ];

  const NavbarLinks = () => {
    return (
      <ul className="flex flex-col md:flex-row flex-wrap text-gray-100 items-center gap-3">
        {navbarLinks.map(({ link, bgColor }) => {
          return (
            <li className="cursor-pointer" key={link}>
              <Link
                to={`/${link}`}
                className={`${bgColor} hover:text-white hover:shadow-xl hover:ring ring-slate-200 px-4 py-2 rounded-full transition-all duration-300 `}
                data-tooltip-target="tooltip-default"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>{link}</button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Go to {link}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Router>
      <nav data-testid="navbar" className="flex justify-between items-center b p-2">
        <span className="text-2xl font-bold" id="navbar-title">
          Learning Game
        </span>
        <NavbarLinks />
        <Settings />
      </nav>
    </Router>
  );
};

export default Navbar;
