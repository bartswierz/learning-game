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
// const StudentProfilePage = lazy(() => import("./pages/StudentProfile.tsx"));
// const SignInPage = lazy(() => import("./pages/SignIn.tsx"));
// const SignUpPage = lazy(() => import("./pages/SignUp.tsx"));
// const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.tsx"));

function App() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = ["/signin", "/signup", "/forgot-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  // Test API connection to /api/users on backend when app loads using axios and log the response or error to the console
  useEffect(() => {
    console.log("Testing API connection to /api/users...");
    const testApiConnection = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users");
        console.log("API connection successful. Users:", response.data.users);
      } catch (error) {
        console.error("API connection failed:", error);
      }
    };

    testApiConnection();
  }, []);

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
        {/* NOTE - Below are WIP routes*/}
        {/* <Route
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
        />*/}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
