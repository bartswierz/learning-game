/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, test, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Settings from "../Settings";
import userEvent from "@testing-library/user-event";
import { time } from "console";
// import useSettingsStore from "../../../store/useSettingsStore";
// import useSettingsStore from "@/store/store";
// import useSettingsStore from "../../../../store/store";
import useSettingsStore from "@/store/store";
// Mock the ResizeObserver to check if our component is visible or not on screen
//Reference: https://vitest.dev/guide/mocking.html
// const ResizeObserverMock = vi.fn(() => ({
//   disconnect: vi.fn(),
//   observe: vi.fn(),
//   unobserve: vi.fn(),
// }));

// vi.stubGlobal("ResizeObserver", ResizeObserverMock);
const { numOfQuestions } = useSettingsStore.getState();
// const store = useSettingsStore.getState();
console.log("numOfQuestions: ", numOfQuestions);

describe("Settings", () => {
  /*
  data-testids:
  slider-numberOne-1
  slider-numberOne-2
  slider-numberTwo-1
  slider-numberTwo-2
  slider-questions
  slider-attempts

  =====================
  aria-labels
  numberOne-thumb-min
  numberOne-thumb-max
  numberTwo-thumb-min
  numberTwo-thumb-max
  questions-thumb
  attempts-thumb

  DEFAULT SETTINGS IN STORE:
  settings: {
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  }
  */
  // DONT TEST THE FLOW OF THE SLIDER AS THE COMPONENTS ARE FROM A EXTERNAL LIBRARY - INSTEAD TEST THE VALUES MATCH THE ONES FROM THE STORE & WHEN USER SUBMITS THE FORM, CHECK IF THE GAME HAS RESTARTED
  //CHECK IF SUBMISSION DISPLAYS A POPUP WITH A MESSAGE, "UPDATING SETTINGS WILL RESTART THE GAME, ARE YOU SURE?"
  it("Question should use the initial value from store", async () => {
    const user = userEvent.setup();
    const {
      settings: { numOfQuestions },
    } = useSettingsStore.getState();
    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // Find the slider element
    const sliderThumbElement = screen.getByRole("slider", { name: /questions-thumb/i });

    // Get the value of the aria-valuenow attribute
    const ariaValueNow = sliderThumbElement.getAttribute("aria-valuenow");

    // Convert numOfQuestions(number=>string) because getAttribute returns a string
    const numOfQuestionsString = String(numOfQuestions);

    // Assert that the value of aria-valuenow is '10'
    expect(ariaValueNow).toBe(numOfQuestionsString);
  });

  it("Attempts should use the initial value from store", async () => {
    const user = userEvent.setup();
    const {
      settings: { numOfAttempts },
    } = useSettingsStore.getState();
    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // Find the slider element
    const sliderThumbElement = screen.getByRole("slider", { name: /attempts-thumb/i });

    // Get the value of the aria-valuenow attribute
    const ariaValueNow = sliderThumbElement.getAttribute("aria-valuenow");

    // Convert numOfQuestions(number=>string) because getAttribute returns a string
    const numOfAttemptsString = String(numOfAttempts);

    // Assert that the value of aria-valuenow is '10'
    expect(ariaValueNow).toBe(numOfAttemptsString);
  });

  it("1st Number Range should use the initial value from store", async () => {
    const user = userEvent.setup();
    // DESTRUCTURING MIN & MAX FROM STORE
    const {
      settings: {
        numOneRange: { min, max },
      },
    } = useSettingsStore.getState();
    console.log("Number One Range: ", min, max);

    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // Find the slider element
    const sliderThumbMinElement = screen.getByRole("slider", { name: /numberOne-min-range/i });
    const sliderThumbMaxElement = screen.getByRole("slider", { name: /numberOne-max-range/i });

    // Get the value of the aria-valuenow attribute
    const ariaValueNowMin = sliderThumbMinElement.getAttribute("aria-valuenow");
    const ariaValueNowMax = sliderThumbMaxElement.getAttribute("aria-valuenow");

    // Assert that the value of aria-valuenow is '10'
    expect(Number(ariaValueNowMin)).toBe(min);
    expect(Number(ariaValueNowMax)).toBe(max);
  });

  it("2nd Number Range should use the initial value from store", async () => {
    const user = userEvent.setup();
    // DESTRUCTURING MIN & MAX FROM STORE
    const {
      settings: {
        numTwoRange: { min, max },
      },
    } = useSettingsStore.getState();

    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // DUAL SLIDER THUMBS
    const sliderThumbMinElement = screen.getByRole("slider", { name: /numberTwo-min-range/i });
    const sliderThumbMaxElement = screen.getByRole("slider", { name: /numberTwo-max-range/i });

    // MIN VALUE
    const ariaValueNowMin = sliderThumbMinElement.getAttribute("aria-valuenow");
    expect(Number(ariaValueNowMin)).toBe(min);

    // MAX VALUE
    const ariaValueNowMax = sliderThumbMaxElement.getAttribute("aria-valuenow");
    expect(Number(ariaValueNowMax)).toBe(max);
  });

  test("should have the Settings Button visible on app start", () => {
    render(<Settings />);
    const settingsButton = screen.getByTestId("settings-open-btn");
    expect(settingsButton).toBeInTheDocument();
  });

  test("should not be open/visible on app start", async () => {
    render(<Settings />);

    const updateButton = screen.queryByRole("button", { name: /update settings/i });

    expect(updateButton).toBeNull();
  });

  // });
  test("should open panel after clicking settings button", async () => {
    //we first render the Settings component
    render(<Settings />);

    //we get the settings button by its test id
    const settingsOpenButton = screen.getByTestId("settings-open-btn");

    // click on it to open the popover
    await userEvent.click(settingsOpenButton);

    // // we check if the "Update Settings" button is visible.
    const updateButton = await screen.findByText(/Update Settings/i);
    expect(updateButton).toBeVisible();
  });

  // it("closes the popover when Update Settings button is clicked", async () => {
  it("should close panel when the Close Button inside panel is clicked", async () => {
    const user = userEvent.setup();
    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // CLOSE SETTINGS POPUP
    const closeBtnElement = screen.getByTestId("settings-close-btn");
    await user.click(closeBtnElement);

    const updateButton = screen.queryByRole("button", { name: /update settings/i });

    // ASSERT THAT THE UPDATE BUTTON IS NOT VISIBLE
    expect(updateButton).toBeNull();
  });

  it("Update settings button should be disabled when theres no changes ", async () => {
    const user = userEvent.setup();
    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // GET THE UPDATE SETTINGS BUTTON
    const updateButton = screen.getByRole("button", { name: /update settings/i });

    // EXPECT THE BUTTON TO BE DISABLED
    expect(updateButton).toBeDisabled();
  });

  it.todo("closes the popover when Update Settings button is clicked", async () => {});

  it("closes the popover when user clicks outside the content area", async () => {
    const user = userEvent.setup();
    render(<Settings />);

    // OPEN SETTINGS POPUP
    const settingsOpenButton = screen.getByTestId("settings-open-btn");
    await user.click(settingsOpenButton);

    // CLICK OUTSIDE THE POPUP TO CLOSE IT
    await user.click(document.body);

    const updateButton = screen.queryByRole("button", { name: /update settings/i });
    expect(updateButton).not.toBeInTheDocument();
  });

  test.todo("update the settings values when user clicks update settings button");
});
