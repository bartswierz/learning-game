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
import { Link } from "react-router-dom";
import React from "react";

const components: { title: string; href: string; description: string; className?: string }[] = [
  {
    title: "Addition",
    href: "/addition",
    description: "Set of Addition problems (5-50 Questions)",
    className: "bg-green-500 hover:bg-green-600 hover:text-white",
  },
  {
    title: "Subtraction",
    href: "/subtraction",
    description: "Set of Subtraction problems (5-50 Questions)",
    className: "bg-red-500 hover:bg-red-600 hover:text-white",
  },
  {
    title: "Multiplication",
    href: "/multiplication",
    description: "Set of Multiplication problems (5-50 Questions)",
    className: "bg-blue-500 hover:bg-blue-600 hover:text-white",
  },
  {
    title: "Division",
    href: "/division",
    description: "Set of Division problems (5-50 Questions)",
    className: "bg-yellow-500 hover:bg-yellow-600 hover:text-white",
  },
];

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2">
        {/* PROBLEMS MENU ITEM */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-500">New Problems</NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"> */}
            <ul className="grid w-[400px]x w-[280px] gap-3 p-4 md:w-[300px] md:grid-cols-2x lg:w-[300px]">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href} className={component.className}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* FIRST LINK - GETTING STARTED */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-blue-500">Extras</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[190px] md:w-[300px] lg:w-[300px]x lg:grid-cols-[.75fr_1fr]X">
              <ListItem href="/pdf" title="Take Home Worksheets" className="bg-teal-500 hover:bg-teal-600 hover:text-white">
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

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
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
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default NavMenu;
