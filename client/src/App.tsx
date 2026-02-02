import "./globals.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import axios from "axios";

// SKELETONS
import HomePageSkeleton from "./components/ui/Skeletons/HomePageSkeleton.tsx";
import OperationsSkeleton from "./components/ui/Skeletons/OperationsSkeleton.tsx";
import AlphabeticalOrderSkeleton from "./components/ui/Skeletons/AlphabeticalOrderSkeleton.tsx";
import AnalogClockSkeleton from "./components/ui/Skeletons/AnalogClockSkeleton.tsx";
import TakeHomeProblemsSkeleton from "./components/ui/Skeletons/TakeHomeProblemsSkeleton.tsx";
import { use } from "i18next";

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
  const [backendData, setBackendData] = useState([]);
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/students");
    console.log("response", response);
    console.log("response.data.students", response.data.students);
    const studentsList = response.data.students;
    setBackendData(studentsList);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const addStudent = async (): Promise<void> => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/students", {
        name: "New Student",
        points: 60
      });
      console.log("Student added:", data);
      await fetchAPI();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const removeStudent = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`);
      console.log("Student removed:", id);
      await fetchAPI();
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  return (
    <ThemeProvider>
      {/* Navbar is outside the Routes component to prevent unnecessary re-renders of our navbar */}
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <HomePage />
              {/* TODO - placing array from backend for testing purposes - REMOVE AFTER */}
              <div>
                <p>ITEM LIST(From backend API)</p> 
                {backendData && backendData.map((student) => <div key={student.id}>id:{student.id} - {student.name} - {student.points} pts.</div>)}   
                <button onClick={addStudent}>Add Student</button>
                {/* <button onClick={() => removeStudent(8)}>Remove Student with ID 1</button> */}
              </div>
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
        <Route
          path="/take-home-worksheets"
          element={
            <Suspense fallback={<TakeHomeProblemsSkeleton />}>
              <TakeHomeProblemsPage />
            </Suspense>
          }
        />
        <Route
          path="/analog-clock"
          element={
            <Suspense fallback={<AnalogClockSkeleton />}>
              <AnalogClockPage />
            </Suspense>
          }
        />
        <Route
          path="/alphabetical-order"
          element={
            <Suspense fallback={<AlphabeticalOrderSkeleton />}>
              <AlphabeticalOrderPage />
            </Suspense>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
