import { Link } from "react-router-dom";
import "../globals.css";

// TODO
export default function Home() {
  const homepageLinks = [
    { link: "Addition", bgColor: "bg-green-500 hover:bg-green-600" },
    { link: "Subtraction", bgColor: "bg-red-500 hover:bg-red-600" },
    { link: "Multiplication", bgColor: "bg-blue-500 hover:bg-blue-600" },
    { link: "Division", bgColor: "bg-yellow-500 hover:bg-yellow-600" },
  ];

  return (
    <div className="container b mt-8 mb-12">
      <h1 className="text-3xl font-bold text-center mb-4">[placeholder]</h1>
      <ul className="b grid grid-cols-1 md:grid-cols-2 gap-4">
        {homepageLinks.map(({ link, bgColor }) => {
          return (
            <li key={link} className={`b flex items-center justify-center h-fullX ${bgColor} h-[20vh] md:h-[30vh] min-h-[100px]`}>
              <Link
                to={`/${link.toLowerCase()}`}
                className="flex justify-center items-center w-full h-full font-bold text-2xl"
                data-tooltip-target="tooltip-default"
              >
                {link}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
