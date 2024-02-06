import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Problems from "../Problems";
import userEvent from "@testing-library/user-event";

describe("Problems - Integration", () => {
  test("if user clicks a number button, it should update the input display", async () => {
    const user = userEvent.setup();
    render(<Problems operationType="ADDITION" />);

    // <NumberPad />
    const buttonElement = screen.getByRole("button", {
      name: /button-1/i,
    });

    await user.click(buttonElement);

    const spanElement = await screen.findByLabelText("user-input-value");
    expect(spanElement).toHaveTextContent("1");
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
});
