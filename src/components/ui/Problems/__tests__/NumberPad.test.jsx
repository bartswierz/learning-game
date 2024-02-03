// import useSettingsStore from "../../../store/useSettingsStore";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import NumberPad from "../NumberPad";
import useSettingsStore from "../../../../store/store";
import userEvent from "@testing-library/user-event";

describe("NumberPad", () => {
  afterEach(() => {
    // beforeEach(() => {
    // console.log("AFTER EACH");
    //Reset the userInput value before each test
    useSettingsStore.setState({ userInput: "" });
  });

  it.skip("should display the correct number of buttons", () => {
    render(<NumberPad />);
  });

  it("should update userInput to '7' when user clicks 7", async () => {
    const user = userEvent.setup();
    render(<NumberPad userInput="" />);

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
    // it("should remove negative sign if it already exists in the userInput", () => {
    const user = userEvent.setup();
    const { userInput } = useSettingsStore.getState();
    render(<NumberPad userInput={userInput} />);
    // render(<NumberPad userInput="" />);

    const buttonSubElement = screen.getByRole("button", { name: "button-subtract" });
    const button8Element = screen.getByRole("button", { name: "button-8" });
    const button9Element = screen.getByRole("button", { name: "button-9" });

    user.click(buttonSubElement);
    user.click(button8Element);
    user.click(button9Element);

    await waitFor(() => {
      expect(useSettingsStore.getState().userInput).toBe("-89");
    });
  });

  it.todo("should not allow more than one '.' in the user input value");
  it.todo("should invoke handleClick function when user clicks the '=' button");
  it.todo("should remove the last character from the user input value when user clicks the 'undo' button");
  // });
});
