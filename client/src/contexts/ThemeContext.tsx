import { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: (newTheme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("themeBlue");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "themeBlue"; // if no theme is saved, use the default theme
    setTheme(savedTheme);
  }, [theme]);

  // Allow child components to change the theme
  const toggleTheme = (newTheme: string) => {
    // console.log("toggleTheme - newTheme:", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // If user changes theme, save it to localStorage
  };

  // Passing our theme and toggleTheme function to the provider
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
