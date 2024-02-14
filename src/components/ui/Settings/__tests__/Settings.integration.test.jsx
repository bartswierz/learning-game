/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
    const settingsButton = screen.getByTestId("settings-btn");
    await user.click(settingsButton);

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
    const settingsButton = screen.getByTestId("settings-btn");
    await user.click(settingsButton);

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
    const settingsButton = screen.getByTestId("settings-btn");
    await user.click(settingsButton);

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
    const settingsButton = screen.getByTestId("settings-btn");
    await user.click(settingsButton);

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
    const settingsButton = screen.getByTestId("settings-btn");
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
    const settingsButton = screen.getByTestId("settings-btn");

    // click on it to open the popover
    await userEvent.click(settingsButton);

    // // we check if the "Update Settings" button is visible.
    const updateButton = await screen.findByText(/Update Settings/i);
    expect(updateButton).toBeVisible();
  });

  it.todo("closes the popover when Update Settings button is clicked", () => {});

  it.todo("should close panel when the Close Button is clicked", () => {});

  it.todo("closes the popover when user clicks outside the content area", () => {});

  test.todo("update the settings values when user clicks update settings button");
});
