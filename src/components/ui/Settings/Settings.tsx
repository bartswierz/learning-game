import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import "../shadcn/styles.css";
import useSettingsStore from "@/store/store";
import type { Settings } from "@/types/types";
import SettingsForm__ from "./SettingsForm";
import { FaTimes } from "react-icons/fa";

// Settings Component that allows the user to update the value settings(numberOne, numberTwo, # of questions, # of Attempts)
const Settings = () => {
  const { settings } = useSettingsStore();
  console.log("settings from store: ", settings);
  // const { settings } = useSettingsStore();
  return (
    <Popover modal={true}>
      {/* TOOLTIP POPUP */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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

      {/* CONTENT INSIDE POPUP */}
      <PopoverContent
        align="center"
        className="bg-transparent/70x bg-black/25X bg-black/90 border-blue-500 border-4 rounded-md w-full relative"
      >
        <p className="text-white text-center mb-4 font-bold text-xl">Settings</p>
        <SettingsForm__ settings={settings} />
        <PopoverClose className="absolute text-white top-2 right-2">
          <div className="transition-color duration-100 ease-in bg-gray-500 hover:bg-blue-500 p-1">
            <FaTimes size={22} />
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
