import { render } from "@testing-library/react";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { ReactElement } from "react";

// Utility function to wrap components with ThemeProvider
export const renderWithTheme = (ui: ReactElement, options = {}) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>, options);
};

export default renderWithTheme;
