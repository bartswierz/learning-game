import Settings from "../Settings/Settings";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import TooltipButton from "../TooltipButton";
import NavbarMobile from "./NavbarMobile";

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

  // Link Buttons for Addition, Subtraction, Multiplication, and Division Pages
  const NavbarLinks = () => {
    // TODO - display on mobile
    return (
      <ul className="flex flex-row flex-wrap items-center gap-3">
        {/* // <ul className="b w-[500px] grid grid-cols-4 place-items-center flex-wrap items-centerx gap-3"> */}
        {navbarLinks.map(({ link, bgColor }) => {
          return <NavbarLink link={link} btnColor={bgColor} key={link} />;
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

  const NavbarDesktop = () => {
    return (
      <nav data-testid="navbar" className="hidden md:flex justify-between items-center p-2 z-[10]">
        <span className="text-2xl font-bold" id="navbar-title">
          Desktop
        </span>
        {/* TODO - setup a desktop and mobile navbar */}
        <NavbarLinks />
        <div className="flex justify-between items-center gap-4">
          <HomepageLink />
          <Settings />
        </div>
      </nav>
    );
  };

  return (
    <>
      <NavbarDesktop />
      <NavbarMobile />
    </>
  );
};

export default Navbar;
