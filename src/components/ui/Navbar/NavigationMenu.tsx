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

const components: { title: string; route: string; description: string; className?: string }[] = [
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
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2">
        {/* PROBLEMS MENU ITEM */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-500">New Problems</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col p-4 gap-3 w-[280px]">
              {components.map(({ title, route, className, description }) => (
                <ListItem key={title} title={title} route={route} className={className}>
                  {description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* FIRST LINK - GETTING STARTED */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-500">Extras</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col p-4 gap-3 w-[280px]">
              <ListItem route="/pdf" title="Take Home Worksheets" className="bg-teal-500 hover:bg-teal-600 hover:text-white">
                Generate PDF worksheets for practice (45 Problems)
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* END OF FIRST MENU ITEM */}
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  );
};

interface ListItemProps {
  className?: string;
  route: string;
  title: string;
  children: React.ReactNode;
}
const ListItem = ({ className, route, title, children, ...props }: ListItemProps) => {
  return (
    <li>
      {/* <NavigationMenuLink asChild> */}
      <Link
        to={`${route}`}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foregroundx text-whitex text-gray-800 group-hover:text-white transition-color duration-300">
          {children}
        </p>
      </Link>
      {/* </NavigationMenuLink> */}
    </li>
  );
};

ListItem.displayName = "ListItem";

// PREVIOUS VERSION FROM SHADCN DOCS
// const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
//   ({ className, title, children, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <a
//             ref={ref}
//             className={cn(
//               "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group",
//               className
//             )}
//             {...props}
//           >
//             <div className="text-sm font-medium leading-none">{title}</div>
//             <p className="line-clamp-2 text-sm leading-snug text-muted-foregroundx text-whitex text-gray-800 group-hover:text-white transition-color duration-300">
//               {children}
//             </p>
//           </a>
//         </NavigationMenuLink>
//       </li>
//     );
//   }
// );
// ListItem.displayName = "ListItem";

export default NavigationMenu__;
