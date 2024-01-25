import { Settings } from "@/types/types";
import SettingDualSlider from "./DualSlider";
import SettingSlider from "./Slider";
import useSettingsStore from "@/store/store";

interface SettingsFormProps {
  settings: Settings;
}

const SettingsForm = ({ settings }: SettingsFormProps) => {
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
      <div>
        <label htmlFor="numberOne">1st Number Range (Max: 50)</label>
        <SettingDualSlider minValue={numOneRange.min} maxValue={numOneRange.max} name="numberOne" minStepsBetween={1} />
      </div>
      <div>
        <label htmlFor="numberTwo">2nd Number Range (Max: 50)</label>
        <div className="">
          <SettingDualSlider minValue={numTwoRange.min} maxValue={numTwoRange.max} name="numberTwo" minStepsBetween={1} />
        </div>
      </div>
      <div>
        <label htmlFor="questions"># of Questions (Max: 50)</label>
        <SettingSlider value={numOfQuestions} name="questions" min={5} max={50} step={5} />
      </div>
      <div>
        <label htmlFor="attempts"># of Attempts (Max: 10)</label>
        <SettingSlider value={numOfAttempts} name="attempts" min={1} max={10} />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 px-4 py-2 rounded-full">
        Update Settings
      </button>
    </form>
  );
};

export default SettingsForm;
