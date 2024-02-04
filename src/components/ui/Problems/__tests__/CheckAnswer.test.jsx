import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import CheckAnswer from "../CheckAnswer";
import userEvent from "@testing-library/user-event";
// import { checkAnswer } from "../../../../utils/index";
import * as utils from "../../../../utils/index";

// console.log("checkAnswer: ", checkAnswer);
describe("CheckAnswer", () => {
  it.todo("should invoke checkAnswer function when user clicks the '=' button", async () => {
    const checkAnswerSpy = vi.spyOn(utils, "checkAnswer");

    const user = userEvent.setup();

    render(<CheckAnswer />);

    const buttonEqualElement = screen.getByRole("button", { name: "button-=" });

    user.click(buttonEqualElement);

    await waitFor(() => {
      expect(checkAnswerSpy).toHaveBeenCalled();
    });
  });
});
