import "./globals.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar.tsx";

// SKELETONS
import HomePageSkeleton from "./components/ui/Skeletons/HomePageSkeleton.tsx";
import OperationsSkeleton from "./components/ui/Skeletons/OperationsSkeleton.tsx";

// LAZY LOADED PAGES
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
      {/* Navbar is outside the Routes component to prevent uncessary re-renders of our navbar */}
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/addition"
          element={
            <Suspense fallback={<OperationsSkeleton />}>
              <AdditionPage />
            </Suspense>
          }
        />
        <Route
          path="/subtraction"
          element={
            <Suspense fallback={<OperationsSkeleton />}>
              <SubtractionPage />
            </Suspense>
          }
        />
        <Route
          path="/multiplication"
          element={
            <Suspense fallback={<OperationsSkeleton />}>
              <MultiplicationPage />
            </Suspense>
          }
        />
        <Route
          path="/division"
          element={
            <Suspense fallback={<OperationsSkeleton />}>
              <DivisionPage />
            </Suspense>
          }
        />
        <Route path="/take-home-worksheets" element={<TakeHomeProblemsPage />} />
        <Route path="/analog-clock" element={<AnalogClockPage />} />
        <Route path="/alphabetical-order" element={<AlphabeticalOrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
