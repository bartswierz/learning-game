import { Link } from "react-router-dom";
import "../globals.css";

// TODO
export default function Home() {
  const homepageLinks = [
    {
      link: "Addition",
      listItemStyle: "bg-green-500 hover:bg-green-600 focus:bg-red-500 rounded-tl-[50px] rounded-br-[50px]",
      linkStyle: "rounded-tl-[50px] rounded-br-[50px]",
    },
    {
      link: "Subtraction",
      listItemStyle: "bg-red-500 hover:bg-red-600 rounded-tr-[50px] rounded-bl-[50px]",
      linkStyle: "rounded-tr-[50px] rounded-bl-[50px]",
    },
    {
      link: "Multiplication",
      listItemStyle: "bg-blue-500 hover:bg-blue-600 rounded-bl-[50px] rounded-tr-[50px]",
      linkStyle: "rounded-bl-[50px] rounded-tr-[50px]",
    },
    {
      link: "Division",
      listItemStyle: "bg-yellow-500 hover:bg-yellow-600 rounded-br-[50px] rounded-tl-[50px]",
      linkStyle: "rounded-br-[50px] rounded-tl-[50px]",
    },
  ];
  // const homepageLinks = [
  //   {
  //     link: "Addition",
  //     listItemStyle: "bg-green-500 hover:bg-green-600 hover:shadow-red-500 rounded-tl-[50px]",
  //     linkStyle: "rounded-tl-[50px]",
  //   },
  //   { link: "Subtraction", listItemStyle: "bg-red-500 hover:bg-red-600 rounded-tr-[50px]", linkStyle: "rounded-tr-[50px]" },
  //   { link: "Multiplication", listItemStyle: "bg-blue-500 hover:bg-blue-600 rounded-bl-[50px]", linkStyle: "rounded-bl-[50px]" },
  //   { link: "Division", listItemStyle: "bg-yellow-500 hover:bg-yellow-600 rounded-br-[50px]", linkStyle: "rounded-br-[50px]" },
  // ];

  return (
    <div className="container mt-8 pb-12">
      <h1 className="text-3xl font-bold text-center mb-6">Choose a practice problem</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homepageLinks.map(({ link, listItemStyle, linkStyle }) => {
          return (
            <li
              key={link}
              className={`flex items-center justify-center h-fullX h-[20vh] md:h-[30vh] min-h-[100px] transition-all duration-200 ${listItemStyle} hover:border-[12px] hover:border-white`}
            >
              <Link
                to={`/${link.toLowerCase()}`}
                className={`flex justify-center items-center w-full h-full font-bold text-2xl transition-all duration-300 shadow-2xl ${linkStyle}`}
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
