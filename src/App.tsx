import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Addition from "./components/ui/Addition";
import { Settings } from "./types/index.ts";
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
    <div className="bg-slate-900 text-white max-w-screen max-h-screen overflow-hiddenX overflow-y-hiddenX w-screenX h-screen">
      <Navbar />

      {/* MAIN CONTENT */}
      {/* <Switch>
        <Route exact path="/">
          <Addition settings={settings} />
        </Route>
        <Route path="/Addition">
          <Addition settings={settings} test={"addition route"} />
        </Route>
        <Route path="/Subtraction">
          <Addition settings={settings} test={"subtraction route"} />
        </Route>
        <Route path="/Multiplication">
          <Addition settings={settings} test={"multiplication route"} />
        </Route>
        <Route path="/Division">
          <Addition settings={settings} test={"division route"} />
        </Route>
      </Switch> */}
      <Addition settings={settings} />
    </div>
  );
}

export default App;
