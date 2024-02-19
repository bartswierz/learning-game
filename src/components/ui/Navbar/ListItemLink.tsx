import { NavigationMenuLink } from "@/components/ui/shadcn/navigation-menu";
import { cn } from "@/lib/utils";
import { Route } from "@/types/types";
import { useLocation } from "react-router-dom";

interface ListItemProps {
  className?: string;
  route: Route;
  title: string;
  children: React.ReactNode;
  setRedirectRoute: (route: Route) => void;
}

interface DisabledLinkButtonProps {
  title: ListItemProps["title"];
  children: ListItemProps["children"];
}

const ListItemLink = ({ className, route, title, children, setRedirectRoute }: ListItemProps) => {
  // GET THE CURRENT ROUTE USER IS ON, TO DISABLE THE LINK - (i.e '/addition')
  const location = useLocation();
  const isUserAlreadyOnRoute = location.pathname === route;

  // USER CLICK OPENS THE RESTART MODAL - USING A CALLBACK
  const handleClick = () => {
    console.log("user clicked one of the links");
    setRedirectRoute(route);
  };

  const DisabledLinkButton = ({ title, children }: DisabledLinkButtonProps) => {
    return (
      <li>
        <button className="rounded-md bg-gray-400 h-[80px] w-full cursor-not-allowed ">
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-800 group-hover:text-white transition-color duration-300">
            {children}
          </p>
        </button>
      </li>
    );
  };

  if (isUserAlreadyOnRoute) return <DisabledLinkButton title={title} children={children} />;

  return (
    <li>
      <NavigationMenuLink asChild>
        <button
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group cursor-pointer",
            className
          )}
          onClick={handleClick}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug  text-gray-800 group-hover:text-white transition-color duration-300">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  );
};

ListItemLink.displayName = "ListItem";

export default ListItemLink;
