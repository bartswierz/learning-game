import "./globals.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import axios from "axios";

// SKELETONS
import HomePageSkeleton from "./components/ui/Skeletons/HomePageSkeleton.tsx";
import OperationsSkeleton from "./components/ui/Skeletons/OperationsSkeleton.tsx";
import AlphabeticalOrderSkeleton from "./components/ui/Skeletons/AlphabeticalOrderSkeleton.tsx";
import AnalogClockSkeleton from "./components/ui/Skeletons/AnalogClockSkeleton.tsx";
import TakeHomeProblemsSkeleton from "./components/ui/Skeletons/TakeHomeProblemsSkeleton.tsx";
// TODO - create a StudentProfileSkeleton once the StudentProfile page is done and replace the fallback with it
// TODO - create a SignInSkeleton once the SignIn page is done and replace the fallback with it
// TODO - create a SignUpSkeleton once the SignUp page is done and replace the fallback with it
// TODO - create a ForgotPasswordSkeleton for the 404 page and replace the fallback with it when we create the 404 page

// LAZY LOADED PAGES
const HomePage = lazy(() => import("./pages/Home.jsx"));
const AdditionPage = lazy(() => import("./pages/Addition.js"));
const SubtractionPage = lazy(() => import("./pages/Subtraction.jsx"));
const MultiplicationPage = lazy(() => import("./pages/Multiplication.jsx"));
const DivisionPage = lazy(() => import("./pages/Division.jsx"));
const TakeHomeProblemsPage = lazy(() => import("./pages/TakeHomeProblems.tsx"));
const AnalogClockPage = lazy(() => import("./pages/AnalogClock.tsx"));
const AlphabeticalOrderPage = lazy(
  () => import("./pages/AlphabeticalOrder.tsx"),
);
const StudentProfilePage = lazy(() => import("./pages/StudentProfile.tsx"));
const SignInPage = lazy(() => import("./pages/SignIn.tsx"));
const SignUpPage = lazy(() => import("./pages/SignUp.tsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.tsx"));

function App() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = ["/signin", "/signup", "/forgot-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

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
        points: 60,
      });
      console.log("Student added:", data);
      await fetchAPI();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <ThemeProvider>
      {/* Navbar is outside the Routes component to prevent unnecessary re-renders of our navbar */}
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<HomePageSkeleton />}>
              <HomePage />
              {/* TODO - placing array from backend for testing purposes - REMOVE AFTER */}
              <div>
                <p>ITEM LIST(From backend API)</p>
                {backendData &&
                  backendData.map((student) => (
                    <div key={student.id}>
                      id:{student.id} - {student.name} - {student.points} pts.
                    </div>
                  ))}
                <button onClick={addStudent}>Add Student</button>
                <button onClick={() => removeStudent(8)}>
                  Remove Student with ID 1
                </button>
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
        <Route
          path="/profile"
          element={
            // TODO - create a StudentProfileSkeleton once the StudentProfile page is done and replace the fallback with it
            <Suspense fallback={<HomePageSkeleton />}>
              <StudentProfilePage />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            // TODO - create a SignInSkeleton once the SignIn page is done and replace the fallback with it
            <Suspense fallback={<HomePageSkeleton />}>
              <SignInPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            // TODO - create a SignUpSkeleton once the SignUp page is done and replace the fallback with it
            <Suspense fallback={<HomePageSkeleton />}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            // TODO - create a ForgotPasswordSkeleton for the 404 page and replace the fallback with it when we create the 404 page
            <Suspense fallback={<HomePageSkeleton />}>
              <ForgotPasswordPage />
            </Suspense>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
