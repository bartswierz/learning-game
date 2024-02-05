import { describe, it, expect, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Problems from "../Problems";
import userEvent from "@testing-library/user-event";

describe.todo("Problems - Integration", () => {
  // render(<Problems operationType="ADDITION" />); // Adjust props as needed
  test.todo("if user clicks a number button, it should update the input display", () => {
    /*
     * Number Click in NumberPad, InputDisplay updates with number as the text to search for
     */
  });

  test.todo('if user answers incorrectly, it should decrease "attempts" by 1', () => {
    /*
     * CheckAnswerBtn: Click Check Answer button with incorrect answer
     * Header updates with "attempts" left
     */
    // const paragraphElement = screen.getByText(/attempts left/i);
    // expect(paragraphElement);
  });

  test.todo("if user answers correctly, increase score by 1", () => {
    /*
     * CheckAnswerBtn: Click Check Answer button with correct answer
     * Header increases score from 0 to 1
     */
  });

  // Query for elements and perform assertions
  // const headerElement = screen.getByText(/Header text/i); // Adjust to match your Header component content
  // const questionElement = screen.getByText(/Question text/i); // Adjust to match your Question component content
  // const inputDisplayElement = screen.getByTestId("input-display"); // Use data-testid if available
  // const checkAnswerBtnElement = screen.getByRole("button", { name: /Check Answer/i }); // Use role if available
  // const numberPadElement = screen.getByTestId("number-pad"); // Use data-testid if available

  // // Add your assertions here to check the presence and behavior of child components
  // expect(headerElement).toBeInTheDocument();
  // expect(questionElement).toBeInTheDocument();
  // expect(inputDisplayElement).toBeInTheDocument();
  // expect(checkAnswerBtnElement).toBeInTheDocument();
  // expect(numberPadElement).toBeInTheDocument();

  // // You can also simulate user interactions and test component behavior
  // // For example, clicking a button and checking the updated state or UI
  // // fireEvent.click(checkAnswerBtnElement);
});
