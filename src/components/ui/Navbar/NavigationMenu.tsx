import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/shadcn/navigation-menu";
// import { Link } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import useSettingsStore from "@/store/store";
import RestartModal from "../RestartModal";
import { redirect, useNavigate } from "react-router-dom";

const pageLinks: { title: string; route: string; description: string; className?: string }[] = [
  {
    title: "Addition",
    route: "/addition",
    description: "Set of Addition problems (5-50 Questions)",
    className: "bg-green-500 hover:bg-green-600 hover:text-white",
  },
  {
    title: "Subtraction",
    route: "/subtraction",
    description: "Set of Subtraction problems (5-50 Questions)",
    className: "bg-red-500 hover:bg-red-600 hover:text-white",
  },
  {
    title: "Multiplication",
    route: "/multiplication",
    description: "Set of Multiplication problems (5-50 Questions)",
    className: "bg-blue-500 hover:bg-blue-600 hover:text-white",
  },
  {
    title: "Division",
    route: "/division",
    description: "Set of Division problems (5-50 Questions)",
    className: "bg-yellow-500 hover:bg-yellow-600 hover:text-white",
  },
];

const NavigationMenu__ = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const restartGame = useSettingsStore((state) => state.restartGame);
  const [newRoute, setNewRoute] = useState("");
  // TODO - reset question to 1, reset score to 0, reset attempts to settings.numOfAttempts

  const handleModal = () => {
    console.log("inside handleModal - newRoute: ", newRoute);
    setIsModalOpen(false);

    // redirect("/addition");
    // TODO - redirect to the new route
    // navigate("/addition");
    navigate(newRoute);
    setNewRoute("");
  };

  return (
    <>
      {/* RESTART MODAL POPUP WHEN USER CLICKS ON A LINK */}
      {/* {isModalOpen && <RestartModal handleModalCallback={handleModal} />} */}
      {newRoute && <RestartModal handleModalCallback={handleModal} />}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2">
          {/* PROBLEMS MENU ITEM */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blue-500">New Problems</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col p-4 gap-3 w-[280px]">
                {pageLinks.map(({ title, route, className, description }) => (
                  <ListItemLink
                    key={title}
                    title={title}
                    route={route}
                    className={className}
                    setIsModalOpen={setIsModalOpen}
                    setNewRoute={setNewRoute}
                    // restartGame={restartGame}
                  >
                    {description}
                  </ListItemLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* FIRST LINK - GETTING STARTED */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blue-500">Extras</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col p-4 gap-3 w-[280px]">
                <ListItemLink
                  route="/pdf"
                  title="Take Home Worksheets"
                  className="bg-teal-500 hover:bg-teal-600 hover:text-white"
                  setIsModalOpen={setIsModalOpen}
                  setNewRoute={setNewRoute}
                >
                  Generate PDF worksheets for practice (45 Problems)
                </ListItemLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* END OF FIRST MENU ITEM */}
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    </>
  );
};

interface ListItemProps {
  className?: string;
  route: string;
  title: string;
  children: React.ReactNode;
  // restartGame: (newNumberOne: number, newNumberTwo: number) => void;
  setIsModalOpen?: (isModalOpen: boolean) => void;
  setNewRoute: (route: string) => void;
}
const ListItemLink = ({ className, route, title, children, setIsModalOpen, setNewRoute }: ListItemProps) => {
  // USER CLICK OPENS THE RESTART MODAL - USING A CALLBACK
  const handleClick = () => {
    console.log("user clicked one of the links");
    setNewRoute(route);
  };

  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          // to={`${route}`}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          onClick={handleClick}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foregroundx text-whitex text-gray-800 group-hover:text-white transition-color duration-300">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  );
};

ListItemLink.displayName = "ListItem";

export default NavigationMenu__;

{
  /* <li>
      <NavigationMenuLink asChild>
        <Link
          to={`${route}`}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
            className
          )}
          // TODO - mode onClick function to restartGame
          onClick={resetGameProgress}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foregroundx text-whitex text-gray-800 group-hover:text-white transition-color duration-300">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li> */
}
