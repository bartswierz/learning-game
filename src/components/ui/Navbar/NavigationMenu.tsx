import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "@/components/ui/shadcn/navigation-menu";
import { Route } from "@/types/types";

import RedirectUserModal from "../RedirectUserModal";
import ListItemLink from "./ListItemLink";
import LanguageList from "./LanguageList";
import { useTranslation } from "react-i18next";

const pageLinks: {
  title: string;
  route: Route;
  description: string;
  className?: string;
}[] = [
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

export type currentRouteType = "/" | "/take-home-worksheets" | "/addition" | "/subtraction" | "/multiplication" | "/division";
interface NavigationMenuProps {
  currentRoute: currentRouteType;
}

const NavigationMenu__ = ({ currentRoute }: NavigationMenuProps) => {
  const { t } = useTranslation();
  const [redirectRoute, setRedirectRoute] = useState<Route>("");
  const isNotOnHomeOrExtraRoute = currentRoute !== "/" && currentRoute !== "/take-home-worksheets";

  // Modal relies on the redirectRoute to be set via user clicking a link. Canceling or redirect will reset the redirectRoute
  const closeModal = () => {
    setRedirectRoute("");
  };

  return (
    <>
      {/* TODO - bug is here, we show this redirect modal asking user if they are sure they want to change pages. But this is an issue with the extra section when we are on home page
      create a condition where it only display if we are not on '/' either */}
      {/* RESTART MODAL POPUP WHEN USER CLICKS ON A LINK */}
      {redirectRoute && <RedirectUserModal redirectRoute={redirectRoute} closeModalCallback={closeModal} />}

      <NavigationMenu className="pr-1">
        <NavigationMenuList className="flex gap-2">
          {/* NEW PROBLEMS MENU ITEM - NOT DISPLAYD ON HOME ROUTE*/}
          {isNotOnHomeOrExtraRoute && (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-blue-500">New Problems</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col p-4 gap-3 w-[250px]">
                  {pageLinks.map(({ title, route, className, description }) => (
                    <ListItemLink key={title} title={title} route={route} className={className} setRedirectRoute={setRedirectRoute}>
                      {description}
                    </ListItemLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blue-500">{t("Extras")}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col p-4 gap-3 w-[250px]">
                <ListItemLink
                  route="/take-home-worksheets"
                  title={t("Take Home Worksheets")}
                  className="bg-teal-500 hover:bg-teal-600 hover:text-white"
                  setRedirectRoute={setRedirectRoute}
                >
                  {t("Generate PDF worksheets for practice (45 Problems)")}
                </ListItemLink>
                <ListItemLink
                  route="/analog-clock"
                  title={t("Analog Clock")}
                  className="bg-blue-500 hover:bg-blue-600 hover:text-white"
                  setRedirectRoute={setRedirectRoute}
                >
                  {t("Practice reading the time on an analog clock")}
                </ListItemLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* LANGUAGE DROPDOWN */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blue-500">{t("Languages")}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <LanguageList />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* <NavigationMenuViewport /> */}
      </NavigationMenu>
    </>
  );
};

export default NavigationMenu__;
