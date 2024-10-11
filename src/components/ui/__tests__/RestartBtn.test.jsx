import useSettingsStore from "@/store/store";
import RestartBtn from "../RestartBtn";
import { expect, describe, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/test-utils";
const store = useSettingsStore.getState();

describe("RestartBtn", () => {
  it("renders correctly", () => {
    renderWithTheme(<RestartBtn operationType="ADDITION" />);
    const buttonElement = screen.getByRole("button", { name: /Try Again/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call restartGame function when clicked", () => {
    // Use the useSettingsStore hook to get a reference to the store
    // Spy on the restartGame function
    vi.spyOn(store, "restartGame"); //MUST USE vi.spyOn() in order to check if the function was called, how many times, and with what arguments passed

    // Render your component that uses the restartGame function
    renderWithTheme(<RestartBtn operationType="ADDITION" resetTimer={() => {}} />);

    const restartButton = screen.getByRole("button", { name: /Try Again/i });

    fireEvent.click(restartButton);

    // Should invoke restartGame function in setting store
    expect(store.restartGame).toHaveBeenCalledTimes(1);
  });
});
