import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Addition from "../Addition";

// Passing dummy data
// const dummySettings = {
//   numOneRange: 1,
//   numTwoRange: 10,
//   numOfAttempts: 3,
//   numOfQuestions: 5,
// };

// describe("<Addition />", () => {
//   test("Clicking 7 should update display to 7", () => {
//     render(<Addition settings={{ numOneRange: 0, numTwoRange: 10, numOfAttempts: 3, numOfQuestions: 5 }} />);

//     const userAnswerDiv = screen.getByTestId("user-answer-input");

//     // Simulate user input/click on the #7 button
//     fireEvent.click(screen.getByText("7"));

//     // Verify that the userAnswer text is displayed correctly
//     expect(userAnswerDiv).toHaveTextContent("7");
//   });
// });

describe("<Addition />", () => {
  it.skip("should update userAnswer when a number button is clicked", () => {
    render(<Addition settings={{ numOneRange: 0, numTwoRange: 10, numOfAttempts: 3, numOfQuestions: 5 }} />);

    // Access the userAnswer state variable and check its value
    const additionComponent = screen.getByTestId("addition-component");

    // Click the button with the number "7"
    fireEvent.click(screen.getByTestId("number-button-7"));

    expect(additionComponent).toHaveAttribute("data-user-answer", "7");
  });
});
