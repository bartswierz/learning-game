import "./globals.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar.tsx";

// Lazy loading - only load the component when the user navigates to the page to decrease the initial load time when app is first loaded
const Home = lazy(() => import("./pages/Home.jsx"));
const Addition = lazy(() => import("./pages/Addition.js"));
const Subtraction = lazy(() => import("./pages/Subtraction.jsx"));
const Multiplication = lazy(() => import("./pages/Multiplication.jsx"));
const Division = lazy(() => import("./pages/Division.jsx"));
const TakeHomeProblems = lazy(() => import("./pages/TakeHomeProblems.tsx"));

function App() {
  return (
    <div className="h-full pb-[5vh]">
      {/* NAVBAR does not rerender, we only rerender wthin the Routes component */}
      <Navbar />
      {/* TODO - add Skeleton Component for fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addition" element={<Addition />} />
          <Route path="/subtraction" element={<Subtraction />} />
          <Route path="/multiplication" element={<Multiplication />} />
          <Route path="/division" element={<Division />} />
          {/* <Route path="/pdf" element={<TakeHomeProblems />} /> */}
          <Route path="/take-home-worksheets" element={<TakeHomeProblems />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
