import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Settings {
  numberOne: number;
  numberTwo: number;
  attempts: number;
  questions: number;
}

// Form contents for the Settings Component
const SettingsForm__ = () => {
  return (
    <form className="flex flex-col b w-[300px] gap-1">
      <label htmlFor="firstNumber">Number 1</label>
      <input type="text" name="numberOne" id="firstNumber" className="w-full" required />

      <label htmlFor="secondNumber">Number 2</label>
      <input type="text" name="numberTwo" id="numberTwo" className="w-full" required />

      <label htmlFor="secondNumber">Number of Questions</label>
      <input type="text" name="questions" id="questions" className="w-full" required />

      <label htmlFor="attempts">Attempts Limit</label>
      <input type="text" name="attempts" id="attempts" className="w-full" required />

      <button type="submit" className="bg-blue-500 px-4 py-2 rounded-full w-full">
        Submit
      </button>
    </form>
  );
};

// Settings Component that allows the user to update the value settings(numberOne, numberTwo, # of questions, # of Attempts)
const Settings = () => {
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
      <PopoverContent align="center" className="bg-slate-300 rounded-md w-full">
        <span>Number Limit</span>
        <SettingsForm__ />
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
