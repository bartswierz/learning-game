import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import CheckAnswerBtn from "../CheckAnswerBtn";
import userEvent from "@testing-library/user-event";
// import { checkAnswer } from "../../../../utils/index";
import * as utils from "../../../../utils/index";

//logTestingPlaygroundURL() for debugging to the browser console
// console.log("checkAnswer: ", checkAnswer);
describe("CheckAnswer", () => {
  it("should invoke checkAnswer function when user clicks button", async () => {
    const checkAnswerSpy = vi.spyOn(utils, "checkAnswer");

    const user = userEvent.setup();

    render(<CheckAnswerBtn text="Check answer" operationType="ADDITION" />);

    const buttonElement = screen.getByRole("button", { name: /check answer/i });

    user.click(buttonElement);

    await waitFor(() => {
      expect(checkAnswerSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("should be disabled on initial render", async () => {
    render(<CheckAnswerBtn text="Check answer" operationType="ADDITION" disabled={true} />);

    const buttonElement = await screen.findByRole("button", { name: /check answer/i });

    expect(buttonElement).toBeDisabled();
  });

  it.todo("should decrease attempts by 1 when user answers incorrectly", () => {});

  it.todo("should end game when the user has no more attempts", () => {});

  it.todo("should end game when the users answers the final question", () => {});
});
