import { useTheme } from "../../../contexts/ThemeContext";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/Popover";
import { IoMdColorPalette } from "react-icons/io";

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  // Note - following video, only bg-themeRed-primary is used, but bg-themeRed-secondary is also available
  const buttonClasses = `text-color-${theme} bg-${theme}-primary hover:bg-color-${theme}`;

  const themeColorsList = [
    "themeRed",
    "themeOrange",
    "themeAmber",
    "themeYellow",
    "themeLime",
    "themeGreen",
    "themeEmerald",
    "themeTeal",
    "themeCyan",
    "themeSky",
    "themeBlue",
    "themeIndigo",
    "themeViolet",
    "themePurple",
    "themeFuchsia",
    "themePink",
    "themeRose",
  ];

  const handleThemeChange = (themeColor) => {
    console.log("themeColor:", themeColor);
    toggleTheme(themeColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* TODO - replace with a SVG ICON of a Color Palette Icon */}
        <button>
          <IoMdColorPalette size={40} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col">
          <div className="space-y-2">
            <h4 className={`font-medium leading-none bg-${theme}-primary`}>Colors - Theme: {theme}</h4>
            <p className="text-sm text-muted-foreground">Set the theme color.</p>
          </div>
          {/* TODO - refactor ColorPalette */}
          <div className="flex flex-wrap gap-4 bb">
            {themeColorsList.map((themeColor) => (
              <button
                className={`rounded-full p-8 w-8 h-8 bg-${themeColor}-primary bb`}
                onClick={handleThemeChange}
                key={themeColor}
              ></button>
            ))}
            {/* <ColorPaletteOptions toggleTheme={toggleTheme} /> */}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;

const ColorPaletteOptions = ({ toggleTheme }) => {
  const themeColorsList = [
    "themeRed",
    "themeOrange",
    "themeAmber",
    "themeYellow",
    "themeLime",
    "themeGreen",
    "themeEmerald",
    "themeTeal",
    "themeCyan",
    "themeSky",
    "themeBlue",
    "themeIndigo",
    "themeViolet",
    "themePurple",
    "themeFuchsia",
    "themePink",
    "themeRose",
  ];

  const handleThemeChange = (themeColor) => {
    toggleTheme(themeColor);
  };

  return (
    <div>
      {themeColorsList.map((themeColor) => (
        <button className={`rounded-full p-8 w-8 h-8 bg-${themeColor}-primary bb`} onClick={handleThemeChange}></button>
      ))}
    </div>
  );
};
