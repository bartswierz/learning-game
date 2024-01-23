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

interface SettingsSliderProps {
  min: number;
  max: number;
}

const SettingsSlider = ({ min = 1, max = 50 }: SettingsSliderProps) => {
  return (
    <Slider.Root className="SliderRoot" defaultValue={[min, max]} max={50} step={1} minStepsBetweenThumbs={1}>
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

// interface Settings {
//   numberOne: number;
//   numberTwo: number;
//   attempts: number;
//   questions: number;
// }
// /* TODO - for testing purposes, using settings from the Operation component
const settings = {
  numOneRange: { min: 1, max: 10 },
  numTwoRange: { min: 1, max: 10 },
  numOfQuestions: 5,
  numOfAttempts: 3,
};

const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
// */
//TODO - add slider range for numberOne and numberTwo
// Form contents for the Settings Component
const SettingsForm__ = () => {
  return (
    <form className="flex flex-col justify-center items-center gap-8 text-white">
      <div className="b p-2">
        <label htmlFor="numberOne">Number 1 Limit - Min Value: Max Value:</label>
        <SettingsSlider min={numOneRange.min} max={numOneRange.max} />
      </div>
      <div>
        <label htmlFor="numberTwo">Number 2 Limit - Min Value: Max Value:</label>
        <SettingsSlider min={numTwoRange.min} max={numTwoRange.max} />
      </div>
      <div>
        <label htmlFor="questions"># of Questions - Min Value: Max Value:</label>
        <SettingsSlider min={1} max={numOfQuestions} />
      </div>
      <div>
        <label htmlFor="attempts"># of Attempts - Min Value: Max Value:</label>
        <SettingsSlider min={1} max={numOfAttempts} />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 px-4 py-2 rounded-full">
        Update Settings
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
      <PopoverContent align="center" className="bg-transparent/70x bg-black/25 border-blue-500 border-4 rounded-md w-full">
        <p className="text-white text-center b mb-4 font-bold">Question Settings</p>
        <SettingsForm__ />
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
