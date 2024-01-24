import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import * as Slider from "@radix-ui/react-slider";
import "./shadcn/styles.css";
import useSettingsStore from "@/store/store";
import type { Settings } from "@/types/types";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

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
        className="bg-transparent/70x bg-black/25X bg-gray-500/50 border-blue-500 border-4 rounded-md w-full"
      >
        <p className="text-white text-center b mb-4 font-bold">Question Settings</p>
        <SettingsForm__ settings={settings} />
      </PopoverContent>
    </Popover>
  );
};

// const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
// */
interface SettingsFormProps {
  settings: Settings;
}
//TODO - add slider range for numberOne and numberTwo
// Form contents for the Settings Component
const SettingsForm__ = ({ settings }: SettingsFormProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;

  // Updates the settings state in our SettingsStore
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside handleSubmit");

    // TODO - update the store with the new values here

    // Close the Settings popup once the state is updated
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8 text-white">
      <div className="b p-2">
        <label htmlFor="numberOne">
          Number 1 Limit - Min Value: {numTwoRange.min} Max Value: {numTwoRange.max}
        </label>
        <SettingDualSlider min={numOneRange.min} max={numOneRange.max} />
      </div>
      <div>
        <label htmlFor="numberTwo">
          Number 2 Limit - Min Value: {numTwoRange.min} Max Value: {numTwoRange.max}
        </label>
        <SettingDualSlider min={numTwoRange.min} max={numTwoRange.max} />
      </div>
      <div>
        <label htmlFor="questions"># of Questions - Value: {numOfQuestions}</label>
        <SettingSlider min={1} max={numOfQuestions} />
      </div>
      <div>
        <label htmlFor="attempts"># of Attempts - Value: {numOfAttempts}</label>
        <SettingSlider min={1} max={numOfAttempts} />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 px-4 py-2 rounded-full">
        Update Settings
      </button>
    </form>
  );
};

interface SettingsSliderProps {
  min?: number;
  max?: number;
  step?: number;
}

const SettingDualSlider = ({ min = 1, max = 100 }: SettingsSliderProps) => {
  console.log("inside SettingsDualSlider");
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

const SettingSlider = ({ min = 1, max = 50, step = 1 }: SettingsSliderProps) => {
  // TODO - replace this with the value from the store
  const [value, setValue] = useState([min]); // [min, max
  console.log("inside SettingsSlider");

  // Prevents the slider from updating the state on every value change, 300ms is the delay until the user stops indicating their value choice
  const debouncedSetValue = debounce((newValue) => {
    console.log("inside debouncedSetValue - newValue: ", newValue);
    setValue(newValue);
  }, 300);

  // Value is an array of numbers, we can use first index using OnValueChange
  const handleValueChange = (e) => {
    // Pass the value to our debounce function
    debouncedSetValue(e[0]);
  };

  return (
    <Slider.Root
      className="SliderRoot"
      defaultValue={[min]}
      min={min}
      max={max}
      step={step}
      minStepsBetweenThumbs={1}
      onValueChange={handleValueChange}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

export default Settings;
