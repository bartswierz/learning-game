import Settings from "./Settings";
import { Link } from "react-router-dom";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IoHome } from "react-icons/io5";
import TooltipButton from "./TooltipButton";

const Navbar = () => {
  // Link information for our four operations along with custom button colors
  const navbarLinks = [
    { link: "Addition", bgColor: "bg-green-500 hover:bg-green-600" },
    { link: "Subtraction", bgColor: "bg-red-500 hover:bg-red-600" },
    { link: "Multiplication", bgColor: "bg-blue-500 hover:bg-blue-600" },
    { link: "Division", bgColor: "bg-yellow-500 hover:bg-yellow-600" },
  ];

  interface NavbarLinkProps {
    link: string;
    btnColor: string;
  }

  // Links for the four operations
  const NavbarLinks = () => {
    return (
      <ul className="flex flex-col md:flex-row flex-wrap items-center gap-3">
        {navbarLinks.map(({ link, bgColor }) => {
          return <NavbarLink link={link} btnColor={bgColor} />;
        })}
      </ul>
    );
  };

  // Individual Link
  const NavbarLink = ({ link, btnColor }: NavbarLinkProps) => {
    return (
      <li className="cursor-pointer" key={link}>
        <Link
          to={`/${link.toLowerCase()}`}
          // to={`/`} // TODO - remove this once the routes are set up
          className={`${btnColor} hover:text-white hover:shadow-xl hover:ring ring-slate-200 px-4 py-2 rounded-full transition-all duration-300 text-gray-100 font-bold`}
          data-tooltip-target="tooltip-default"
        >
          <TooltipButton trigger={link} popup={link} />
        </Link>
      </li>
    );
  };

  // Redirect to Homepage
  const HomepageLink = () => {
    return (
      <Link to="/" className="flex justify-center item-center">
        <TooltipButton
          trigger={<IoHome size={36} className="text-white hover:text-gray-400 transition-color duration-200" />}
          popup={"home"}
        />
      </Link>
    );
  };

  return (
    <nav data-testid="navbar" className="flex justify-between items-center b p-2 z-[10]">
      <span className="text-2xl font-bold" id="navbar-title">
        Learning Game
      </span>
      <NavbarLinks />
      <div className="flex justify-between items-center gap-4 b">
        <HomepageLink />
        <Settings />
      </div>
    </nav>
  );
};

export default Navbar;
