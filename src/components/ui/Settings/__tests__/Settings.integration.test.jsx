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

const store = useSettingsStore.getState();
console.log("store: ", store);

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
  /*
   * Render settings
   * Find the slider for questions
   * Move the slider
   * Check if the value has changed
   */
  // DONT TEST THE FLOW OF THE SLIDER AS THE COMPONENTS ARE FROM A EXTERNAL LIBRARY - INSTEAD TEST THE VALUES MATCH THE ONES FROM THE STORE & WHEN USER SUBMITS THE FORM, CHECK IF THE GAME HAS RESTARTED
  //CHECK IF SUBMISSION DISPLAYS A POPUP WITH A MESSAGE, "UPDATING SETTINGS WILL RESTART THE GAME, ARE YOU SURE?"
  it.skip("found the value for questions range", async () => {
    const user = userEvent.setup();
    render(<Settings />);

    // Find the settings button to click - this will open popover so we can then find the slider via data-testid
    const settingsButton = screen.getByTestId("settings-btn");
    await user.click(settingsButton);

    // Needs to be open to be seen
    // const sliderElement = screen.getByLabelText("questions-thumb");
    const sliderElement = screen.getByRole("slider", { name: /questions-thumb/i });
    expect(sliderElement).toBeInTheDocument(); // Passes

    // ROLE = 'slider', aria-label='questions-thumb', aria-valuenow='5' -> need to change it to 10
    // expect(screen.getByTestId("slider-questions")).toBeInTheDocument(); // Passes - found
    // expect(screen.getByTestId("slider-questions")).toHaveTextContent(/5/i); // Passes - VALUE found
    // const inputElement = await screen.findByRole("input", { name: /questions/i });
    // Wait for the input element to become visible
    const inputElement = screen.findByRole("input", { name: /questions/i, hidden: true });
    console.log("inputElement: ", inputElement);

    const ariaValueNow = sliderElement.getAttribute("aria-valuenow");
    // fireEvent.change(getByTestId("slider"), { target: { value: 25 } });
    // fireEvent.change(sliderElement, { target: { value: 25 } });
    // fireEvent.change(inputElement, { target: { value: 25 } });
    // fireEvent.change(ariaValueNow, { target: { value: 25 } });
    // fireEvent.change(ariaValueNow, { ariaValueNow: { value: 25 } });
    // fireEvent.change(sliderElement, { target: { value: 10 } });
    // screen.getByRole("link", {name: /addition/i,});
    // fireEvent.change(inputElement, { target: { value: 10 } });
    // fireEvent.change(inputElement, { target: { value: 10, hidden: true } });

    // Get the value of the aria-valuenow attribute
    // expect(inputElement.value).toBe("10");
    expect(ariaValueNow).toBe("25");
    // expect(await screen.findByTestId("slider-questions")).toHaveTextContent(/10/i); // Passes - found
  });

  it("question starting value should use value from store", async () => {
    const { numOfQuestions } = useSettingsStore.getState();
    console.log("numOfQuestions: ", numOfQuestions);
    render(<Settings />);
    // const numOfQuestions = await useSettingsStore.getState().numOfQuestions;
    // console.log("NUM OF QUESTIONS: ", numOfQuestions);
    // OPEN SETTINGS POPUP
    const settingsButton = screen.getByTestId("settings-btn");
    await userEvent.click(settingsButton);

    // Find the slider element
    const sliderElement = screen.getByRole("slider", { name: /questions-thumb/i });
    expect(sliderElement).toBeInTheDocument();

    // USER MOVES VALUE TO 10 - Fire a change event on the slider element
    // fireEvent.change(sliderElement, { target: { value: "10" } });

    // Get the value of the aria-valuenow attribute
    const ariaValueNow = sliderElement.getAttribute("aria-valuenow");

    // Assert that the value of aria-valuenow is '10'
    // Update to equal the value from our store
    // TODO - update it to be the value from the store
    // expect(ariaValueNow).toBe("5");
    expect(ariaValueNow).toBe(numOfQuestions);
    // expect(ariaValueNow).toBe(useSettingsStore.getState().numOfQuestions);
  });

  it.skip("value changes when slider is moved", () => {
    // Render the component with an initial value
    // const { rerender } = render(<Slider name="volume" value={30} />);
    const { rerender } = render(<Settings name="volume" value={30} />);

    /*
    use the data-testid we placed on the slider value to check if the getByText method returns the correct value
    */
    // Find the slider
    // const slider = screen.getByTestId("tooltip-slider");
    // const sliderElement = screen.getAllByRole("input", "numberOne[]");
    // Find the hidden input element
    // console.log("sliderElement: ", sliderElement);
    // const inputElement = screen.getByLabelText("numberOne[]", { selector: 'input[name="numberOne[]"]', hidden: true });
    // console.log("inputElement: ", inputElement);

    const sliderElement = screen.getByTestId("slider-questions");
    expect(sliderElement).toBeInTheDocument();
    // Fire a change event on the slider
    fireEvent.change(sliderElement, { target: { value: 40 } });

    // Re-render the component with the new value
    // rerender(<Slider value={40} />);
    // rerender(<Settings value={40} />);

    // Assert that the value has changed
    expect(sliderElement).toHaveTextContent(40);
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

  it.todo("opens the popover when Settings Button is clicked", () => {
    render(<Settings />);

    const settingsButtonElement = screen.getByTestId("settings-btn");
    userEvent.click(settingsButtonElement);

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
