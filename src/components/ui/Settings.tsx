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

export default Settings;

// const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
// */
interface SettingsFormProps {
  settings: Settings;
}
// TODO - updates are updating our store however we are then limited to what value our settings can have. We need to change it so max and minimum are static values of 1 and 100, and have our thumb values be the min and max values passed to them. This way our track stays at 1-100 or 1-50 but our thumbs will still reflect the custom values
//TODO - add slider range for numberOne and numberTwo
//TODO - on submit may allow gathering all 6 data values, we need to add a name or id to each slider to identify which one is which
// Form contents for the Settings Component
const SettingsForm__ = ({ settings }: SettingsFormProps) => {
  const { numOneRange, numTwoRange, numOfAttempts, numOfQuestions } = settings;
  const setSettings = useSettingsStore((state) => state.setSettings);

  // Updates the settings state in our SettingsStore
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside handleSubmit - e: ", e);

    /* Form has 6 inputs input[0-6] - 6 being the button
    0 - numberOne Min & 1 - numberOne MAX 
    2 - numberTwo Min & 3 - numberTwo MAX 
    4 - # of Questions
    5 - # of Attempts
    */
    const formData = new FormData(e.target); // Capture the form data
    console.log("formData: ", formData);

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

    console.log("Number One Value: ", numberOneValue);
    console.log("Number Two Value: ", numberTwoValue);
    console.log("Questions Value: ", questionsValue);
    console.log("Attempts Value: ", attemptsValue);
    // TODO - update the store with the new values here
    const newSettings: Settings = {
      numOneRange: updatedNumberOneRange,
      numTwoRange: updatedNumberTwoRange,
      numOfQuestions: updatedQuestionsValue,
      numOfAttempts: updatedAttemptsValue,
    };

    console.log("new settings: ", newSettings);

    // setSettings((prev) => ({ ...prev, numberOneRange: { min: 1, max: 100 } }));
    setSettings(newSettings);
    // Close the Settings popup once the state is updated
  };

  // the name prop IS being applied to our values, however we have an issue with the dual sliders, the formData only gathers the first vaue
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8 text-white">
      <div className="b p-2">
        <label htmlFor="numberOne">
          Number 1 Limit - Min Value: {numTwoRange.min} Max Value: {numTwoRange.max}
        </label>
        <SettingDualSlider min={numOneRange.min} max={numOneRange.max} name="numberOne" />
      </div>
      <div>
        <label htmlFor="numberTwo">
          Number 2 Limit - Min Value: {numTwoRange.min} Max Value: {numTwoRange.max}
        </label>
        <SettingDualSlider min={numTwoRange.min} max={numTwoRange.max} name="numberTwo" />
      </div>
      <div>
        <label htmlFor="questions"># of Questions - Value: {numOfQuestions}</label>
        <SettingSlider min={1} max={numOfQuestions} name="questions" />
      </div>
      <div>
        <label htmlFor="attempts"># of Attempts - Value: {numOfAttempts}</label>
        <SettingSlider min={1} max={numOfAttempts} name="attempts" />
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
  name: string;
}

// TODO - in charge of Min and Max values - need to pass which type its for
const SettingDualSlider = ({ min = 1, max = 100, name }: SettingsSliderProps) => {
  // console.log("inside SettingsDualSlider");
  const [value, setValue] = useState([min]); // [min, max

  // Prevents the slider from updating the state on every value change, 300ms is the delay until the user stops indicating their value choice
  const debouncedSetValue = debounce((newValue) => {
    console.log("inside debouncedSetValue - newValue: ", newValue);
    // IF - Number One Slider - update min/max for numberOne - e[0] = min value, e[1] = max value
    // IF - Number Two Slider - update min/max for numberTwo - e[0] = min value, e[1] = max value
    setValue(newValue);
  }, 300);

  // Value is an array of numbers, we can use first index using OnValueChange
  const handleValueChange = (e) => {
    // e[0] = min value, e[1] = max value
    // console.log("dual value change e: ", e[0], e[1]);
    // console.log("dual value change e: ", e);
    // Pass the value to our debounce function
    debouncedSetValue(e);
  };

  return (
    <Slider.Root
      className="SliderRoot"
      defaultValue={[min, max]}
      min={min}
      max={50}
      step={1}
      minStepsBetweenThumbs={1}
      onValueChange={handleValueChange}
      name={name}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};

const SettingSlider = ({ min = 1, max = 50, step = 1, name }: SettingsSliderProps) => {
  // TODO - replace this with the value from the store
  const [value, setValue] = useState([min]); // [min, max
  // console.log("inside SettingsSlider");

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
      name={name}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" aria-label="Volume" />
    </Slider.Root>
  );
};
