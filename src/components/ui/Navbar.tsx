import Settings from "./Settings";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import Tooltip from "./tooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const navbarLinks = [
    { link: "Addition", color: "green" },
    { link: "Subtraction", color: "red" },
    { link: "Multiplication", color: "blue" },
    { link: "Division", color: "yellow" },
  ];

  const NavbarLinks = () => {
    return (
      <ul className="flex flex-col md:flex-row flex-wrap text-gray-100 items-center gap-3">
        {navbarLinks.map(({ link, color }) => {
          return (
            <li className="cursor-pointer" key={link}>
              <Link
                to={`/${link}`}
                className={`bg-${color}-500 hover:bg-${color}-600 focus:bg-${color}-700 hover:text-white hover:shadow-xl hover:ring ring-slate-200 px-4 py-2 rounded-full transition-all duration-300 `}
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
