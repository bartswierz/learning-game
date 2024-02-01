import useSettingsStore from "@/store/store";
// import { restartGame } from "@/store/actions";
import RestartBtn from "../RestartBtn";
import { expect, describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("RestartBtn", () => {
  it("renders correctly", () => {
    render(<RestartBtn operationType="ADDITION" />);
    const buttonElement = screen.getByRole("button", { name: /Restart Game/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call restartGame function when clicked", () => {
    // Use the useSettingsStore hook to get a reference to the store
    const store = useSettingsStore.getState();
    // Spy on the restartGame function
    vi.spyOn(store, "restartGame"); //MUST USE vi.spyOn() in order to check if the function was called, how many times, and with what arguments passed

    // Render your component that uses the restartGame function
    render(<RestartBtn operationType="ADDITION" />);

    // LOCATE THE BUTTON
    const buttonElement = screen.getByRole("button", { name: /Restart Game/i });

    // USER CLICKS THE RESTART BUTTON
    fireEvent.click(buttonElement);

    // Check that the restartGame function was called with the expected arguments
    // expect(store.restartGame).toHaveBeenCalledWith(8, 10);
    expect(store.restartGame).toHaveBeenCalledTimes(1);
  });
});
