import { screen } from "@testing-library/react";
import DisplayResults from "../DisplayResults";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { renderWithTheme } from "../../../../../utils/test-utils";

describe("DisplayResults", () => {
  it("should display the correct number of correct Questions", () => {
    renderWithTheme(
      <MemoryRouter>
        <DisplayResults score={6} numOfQuestions={10} operationType="ADDITION" />
      </MemoryRouter>
    );

    const questionElement = screen.getByText(/Questions: 6 \/ 10/i);
    expect(questionElement).toBeInTheDocument();
  });

  it("should display the correct score(%)", () => {
    renderWithTheme(
      <MemoryRouter>
        <DisplayResults score={5} numOfQuestions={10} operationType="ADDITION" />
      </MemoryRouter>
    );

    const percentageElement = screen.getByText(/50%/i);
    expect(percentageElement).toBeInTheDocument();
  });
});
