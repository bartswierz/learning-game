import Question from "../Question";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Question Component", () => {
  it("renders without crashing", () => {
    // const renderedQuestion = render(<Question operationType="ADDITION" />);
    render(<Question operationType="ADDITION" />);
    expect(screen.getByText(/=/)).toBeInTheDocument();
  });

  // TESTING TO ENSURE THE CORRECT OPERATION ICON IS DISPLAYED
  it("displays the addition operation icon", () => {
    render(<Question operationType="ADDITION" />);
    const icon = screen.getByTestId("add-icon");
    expect(icon).toBeVisible();
  });

  it("should display the division operation icon", () => {
    render(<Question operationType="DIVISION" />);
    const icon = screen.getByTestId("divide-icon");
    expect(icon).toBeVisible();
  });
});
