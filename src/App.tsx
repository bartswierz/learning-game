import "./globals.css";
import Navbar from "./components/ui/Navbar";
// import Addition from "./components/ui/Addition";
import Operation from "./components/ui/Operation";
import { Settings } from "./types/types.ts";
// import TakeHomeProblems from "./components/ui/TakeHomeProblems.tsx";
// import SampleComponent from "./components/ui/sampleTests/SampleComponent.tsx";
// import RestartGameBtn from "./components/ui/RestartGameBtn.tsx";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
function App() {
  // Settings will be the default settings upon starting the app.
  const settings: Settings = {
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  };

  return (
    <div className="bg-slate-900 text-white max-w-screen max-h-screenX overflow-hiddenX overflow-y-hiddenX w-screenX h-screen relative mb-[100px]X">
      <Navbar />
      {/* MAIN CONTENT */}
      {/* <Addition settings={settings} /> */}
      {/* <Operation settings={settings} operationType={"ADDITION"} /> */}
      <Operation settings={settings} operationType={"SUBTRACTION"} />
      {/* <Operation settings={settings} operationType={"MULTIPLICATION"} /> */}
      {/* <Operation settings={settings} operationType={"DIVISION"} /> */}
      {/* <TakeHomeProblems /> */}
    </div>
  );
}

export default App;
