import "./globals.css";
// import Navbar from "./components/ui/Navbar";
// import Addition from "./components/ui/Addition";
// import Operation from "./components/ui/Operation";
import { Settings } from "./types/types.ts";
// import TakeHomeProblems from "./components/ui/TakeHomeProblems.tsx";
// import SampleComponent from "./components/ui/sampleTests/SampleComponent.tsx";
// import RestartGameBtn from "./components/ui/RestartGameBtn.tsx";
// import { BrowserRouter as Router, Route, Link, Switch, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";
// import Addition from "./pages/Addition.js";
import Navbar from "./components/ui/Navbar.tsx";
import Home from "./pages/Home.jsx";
import Addition from "./pages/Addition.js";
import Subtraction from "./pages/Subtraction.jsx";
import Multiplication from "./pages/Multiplication.jsx";
import Division from "./pages/Division.jsx";

function App() {
  // Settings will be the default settings upon starting the app.
  const settings: Settings = {
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  };

  return (
    <>
      {/* NAVBAR does not rerender, we only rerender wthin the Routes component */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/subtraction" element={<Subtraction />} />
        <Route path="/multiplication" element={<Multiplication />} />
        <Route path="/division" element={<Division />} />
      </Routes>
    </>
  );
}

export default App;
