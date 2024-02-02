// import useSettingsStore from "../../../store/useSettingsStore";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import NumberPad from "../NumberPad";
// import useSettingsStore from "@/store/store";
// import useSettingsStore from "../../../../store/store";
import useSettingsStore from "../../../../store/store";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";

// vi.mock("zustand"); // to make it works like Jest (auto-mocking)

describe("NumberPad", () => {
  it.skip("should display the correct number of buttons", () => {
    render(<NumberPad />);
  });

  it("userClick: should update userInput to 7 when user clicks the button", async () => {
    const user = userEvent.setup();
    render(<NumberPad />);

    // Using aria-label instead of getByText because we also have React-icons as the display for the buttons while they still have a value we can attach to them. ex. Add icon button has a value of "button-add"
    const buttonElement = screen.getByRole("button", { name: "button-7" });

    await waitFor(() => {
      user.click(buttonElement);

      const { userInput } = useSettingsStore.getState();
      console.log("userInput: ", userInput);

      expect(userInput).toBe("7");
    });
  });
  it.todo("should remove '-' if it already exists in the input", () => {});
  it.todo("should not allow more than one '.' in the user input value");
  it.todo("should invoke handleClick function when user clicks the '=' button");
  it.todo("should remove the last character from the user input value when user clicks the 'undo' button");
  // });
});
