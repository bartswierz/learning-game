import { describe, expect, test, beforeEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Problems from "../Problems";
import userEvent from "@testing-library/user-event";
import useSettingsStore from "@/store/store";

const { updateNewNumbers, attemptsLeft } = useSettingsStore.getState();
const INITIAL_ATTEMPTS_LEFT = attemptsLeft;

describe("Problems - Integration", () => {
  beforeEach(() => {
    useSettingsStore.setState({ attemptsLeft: 3, userInput: "" });
  });

  test("if user answers correctly, increment score", async () => {
    const user = userEvent.setup();
    render(<Problems operationType="ADDITION" />);

    // UPDATING OUT STORE NUMBERS TO 1 AND 2 AS THE NUMBERS ARE NORMALLY RANDOMIZED. THIS WAY, WE CAN STILL SIMULATE THE USER FLOW WITH THE BUTTON CLICKS
    act(() => {
      updateNewNumbers(1, 2);
    });

    // <NumberPad />
    const buttonNumberElement = screen.getByRole("button", {
      name: /button-3/i,
    });

    // <CheckAnswerBtn />
    const buttonCheckElement = screen.getByRole("button", {
      name: /check answer/i,
    });

    await user.click(buttonNumberElement);
    await user.click(buttonCheckElement);

    const { score } = useSettingsStore.getState();
    expect(score).toBe(1);
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
});
