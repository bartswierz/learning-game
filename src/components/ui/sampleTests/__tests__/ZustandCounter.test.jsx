import { render, screen, fireEvent } from "@testing-library/react";
import ZustandCounter from "../ZustandCounter";
import { describe, it, expect, beforeEach } from "vitest";
import useSettingStore from "@/store/store";

// vi.mock("@/store/store");
// vi.mock("@/store/store", {
//   // Define your mock store functions and state here
//   count: 0, // You can set the initial state as needed
//   // increment: jest.fn(),
//   // reset: jest.fn(),
// });

// RESETS OUR STORE VALUES BACK TO THE INITIAL STATE BEFORE EACH TEST TO ENSURE OUR COUNT RESETS TO 0
const originalState = useSettingStore.getState();
beforeEach(() => {
  useSettingStore.setState(originalState);
});

describe.only("ZustandCounter", () => {
  it("should increment initial count from 0 to 1", async () => {
    render(<ZustandCounter />);

    // Find the counter
    const counter = screen.getByRole("contentinfo");

    // Initial value should be 0(set as 0 in our store)
    expect(counter).toHaveTextContent("0");

    // const buttonElement = screen.getByTestId("increment");
    const buttonElement = screen.getByText(/Increment/i); //the 'i' ignore case
    fireEvent.click(buttonElement);

    expect(counter).toHaveTextContent("1");
  });

  // Two more clicks goes from 1 to 3 because of the test above
  it("should increment count to two when user clicks button twice", () => {
    render(<ZustandCounter />);

    // Find the counter
    const counter = screen.getByRole("contentinfo");
    // Initial value should be 0(set as 0 in our store)
    expect(counter).toHaveTextContent("0");

    // const buttonElement = screen.getByTestId("increment");
    const buttonElement = screen.getByText(/Increment/i); //the 'i' ignore case
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    // expect(counter).toHaveTextContent("1");
    expect(counter).toHaveTextContent("2");
  });
});
