import { createContext, useState, useContext, useEffect } from "react";

// Create the ThemeContext
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Manage the current theme, with 'theme1' as the default
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme1");

  // When the theme changes, update the `data-theme` attribute and store the preference in localStorage
  useEffect(() => {
    console.log("setting theme!");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // The context value contains the current theme and the function to update it
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
