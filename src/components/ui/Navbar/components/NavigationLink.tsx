import { Route } from "@/types/types";

interface NavigationLinkProps {
  route: Route;
  description: string;
  title: string;
  width?: string;
  className?: string;
}

const NavigationLink = ({ route, description, title, className = "" }: NavigationLinkProps) => {
  return (
    <a
      className={`block h-full w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group cursor-pointer
hover:text-white bg-blue-500 hover:bg-blue-600 ${className}`}
      href={route}
    >
      <h2 className="text-sm font-bold text-gray-800 leading-none group-hover:text-white transition-color duration-300">{title}</h2>
      <p className="line-clamp-3 text-sm leading-snug text-gray-800 group-hover:text-white transition-color duration-300">
        {description}
      </p>
    </a>
  );
};

export default NavigationLink;
