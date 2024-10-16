import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/shadcn/navigation-menu";
import { Route } from "@/types/types";
import useTTSStore from "@/store/tts_store";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageList from "./LanguageList";
import { useTranslation } from "react-i18next";
import NavigationLink from "./NavigationLink";

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

// While on a problem route, we need to adjust the width of the content to fit the screen based on the current language
const problemRoutesContentWidths = {
  "en-US": { problemsWidth: "w-[426px]", resourcesWidth: "w-[288px]", languagesWidth: "w-[426px]" }, //DONE
  "es-ES": { problemsWidth: "w-[428px]", resourcesWidth: "w-[311px]", languagesWidth: "w-[428px]" },
  "pl-PL": { problemsWidth: "w-[378px]", resourcesWidth: "w-[274px]", languagesWidth: "w-[380px]" },
  "de-DE": { problemsWidth: "w-[432px]", resourcesWidth: "w-[302px]", languagesWidth: "w-[432px]" },
  "fr-FR": { problemsWidth: "w-[463px]", resourcesWidth: "w-[344px]", languagesWidth: "w-[463px]" },
};

// Non problem route page - i.e. Home page, Take Home Worksheets page, etc. No "new problems" button on these pages, so we can use a fixed width per language
const contentWidths = {
  "en-US": "w-[263px]",
  "es-ES": "w-[233px]",
  "pl-PL": "w-[206px]",
  "de-DE": "w-[263px]",
  "fr-FR": "w-[253px]",
};

const DesktopNavigationLinks = ({ currentRoute }: NavigationMenuProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const currentLanguage = useTTSStore((state) => state.language);
  const isOnProblemsRoute = [
    "/addition",
    "/subtraction",
    "/multiplication",
    "/division",
    "/analog-clock",
    "/alphabetical-order",
  ].includes(currentRoute);

  const { problemsWidth, resourcesWidth, languagesWidth } = problemRoutesContentWidths[currentLanguage];

  return (
    <NavigationMenu className="pr-1 hidden md:block">
      <NavigationMenuList className="flex gap-2">
        {isOnProblemsRoute && (
          // PROBLEMS DROPDOWN
          <NavigationMenuItem>
            <NavigationMenuTrigger className={`bg-${theme}-primary`}>{t("New Problems")}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className={`flex flex-wrap p-4 gap-3 ${problemsWidth}`}>
                {pageLinks.map(({ title, route, className, description }) => (
                  <li key={route} className="w-[48%]">
                    <NavigationMenuLink asChild>
                      <NavigationLink route={route} description={t(description)} title={t(title)} className={className} />
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* RESOURCES DROPDOWN */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-${theme}-primary`}>{t("Resources")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={`flex flex-col p-4 gap-3 ${isOnProblemsRoute ? resourcesWidth : contentWidths[currentLanguage]}`}>
              <NavigationMenuLink asChild>
                <NavigationLink
                  route="/take-home-worksheets"
                  description={t("Generate PDF worksheets for practice (45 Problems)")}
                  title={t("Take Home Worksheets")}
                  className="bg-teal-500 hover:bg-teal-600"
                />
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* LANGUAGE DROPDOWN */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`bg-${theme}-primary`}>{t("Languages")}</NavigationMenuTrigger>
          <NavigationMenuContent className="right-50 left-0x">
            {isOnProblemsRoute ? (
              <div className={languagesWidth}>
                <LanguageList width="48%" />
              </div>
            ) : (
              // HOME PAGE/TAKE HOME WORKSHEET PAGE/ETC.
              <div className={contentWidths[currentLanguage]}>
                <LanguageList width="100%" />
              </div>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
