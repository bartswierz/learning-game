import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import AnswerDisplay from "../InputDisplay";

describe("InputDisplay", () => {
  it("should display the userInput prop passed as the value", () => {
    render(<AnswerDisplay userInput="5" />);

    const spanElement = screen.getByLabelText("user-input-value");

    expect(spanElement).toHaveTextContent("5");
  });
});
