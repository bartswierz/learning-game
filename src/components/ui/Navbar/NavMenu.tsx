// "use client"

// import * as React from "react"
// import Link from "next/link"

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/shadcn/navigation-menu";
import { Link } from "react-router-dom";
import React from "react";

const components: { title: string; href: string; description: string; className?: string }[] = [
  {
    title: "Addition",
    href: "/addition",
    description: "Set of Addition problems",
    className: "bg-green-500 hover:bg-green-600",
  },
  {
    title: "Subtraction",
    href: "/subtraction",
    description: "Set of Subtraction problems",
    className: "bg-red-500 hover:bg-red-600",
  },
  {
    title: "Multiplication",
    href: "/multiplication",
    description: "Set of Multiplication problems",
    className: "bg-blue-500 hover:bg-blue-600",
  },
  {
    title: "Division",
    href: "/division",
    description: "Set of Division problems",
    className: "bg-yellow-500 hover:bg-yellow-600",
  },
];

const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* FIRST LINK - GETTING STARTED */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">Extras</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Worksheets">
                Generate worksheets for practice
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* END OF FIRST MENU ITEM */}

        {/* PROBLEMS MENU ITEM */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">New Problems</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-slate-900">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href} className={component.className}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
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
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default NavMenu;
