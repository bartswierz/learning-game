import "./globals.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar.tsx";

// Lazy Loading Pages
const HomePage = lazy(() => import("./pages/Home.jsx"));
const AdditionPage = lazy(() => import("./pages/Addition.js"));
const SubtractionPage = lazy(() => import("./pages/Subtraction.jsx"));
const MultiplicationPage = lazy(() => import("./pages/Multiplication.jsx"));
const DivisionPage = lazy(() => import("./pages/Division.jsx"));
const TakeHomeProblemsPage = lazy(() => import("./pages/TakeHomeProblems.tsx"));
const AnalogClockPage = lazy(() => import("./pages/AnalogClock.tsx"));
const AlphabeticalOrderPage = lazy(() => import("./pages/AlphabeticalOrder.tsx"));

function App() {
  return (
    <div className="h-full pb-[5vh]">
      {/* NAVBAR does not rerender, we only rerender wthin the Routes component */}
      <Navbar />
      {/* TODO - add Skeleton Component for fallback */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addition" element={<AdditionPage />} />
          <Route path="/subtraction" element={<SubtractionPage />} />
          <Route path="/multiplication" element={<MultiplicationPage />} />
          <Route path="/division" element={<DivisionPage />} />
          <Route path="/take-home-worksheets" element={<TakeHomeProblemsPage />} />
          <Route path="/analog-clock" element={<AnalogClockPage />} />
          <Route path="/alphabetical-order" element={<AlphabeticalOrderPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
