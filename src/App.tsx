import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Addition from "./components/ui/Addition";
import { Settings } from "./types/index.ts";
// import SampleComponent from "./components/ui/sampleTests/SampleComponent.tsx";
// import RestartGameBtn from "./components/ui/RestartGameBtn.tsx";

function App() {
  // Settings will be the default settings upon starting the app.
  const settings: Settings = {
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  };

  return (
    <div className="bg-slate-900 text-white max-w-screen max-h-screen overflow-hiddenX overflow-y-hiddenX w-screenX h-screen">
      <Navbar />

      {/* MAIN CONTENT */}
      <Addition settings={settings} />
    </div>
  );
}

export default App;
