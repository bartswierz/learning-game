import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // const [theme, setTheme] = useState("theme1");
  const [theme, setTheme] = useState("themeRed");

  useEffect(() => {
    // const savedTheme = localStorage.getItem("theme") || "theme1"; // if no theme is saved, use the default theme
    const savedTheme = localStorage.getItem("theme") || "themeRed"; // if no theme is saved, use the default theme
    setTheme(savedTheme);
  }, [theme]);

  // Allow child components to change the theme
  const toggleTheme = (newTheme) => {
    console.log("toggleTheme - newTheme:", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // If user changes theme, save it to localStorage
  };

  // Passing our theme and toggleTheme function to the provider
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
