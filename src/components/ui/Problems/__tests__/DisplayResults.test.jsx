import { render, screen } from "@testing-library/react";
import DisplayResults from "../DisplayResults";
import { describe, it, expect } from "vitest";

describe.only("DisplayResults", () => {
  it("should display the correct number of correct Questions", () => {
    render(<DisplayResults score={6} numOfQuestions={10} operationType="ADDITION" />);

    const questionElement = screen.getByText(/Questions: 6 \/ 10/i);
    expect(questionElement).toBeInTheDocument();
  });

  it("should display the correct score(%)", () => {
    render(<DisplayResults score={5} numOfQuestions={10} operationType="ADDITION" />);

    const percentageElement = screen.getByText(/50%/i);
    expect(percentageElement).toBeInTheDocument();
  });
});
