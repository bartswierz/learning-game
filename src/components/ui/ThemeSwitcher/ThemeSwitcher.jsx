import { useTheme } from "../../../contexts/ThemeContext";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/Popover";
import { IoMdColorPalette } from "react-icons/io";

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  // Note - following video, only bg-themeRed-primary is used, but bg-themeRed-secondary is also available
  const buttonClasses = `text-color-${theme} bg-${theme}-primary hover:bg-color-${theme}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <IoMdColorPalette size={40} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[218px] w-full">
        <h4 className={`font-xl text-center mb-3`}>Theme Colors</h4>
        <span className={`bg-${theme}-primary`}>{theme}</span>
        <ColorPaletteOptions toggleTheme={toggleTheme} />
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;

const ColorPaletteOptions = ({ toggleTheme }) => {
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

  const handleThemeChange = (themeColor) => {
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
