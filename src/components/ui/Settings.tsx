import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import * as Slider from "@radix-ui/react-slider";
import "./shadcn/styles.css";

interface Settings {
  numberOne: number;
  numberTwo: number;
  attempts: number;
  questions: number;
}

// Form contents for the Settings Component
// const SettingsForm__ = () => {
//   return (
//     <form className="flex flex-col b w-[300px] gap-1">
//       <label htmlFor="firstNumber">Number 1</label>
//       <input type="text" name="numberOne" id="firstNumber" className="w-full" required />

//       <label htmlFor="secondNumber">Number 2</label>
//       <input type="text" name="numberTwo" id="numberTwo" className="w-full" required />

//       <label htmlFor="secondNumber">Number of Questions</label>
//       <input type="text" name="questions" id="questions" className="w-full" required />

//       <label htmlFor="attempts">Attempts Limit</label>
//       <input type="text" name="attempts" id="attempts" className="w-full" required />

//       <button type="submit" className="bg-blue-500 px-4 py-2 rounded-full w-full">
//         Submit
//       </button>
//     </form>
//   );
// };
const SettingsSlider = () => {
  return (
    <Slider.Root className="SliderRoot" defaultValue={[1, 50]} max={100} step={1} minStepsBetweenThumbs={1}>
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

//TODO - add slider range for numberOne and numberTwo
// Form contents for the Settings Component
const SettingsForm__ = () => {
  return (
    <form className="flex flex-col gap-8 text-white">
      <div>
        <label htmlFor="firstNumber">Number 1 Limit</label>
        <SettingsSlider />
      </div>
      <div>
        <label htmlFor="firstNumber">Number 2 Limit</label>
        <SettingsSlider />
      </div>
      <div>
        <label htmlFor="firstNumber"># of Questions</label>
        <SettingsSlider />
      </div>
      <div>
        <label htmlFor="firstNumber"># of Attempts</label>
        <SettingsSlider />
      </div>
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
      <PopoverContent align="center" className="bg-transparent/70x bg-black/25 border-blue-500 border-4 rounded-md w-full">
        <p className="text-white text-center b mb-4 font-bold">Question Settings</p>
        <SettingsForm__ />
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
