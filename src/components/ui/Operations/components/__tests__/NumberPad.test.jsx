/* eslint-disable @typescript-eslint/no-unused-vars */
// import useSettingsStore from "../../../store/useSettingsStore";
import { describe, it, expect, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import NumberPad from "../NumberPad";
import useSettingsStore from "../../../../../store/store";
import userEvent from "@testing-library/user-event";

describe("NumberPad", () => {
  // RESETS userInput to an empty string BEFORE EACH TEST
  beforeEach(() => {
    useSettingsStore.setState({ userInput: "" });
  });

  it("should update userInput to '7' when user clicks 7", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    // aria-label = "button-7"
    const buttonElement = screen.getByRole("button", { name: "button-7" });

    await user.click(buttonElement);

    const { userInput } = useSettingsStore.getState();
    console.log("userInput: ", userInput);

    expect(userInput).toBe("7");
  });

  it("should remove negative sign if it already exists when clicked a second time", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    const buttonSubElement = screen.getByRole("button", { name: "button-subtract" });
    const button8Element = screen.getByRole("button", { name: "button-8" });
    const button9Element = screen.getByRole("button", { name: "button-9" });

    await user.click(buttonSubElement);
    await user.click(button8Element);
    await user.click(button9Element);
    await user.click(buttonSubElement);

    const { userInput } = useSettingsStore.getState();
    console.log("userInput from store: ", userInput);
    expect(useSettingsStore.getState().userInput).toBe("89");
  });

  it("should place negative sign in front of user input no matter the order of input", async () => {
    const user = userEvent.setup();

    render(<NumberPad />);

    const buttonSubElement = screen.getByRole("button", { name: "button-subtract" });
    const button8Element = screen.getByRole("button", { name: "button-8" });
    const button9Element = screen.getByRole("button", { name: "button-9" });

    // Button Clicks: '8' => '9' => '-'
    await user.click(button8Element);
    await user.click(button9Element);
    await user.click(buttonSubElement);

    const userInput = useSettingsStore.getState().userInput;
    expect(userInput).toBe("-89");
  });

  it("should not allow more than one '.' in the user input value", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    const button1Element = screen.getByRole("button", { name: "button-1" });
    const buttonDotElement = screen.getByRole("button", { name: "button-." });
    const button2Element = screen.getByRole("button", { name: "button-2" });

    // Button Clicks: '1' => '.' => '2' => '.'
    await user.click(button1Element);
    await user.click(buttonDotElement);
    await user.click(button2Element);
    await user.click(buttonDotElement);

    const userInput = useSettingsStore.getState().userInput;
    expect(userInput).toBe("1.2");
  });

  it("should remove the last character from user input when user clicks undo", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    const button1Element = screen.getByRole("button", { name: "button-1" });
    const button2Element = screen.getByRole("button", { name: "button-2" });
    const buttonUndoElement = screen.getByRole("button", { name: "button-undo" });

    // User clicks, 1 => 2 => undo
    await user.click(button1Element);
    await user.click(button2Element);
    await user.click(buttonUndoElement);

    const userInput = useSettingsStore.getState().userInput;
    expect(userInput).toBe("1");
  });
});
