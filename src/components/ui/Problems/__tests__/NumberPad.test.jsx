// import useSettingsStore from "../../../store/useSettingsStore";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import NumberPad from "../NumberPad";
import useSettingsStore from "../../../../store/store";
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

    user.click(buttonElement);

    await waitFor(() => {
      const { userInput } = useSettingsStore.getState();
      console.log("userInput: ", userInput);

      expect(userInput).toBe("7");
    });
  });

  it("should remove negative sign if it already exists in the userInput", async () => {
    const user = userEvent.setup();

    render(<NumberPad />);

    const buttonSubElement = screen.getByRole("button", { name: "button-subtract" });
    const button8Element = screen.getByRole("button", { name: "button-8" });
    const button9Element = screen.getByRole("button", { name: "button-9" });

    user.click(buttonSubElement);
    user.click(button8Element);
    user.click(button9Element);
    user.click(buttonSubElement);

    await waitFor(() => {
      expect(useSettingsStore.getState().userInput).toBe("89");
    });
  });

  it("should place '-' in front of userInput no matter the order of input", async () => {
    const user = userEvent.setup();

    render(<NumberPad />);

    const buttonSubElement = screen.getByRole("button", { name: "button-subtract" });
    const button8Element = screen.getByRole("button", { name: "button-8" });
    const button9Element = screen.getByRole("button", { name: "button-9" });

    // Button Clicks: '8' => '9' => '-'
    user.click(button8Element);
    user.click(button9Element);
    user.click(buttonSubElement);

    await waitFor(() => {
      const userInput = useSettingsStore.getState().userInput;
      expect(userInput).toBe("-89");
    });
  });

  // Mode to CheckAnswer component
  it.todo("should invoke handleClick function when user clicks the '=' button", () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    const buttonEqualElement = screen.getByRole("button", { name: "button-equal" });

    user.click(buttonEqualElement);
  });

  it("should not allow more than one '.' in the user input value", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    const button1Element = screen.getByRole("button", { name: "button-1" });
    const buttonDotElement = screen.getByRole("button", { name: "button-." });
    const button2Element = screen.getByRole("button", { name: "button-2" });

    // Button Clicks: '1' => '.' => '2' => '.'
    user.click(button1Element);
    user.click(buttonDotElement);
    user.click(button2Element);
    user.click(buttonDotElement);

    await waitFor(() => {
      const userInput = useSettingsStore.getState().userInput;
      expect(userInput).toBe("1.2");
    });
  });

  it("should remove the last character from user input when user clicks undo", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    const button1Element = screen.getByRole("button", { name: "button-1" });
    const button2Element = screen.getByRole("button", { name: "button-2" });
    const buttonUndoElement = screen.getByRole("button", { name: "button-undo" });

    // User clicks, 1, 2, undo
    user.click(button1Element);
    user.click(button2Element);
    user.click(buttonUndoElement);

    await waitFor(() => {
      const userInput = useSettingsStore.getState().userInput;
      expect(userInput).toBe("1");
    });
  });
});
