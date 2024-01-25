import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { IoSettingsSharp } from "react-icons/io5";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/shadcn/tooltip";
import * as Slider from "@radix-ui/react-slider";
import "./shadcn/styles.css";
import useSettingsStore from "@/store/store";
import type { Settings } from "@/types/types";
import { useState } from "react";
import TooltipSlider from "./TooltipSlider";

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
        className="bg-transparent/70x bg-black/25X bg-black/90 border-blue-500 border-4 rounded-md w-full"
      >
        <p className="text-white text-center mb-4 font-bold text-xl">Question Settings</p>
        <SettingsForm__ settings={settings} />
      </PopoverContent>
    </Popover>
  );
};

export default Settings;

interface SettingsFormProps {
  settings: Settings;
}

const SettingsForm__ = ({ settings }: SettingsFormProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
  const setSettings = useSettingsStore((state) => state.setSettings);

  // Updates the settings state in our SettingsStore
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating settings...");
    const formData = new FormData(e.target); // Capture the form data

    // Dual Thumb Slider - returns an array of string values - ex. ['1', '10']
    const numberOneValue = formData.getAll("numberOne[]");
    const numberTwoValue = formData.getAll("numberTwo[]");

    // Single Thumb Slider - returns a single string value - ex. '10'
    const questionsValue = formData.get("questions");
    const attemptsValue = formData.get("attempts");

    const updatedNumberOneRange = { min: Number(numberOneValue[0]), max: Number(numberOneValue[1]) };
    const updatedNumberTwoRange = { min: Number(numberTwoValue[0]), max: Number(numberTwoValue[1]) };
    const updatedQuestionsValue = Number(questionsValue);
    const updatedAttemptsValue = Number(attemptsValue);

    // TODO - update the store with the new values here
    const newSettings: Settings = {
      numOneRange: updatedNumberOneRange,
      numTwoRange: updatedNumberTwoRange,
      numOfQuestions: updatedQuestionsValue,
      numOfAttempts: updatedAttemptsValue,
    };

    // Updates our SettingsStore with the new values
    setSettings(newSettings);

    // Close the Settings popup once the state is updated
    // set it to true when user clicks the settings icon
    // setIsOpen(false); //CLOSES THE SETTINGS POPUP
  };

  // the name prop IS being applied to our values, however we have an issue with the dual sliders, the formData only gathers the first vaue
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8 text-white font-bold">
      <div className="flex flex-col items-center">
        <label htmlFor="numberOne">1st Number Range (Max: 50)</label>
        <SettingDualSlider minValue={numOneRange.min} maxValue={numOneRange.max} name="numberOne" minStepsBetween={1} />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="numberTwo">2nd Number Range (Max: 50)</label>
        <SettingDualSlider minValue={numTwoRange.min} maxValue={numTwoRange.max} name="numberTwo" minStepsBetween={1} />
      </div>
      <div className="w-full ">
        <label htmlFor="questions"># of Questions (Max: 50)</label>
        <SettingSlider value={numOfQuestions} name="questions" min={5} max={50} step={5} />
      </div>
      <div>
        <label htmlFor="attempts"># of Attempts - Value: {numOfAttempts}</label>
        <SettingSlider value={numOfAttempts} name="attempts" min={1} max={10} />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 px-4 py-2 rounded-full">
        Update Settings
      </button>
    </form>
  );
};

interface SettingsDualSliderProps {
  min?: number;
  max?: number;
  minStepsBetween?: number;
  step?: number;
  name: string;
  minValue: number;
  maxValue: number;
}

const SettingDualSlider = ({
  name,
  minValue,
  maxValue,
  min = 1,
  max = 50,
  step = 1,
  minStepsBetween = 1,
}: SettingsDualSliderProps) => {
  const [thumbValueMin, setThumbValueMin] = useState(minValue);
  const [thumbValueMax, setThumbValueMax] = useState(maxValue);

  const handleValueChange = (thumbArray: number[]) => {
    // thumbArray = [min, max]
    setThumbValueMin(thumbArray[0]);
    setThumbValueMax(thumbArray[1]);
  };

  return (
    <Slider.Root
      className="SliderRoot"
      defaultValue={[thumbValueMin, thumbValueMax]}
      min={min}
      max={max}
      step={step}
      minStepsBetweenThumbs={minStepsBetween}
      onValueChange={handleValueChange}
      name={name}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume">
        <TooltipSlider value={thumbValueMin} />
      </Slider.Thumb>
      <Slider.Thumb className="SliderThumb" aria-label="Volume">
        <TooltipSlider value={thumbValueMax} />
      </Slider.Thumb>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

interface SettingsSliderProps {
  name: string;
  value: number; //Current value in our Settings Store
  min?: number;
  max?: number;
  step?: number;
}

const SettingSlider = ({ name, value, min = 1, max = 50, step = 1 }: SettingsSliderProps) => {
  const [thumbValue, setThumbValue] = useState(value); // [min, max

  // Value is an array of numbers, we can use first index using OnValueChange
  const handleValueChange = (thumbArray: number[]) => {
    setThumbValue(thumbArray[0]);
  };

  return (
    <Slider.Root
      className="SliderRoot"
      defaultValue={[thumbValue]}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
      name={name}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume">
        <TooltipSlider value={thumbValue} />
      </Slider.Thumb>
    </Slider.Root>
  );
};
