import { useTheme } from "../../../contexts/ThemeContext.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { IoMdColorPalette } from "react-icons/io";
import ColorPaletteOptions from "./components/ColorPaletteOptions.tsx";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../shadcn/tooltip";

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();

  // USER CLICKED "CLOSE" OR "UPDATE SETTINGS"
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* POPOVER TRIGGER W/ TOOLTIP MESSAGE */}
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger asChild data-testid="theme-open-btn">
            <PopoverTrigger asChild className="flex item-center justify-center">
              <button>
                <IoMdColorPalette size={40} />
              </button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent className="font-bold">Change Theme</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* PANEL */}
      <PopoverContent
        align="center"
        className={`relative top-[10px] w-[250px] bg-black/60 border-${theme}-primary border-4 rounded-md pb-7`}
      >
        <h1 className={`text-xl text-center text-startx text-white mb-3`}>Theme Colors</h1>
        <div className="flex justify-center items-center">
          <ColorPaletteOptions toggleTheme={toggleTheme} theme={theme} />
        </div>

        {/* CLOSE BTN */}
        <PopoverClose
          className={`absolute text-white top-3 right-2 transition-color duration-100 ease-in bg-gray-500 hover:bg-${theme}-primary p-1 rounded-md`}
          onClick={handleClose}
          data-testid="settings-close-btn"
        >
          <FaTimes size={22} />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcher;
