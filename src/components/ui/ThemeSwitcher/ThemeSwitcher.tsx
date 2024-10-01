import { useTheme } from "../../../contexts/ThemeContext.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { IoMdColorPalette } from "react-icons/io";

const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <IoMdColorPalette size={40} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[218px] w-full">
        <h4 className={`font-xl text-center mb-3`}>Theme Colors</h4>
        <ColorPaletteOptions toggleTheme={toggleTheme} />
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;

interface ColorPaletteOptionsProps {
  toggleTheme: (themeColor: string) => void;
}

const ColorPaletteOptions = ({ toggleTheme }: ColorPaletteOptionsProps) => {
  const themeColorsList = [
    "themeBlue",
    "themeIndigo",
    "themeViolet",
    "themePurple",
    "themeTeal",
    "themeCyan",
    "themeSky",
    "themeGreen",
    "themeEmerald",
    "themeLime",
    "themeYellow",
    "themeAmber",
    "themeOrange",
    "themeFuchsia",
    "themePink",
    "themeRose",
    "themeRed",
  ];

  const handleThemeChange = (themeColor: string) => {
    toggleTheme(themeColor);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {themeColorsList.map((themeColor) => (
        <button
          className={`rounded-full p-4 bg-${themeColor}-primary shadow-xl`}
          onClick={() => handleThemeChange(themeColor)}
          key={themeColor}
        ></button>
      ))}
    </div>
  );
};
