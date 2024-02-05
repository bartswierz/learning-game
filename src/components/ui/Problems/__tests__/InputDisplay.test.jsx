import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import AnswerDisplay from "../InputDisplay";

describe("InputDisplay", () => {
  it("should display the userInput prop passed as the value", () => {
    render(<AnswerDisplay userInput="5" />);

    const spanElement = screen.getByLabelText("user-input-value");

    expect(spanElement).toHaveTextContent("5");
  });

  it.fails("should fail if the prop value passed does not match the value displayed", () => {
    render(<AnswerDisplay userInput="3" />);

    const spanElement = screen.getByLabelText("user-input-value");

    expect(spanElement).toHaveTextContent("5");
  });
});
