import Settings from "../Settings/Settings";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import TooltipButton from "../TooltipButton";
import { GiHamburgerMenu } from "react-icons/gi";

const NavbarMobile = () => {
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
      <ul className="grid grid-cols-1 xsm:grid-cols-2 gap-4 w-[90vw]">
        {navbarLinks.map(({ link, bgColor }) => {
          return <NavbarLink link={link} btnColor={bgColor} key={link} />;
        })}
      </ul>
    );
  };

  // Individual Link
  const NavbarLink = ({ link, btnColor }: NavbarLinkProps) => {
    return (
      <li className="cursor-pointer flex text-center" key={link}>
        <Link
          to={`/${link.toLowerCase()}`}
          className={`${btnColor} hover:text-white hover:shadow-xl hover:ring ring-slate-200 px-4 py-2 rounded-full transition-all duration-300 text-gray-100 font-bold w-full`}
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

  /*
  - Move the navbar links hidden on mobile
  - To see them, would require clicking a hamburger menu
  - The hamburger menu would then display the links
  */
  return (
    <nav data-testid="navbar" className="md:hidden flex flex-col justify-content items-center p-2 z-[10] gap-4 mb-[2vh]">
      {/* <div className="b flex-colx"> */}
      <div className="flex justify-between w-full">
        <span className="text-2xl font-bold" id="navbar-title">
          MOBILE
        </span>
        <div className="flex justify-between items-center gap-4">
          <GiHamburgerMenu size={36} />
          {/* TODO - move homepage link into menu dropdown */}
          <HomepageLink />
          <Settings />
        </div>
      </div>
      {/* TODO Hidden on mobile - use a button click to display */}
      <NavbarLinks />
    </nav>
  );
};

export default NavbarMobile;
