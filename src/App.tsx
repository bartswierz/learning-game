import "./globals.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar.tsx";
import Home from "./pages/Home.jsx";
import Addition from "./pages/Addition.js";
import Subtraction from "./pages/Subtraction.jsx";
import Multiplication from "./pages/Multiplication.jsx";
import Division from "./pages/Division.jsx";

function App() {
  // Settings will be the default settings upon starting the app.

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
