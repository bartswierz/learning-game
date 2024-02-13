import { Settings } from "@/types/types";
import DualSlider__ from "./DualSlider";
import Slider__ from "./Slider";
import useSettingsStore from "@/store/store";
import { FormEvent } from "react";

interface SettingsFormProps {
  handleCloseCallback: () => void;
}

const SettingPanel = ({ handleCloseCallback }: SettingsFormProps) => {
  const numOneRange = useSettingsStore((state) => state.settings.numOneRange);
  const numTwoRange = useSettingsStore((state) => state.settings.numTwoRange);
  const numOfAttempts = useSettingsStore((state) => state.settings.numOfAttempts);
  const numOfQuestions = useSettingsStore((state) => state.settings.numOfQuestions);
  const setSettings = useSettingsStore((state) => state.setSettings);

  // Updates the settings state in our SettingsStore
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log("Settings Panel user submitted form e: ", e);
    e.preventDefault();
    console.log("Updating settings...");
    const formData = new FormData(e.target as HTMLFormElement); // Capture the form data

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

    // UPDATING THE SETTINGS WITH THE NEW VALUES
    const newSettings: Settings = {
      numOneRange: updatedNumberOneRange,
      numTwoRange: updatedNumberTwoRange,
      numOfQuestions: updatedQuestionsValue,
      numOfAttempts: updatedAttemptsValue,
    };

    // TODO - add a toast message to let the user know the settings have been updated
    setSettings(newSettings); // RESTARTS THE GAME WITH NEW SETTINGS
    handleCloseCallback(); // CLOSES SETTINGS POPUP
  };

  // the name prop IS being applied to our values, however we have an issue with the dual sliders, the formData only gathers the first vaue
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-8 text-white font-bold">
      <div>
        <label htmlFor="numberOne">1st Number Range (Max: 50)</label>
        <DualSlider__ minValue={numOneRange.min} maxValue={numOneRange.max} name="numberOne" minStepsBetween={1} />
      </div>
      <div>
        <label htmlFor="numberTwo">2nd Number Range (Max: 50)</label>
        <DualSlider__ minValue={numTwoRange.min} maxValue={numTwoRange.max} name="numberTwo" minStepsBetween={1} />
      </div>
      <div>
        <label htmlFor="questions"># of Questions (Max: 50)</label>
        <Slider__ value={numOfQuestions} name="questions" min={5} max={50} step={5} />
      </div>
      <div>
        <label htmlFor="attempts"># of Attempts (Max: 10)</label>
        <Slider__ value={numOfAttempts} name="attempts" min={1} max={10} />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 px-4 py-2 rounded-full">
        Update Settings
      </button>
    </form>
  );
};

export default SettingPanel;
