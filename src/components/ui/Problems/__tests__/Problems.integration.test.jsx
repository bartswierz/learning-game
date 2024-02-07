import { describe, expect, test, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Problems from "../Problems";
import userEvent from "@testing-library/user-event";
import useSettingsStore from "@/store/store";

const store = useSettingsStore.getState();
// USED FOR RESTORING THE INITIAL ATTEMPTS LEFT AFTER EACH TEST & FOR ASSERTIONS
const INITIAL_ATTEMPTS_LEFT = store.attemptsLeft;

describe("Problems - Integration", () => {
  beforeEach(() => {
    useSettingsStore.setState({ attemptsLeft: INITIAL_ATTEMPTS_LEFT });
  });

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

  test("if user answers incorrectly, decrement attemptsLeft", async () => {
    const user = userEvent.setup();
    render(<Problems operationType="ADDITION" />);

    // <NumberPad />
    const buttonNumberElement = screen.getByRole("button", {
      name: /button-0/i,
    });

    // <CheckAnswerBtn />
    const buttonCheckElement = screen.getByRole("button", {
      name: /check answer/i,
    });

    await user.click(buttonNumberElement);
    await user.click(buttonCheckElement);

    // Getting the updated attemptsLeft from the store
    const { attemptsLeft } = useSettingsStore.getState();

    expect(attemptsLeft).toBe(INITIAL_ATTEMPTS_LEFT - 1);
  });

  test.todo("if user answers correctly, increment score", () => {
    /*
     * CheckAnswerBtn: Click Check Answer button with correct answer
     * Header increases score from 0 to 1
     */
  });
});
