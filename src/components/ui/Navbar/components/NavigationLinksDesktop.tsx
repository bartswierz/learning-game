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
import useTTSStore from "@/store/tts_store";

import RedirectUserModal from "../../RedirectUserModal";
import ListItemLink from "./ListItemLink";
import LanguageList from "./LanguageList";
import { useTranslation } from "react-i18next";

export type currentRouteType =
  | "/"
  | "/take-home-worksheets"
  | "/addition"
  | "/subtraction"
  | "/multiplication"
  | "/division"
  | "/analog-clock"
  | "/alphabetical-order";
interface NavigationMenuProps {
  currentRoute: currentRouteType;
}

// To prevent the dropdown from being cut off, we need to set a custom width for the content based on the language
const contentWidths = {
  "en-US": "w-[263px]",
  "es-ES": "w-[238px]",
  "pl-PL": "w-[209px]",
  "de-DE": "w-[263px]",
  "fr-FR": "w-[263px]",
};

const DesktopNavigationLinks = ({ currentRoute }: NavigationMenuProps) => {
  const { t } = useTranslation();
  const currentLanguage = useTTSStore((state) => state.language);
  console.log("currentLanguage: ", currentLanguage);
  console.log("contentWidths: ", contentWidths[currentLanguage]);
  const [redirectRoute, setRedirectRoute] = useState<Route>("");
  const isOnProblemsRoute = [
    "/addition",
    "/subtraction",
    "/multiplication",
    "/division",
    "/analog-clock",
    "alphabetical-order",
  ].includes(currentRoute);

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

      <NavigationMenu className="pr-1 hidden md:block">
        <NavigationMenuList className="flex gap-2">
          {isOnProblemsRoute && (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-blue-500">{t("New Problems")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className={"flex flex-wrap p-4 gap-3 w-[428px]"}>
                  {pageLinks.map(({ title, route, className, description }) => (
                    <ListItemLink
                      key={title}
                      title={t(title)}
                      route={route}
                      className={className}
                      setRedirectRoute={setRedirectRoute}
                      width="48%"
                    >
                      {t(description)}
                    </ListItemLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blue-500 bb">{t("Resources")}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={`flex flex-col p-4 gap-3 ${isOnProblemsRoute ? "w-[288px]" : contentWidths[currentLanguage]}`}>
                <ListItemLink
                  route="/take-home-worksheets"
                  title={t("Take Home Worksheets")}
                  className="bg-teal-500 hover:bg-teal-600 hover:text-white"
                  setRedirectRoute={setRedirectRoute}
                >
                  {t("Generate PDF worksheets for practice (45 Problems)")}
                </ListItemLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* LANGUAGE DROPDOWN */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blue-500">{t("Languages")}</NavigationMenuTrigger>
            <NavigationMenuContent className="right-50 left-0x">
              {isOnProblemsRoute ? (
                <div className="w-[426px]">
                  <LanguageList width="48%" />
                </div>
              ) : (
                <div className={contentWidths[currentLanguage]}>
                  <LanguageList width="100%" />
                </div>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* <NavigationMenuViewport /> */}
      </NavigationMenu>
    </>
  );
};

export default DesktopNavigationLinks;

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
  {
    title: "Alphabetical Order",
    route: "/alphabetical-order",
    description: "Practice your alphabet by putting letters in order",
    className: "bg-indigo-500 hover:bg-indigo-600 hover:text-white",
  },
  {
    title: "Analog Clock",
    route: "/analog-clock",
    description: "Practice reading the time on an analog clock",
    className: "bg-cyan-500 hover:bg-cyan-600 hover:text-white",
  },
];
