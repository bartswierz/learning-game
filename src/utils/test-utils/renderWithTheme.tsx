import { render } from "@testing-library/react";
import { ThemeProvider } from "../../contexts/ThemeContext";

// Utility function to wrap components with ThemeProvider
export const renderWithTheme = (ui, options = {}) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>, options);
};

export default renderWithTheme;
