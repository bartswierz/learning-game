import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { FormEvent } from "react";
// import { useState } from "react";

interface Settings {
  numberOne: number;
  numberTwo: number;
  attempts: number;
  questions: number;
}

// Settings Component that allows the user to update the value settings(numberOne, numberTwo, # of questions, # of Attempts)
// TODO - pass in values
const Settings = () => {
  // const [settings, setSettings] = useState({
  //   numberOne: 10,
  //   numberTwo: 10,
  //   attempts: 3,
  //   questions: 5,
  // });

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const form = e.currentTarget as HTMLFormElement;

  //   // Match 4 form inputs to the settings object props
  //   setSettings({
  //     numberOne: form.elements["numberOne"].value,
  //     numberTwo: form.elements["numberTwo"].value,
  //     questions: form.elements["questions"].value,
  //     attempts: form.elements["attempts"].value,
  //   });
  // };

  return (
    <Popover modal={true}>
      <PopoverTrigger className="bg-blue-500 hover:bg-blue-600 hover:ring ring-slate-200 focus:bg-blue-700 px-4 py-2 rounded-full hover:text-white transition-all duration-300 hover:shadow-xl">
        Settings
      </PopoverTrigger>
      {/* <PopoverContent>Place content for the popover here.</PopoverContent> */}
      <PopoverContent align="center" className="bg-slate-300 rounded-md w-full">
        <span>Number Limit</span>
        {/* <form onSubmit={handleSubmit} className="flex flex-col b w-[300px] gap-1"> */}
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
      </PopoverContent>
    </Popover>
  );
};

export default Settings;
