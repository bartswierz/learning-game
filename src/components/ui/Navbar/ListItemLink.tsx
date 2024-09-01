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
  const isCurrentRoute = location.pathname === route;

  // USER CLICK OPENS THE RESTART MODAL - USING A CALLBACK
  const handleClick = () => {
    setRedirectRoute(route);
  };

  // DISABLED BUTTON FOR THE CURRENT ROUTE => (i.e 'locahost:3000/addition -> disabled button for /addition')
  const DisabledLinkButton = ({ title, children }: DisabledLinkButtonProps) => {
    return (
      <li>
        <button className={`rounded-md  h-[80px] w-full cursor-not-allowed p-3  bg-gray-400/30 hover:bg-gray-400/30`}>
          <div className="text-sm font-medium leading-none text-gray-300">{title}</div>
          <p className="line-clamp-3 text-sm leading-snug text-gray-300 group-hover:text-white transition-color duration-300">
            {children}
          </p>
        </button>
      </li>
    );
  };

  if (isCurrentRoute) return <DisabledLinkButton title={title} children={children} />;

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
          <p className="line-clamp-3 text-sm leading-snug text-gray-800 group-hover:text-white transition-color duration-300">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  );
};

export default ListItemLink;
