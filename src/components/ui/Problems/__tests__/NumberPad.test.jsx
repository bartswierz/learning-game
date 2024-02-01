import { describe, it, expect } from "vitest";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import NumberPad from "../NumberPad";
// import useSettingsStore from "../../../store/useSettingsStore";
import useSettingsStore from "@/store/store";

// const store = useSettingsStore.getState();
const { userInput } = useSettingsStore.getState();
console.log("userInput type: ", typeof userInput);
describe("NumberPad", () => {
  it.skip("should display the correct number of buttons", () => {
    render(<NumberPad />);
  });

  it("should place '-' sign to the left-hand side of the user input value when clicked", async () => {
    render(<NumberPad />);
    // const userInputValue = store.userInput;

    // Using aria-label instead of getByText because we also have React-icons as the display for the buttons while they still have a value we can attach to them. ex. Add icon button has a value of "button-add"
    const buttonElement = screen.getByRole("button", { name: "button-7" });
    // const buttonElement = screen.getByText("7");

    fireEvent.click(buttonElement);
    // Find the '-' button

    // Using waitFor to wait for our Store to update
    // await waitFor(
    //   () => {
    //     // const userInputValue = useSettingsStore.getState().userInput;
    //     const { userInput } = useSettingsStore.getState();
    //     // console.log("WAITFOR: userInputValue", userInputValue);
    //     console.log("WAITFOR: userInputValue", userInput);
    //     // expect(userInputValue).toEqual("7");
    //     // expect(userInput).toBe(7).toHaveBeenCalledTimes(1);
    //     expect(userInput).toEqual("7");
    //   },
    //   { timeout: 1000 }
    // );
    // console.log("OUTSIDE WAITFOR: userInputValue", userInputValue);
  });
  it.todo("should remove '-' if it already exists in the input", () => {});
  it.todo("should not allow more than one '.' in the user input value");
  it.todo("should invoke handleClick function when user clicks the '=' button");
  it.todo("should remove the last character from the user input value when user clicks the 'undo' button");
});
