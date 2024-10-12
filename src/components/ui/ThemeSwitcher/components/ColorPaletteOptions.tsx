interface ColorPaletteOptionsProps {
  toggleTheme: (themeColor: string) => void;
  theme: string;
}

const ColorPaletteOptions = ({ toggleTheme, theme }: ColorPaletteOptionsProps) => {
  const handleThemeChange = (themeColor: string) => {
    toggleTheme(themeColor);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      {themeColorsList.map((themeColor) => (
        <button
          className={`rounded-full p-3.5 bg-${themeColor}-primary shadow-xl border-4 border-transparent hover:border-white ${
            themeColor === theme ? "border-white" : ""
          }`}
          onClick={() => handleThemeChange(themeColor)}
          key={themeColor}
        ></button>
      ))}
    </div>
  );
};

export default ColorPaletteOptions;

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
