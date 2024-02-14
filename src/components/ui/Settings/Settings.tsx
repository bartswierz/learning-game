import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import "../shadcn/styles.css";
import type { Settings } from "@/types/types";
import SettingPanel__ from "./SettingPanel";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

// Settings Component that allows the user to update the value settings(numberOne, numberTwo, # of questions, # of Attempts)
const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  // USER CLICKED "CLOSE" OR "UPDATE SETTINGS"
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* POPOVER TRIGGER W/ TOOLTIP MESSAGE */}
      <TooltipProvider delayDuration={500}>
        <Tooltip>
          <TooltipTrigger asChild data-testid="settings-open-btn">
            <PopoverTrigger
              className="bg-blue-500 hover:bg-blue-600 hover:ring ring-slate-200 focus:bg-blue-700 px-4 py-2 rounded-full hover:text-white transition-all duration-300 hover:shadow-xl group"
              role="button"
            >
              <IoSettingsSharp className="text-2xl transition-all duration-700 group-hover:rotate-180" />
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent className="font-bold">Edit Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* CONTENT DISPLAYED WHEN OPEN */}
      <PopoverContent
        align="center"
        className="bg-transparent/70x bg-black/25X bg-black/90 border-blue-500 border-4 rounded-md w-full relative"
      >
        <p className="text-white text-center mb-4 font-bold text-xl">Settings</p>
        {/* CONTAINS OUR SETTING CONFIGURATIONS */}
        <SettingPanel__ handleCloseCallback={handleClose} />

        {/* CLOSE BTN */}
        <PopoverClose
          className="absolute text-white top-2 right-2 transition-color duration-100 ease-in bg-gray-500 hover:bg-blue-500 p-1"
          onClick={handleClose}
          data-testid="settings-close-btn"
        >
          <FaTimes size={22} />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
