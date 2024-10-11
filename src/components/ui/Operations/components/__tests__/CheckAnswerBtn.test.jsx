import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import CheckAnswerBtn from "../CheckAnswerBtn";
import userEvent from "@testing-library/user-event";
import * as utils from "../../../../../utils/index";
import { renderWithTheme } from "../../../../../utils/test-utils";

describe("CheckAnswer", () => {
  it("should invoke checkAnswer function when user clicks button", async () => {
    const checkAnswerSpy = vi.spyOn(utils, "checkAnswer");

    const user = userEvent.setup();

    renderWithTheme(<CheckAnswerBtn text="Check answer" operationType="ADDITION" />);

    const buttonElement = screen.getByRole("button", { name: /button-equal/i });

    user.click(buttonElement);

    await waitFor(() => {
      expect(checkAnswerSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("should be disabled on initial render", async () => {
    renderWithTheme(<CheckAnswerBtn text="Check answer" operationType="ADDITION" disabled />);

    const buttonElement = await screen.findByRole("button", { name: /button-equal/i });

    expect(buttonElement).toBeDisabled();
  });

  it.todo("should end game when the user has no more attempts", () => {});

  it.todo("should end game when the users answers the final question", () => {});
});
