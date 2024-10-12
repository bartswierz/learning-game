import { useTheme } from "../../../contexts/ThemeContext.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { IoMdColorPalette } from "react-icons/io";
import ColorPaletteOptions from "./components/ColorPaletteOptions.tsx";

const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild className="flex item-center justify-center">
        <button>
          <IoMdColorPalette size={40} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className={`relative top-[10px] max-w-[218px]x w-full bg-black/60 border-${theme}-primary border-4 rounded-md`}
      >
        <h1 className={`text-xl text-center text-white mb-3`}>Theme Colors</h1>
        <ColorPaletteOptions toggleTheme={toggleTheme} theme={theme} />
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
