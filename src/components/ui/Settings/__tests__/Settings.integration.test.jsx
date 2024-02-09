/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Settings from "../Settings";
import userEvent from "@testing-library/user-event";
import { time } from "console";

// Mock the ResizeObserver to check if our component is visible or not on screen
//Reference: https://vitest.dev/guide/mocking.html
const ResizeObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

vi.stubGlobal("ResizeObserver", ResizeObserverMock);

describe("Settings", () => {
  test("should render the Settings Button", () => {
    render(<Settings />);
    const settingsButton = screen.getByTestId("settings-btn");
    expect(settingsButton).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<Settings />);
    expect(screen.getByTestId("settings-btn")).toBeInTheDocument();
  });

  test("should not be open on render", async () => {
    render(<Settings />);

    const updateButton = screen.queryByRole("button", { name: /update settings/i });

    expect(updateButton).toBeNull();
  });

  // });
  test("should not be visible before clicking the settings button", async () => {
    //we first render the Settings component
    render(<Settings />);

    //we get the settings button by its test id
    const settingsButton = screen.getByTestId("settings-btn");

    // click on it to open the popover
    await userEvent.click(settingsButton);

    // // we check if the "Update Settings" button is visible.
    const updateButton = await screen.findByText(/Update Settings/i);
    expect(updateButton).toBeVisible();
  });

  it.todo("opens the popover when Settings Button is clicked", () => {
    render(<Settings />);

    userEvent.click(screen.getByTestId("settings-btn"));

    expect(screen.getByText("Settings")).toBeInTheDocument();

    userEvent.click(screen.getByText("Settings"));
    expect(screen.queryByText("Settings")).toBeNull();
  });

  it.todo("closes the popover when Update Settings button is clicked", () => {
    render(<Settings />);

    userEvent.click(screen.getByTestId("settings-btn"));
  });

  it.todo("closes the popover when the Close button is clicked", () => {
    render(<Settings />);

    userEvent.click(screen.getByTestId("settings-btn"));
  });

  it.todo("closes the popover when user clicks outside the content area", () => {
    render(<Settings />);

    userEvent.click(screen.getByTestId("settings-btn"));
  });

  test.todo("if user clicks the button, it should open the settings panel(PopoverContent)");

  test.todo("should update the settings values when user clicks update settings button");
});
