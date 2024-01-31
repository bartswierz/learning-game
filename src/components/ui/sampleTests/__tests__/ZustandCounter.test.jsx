import { render, screen, fireEvent } from "@testing-library/react";
import ZustandCounter from "../ZustandCounter";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("ZustandCounter", () => {
  it("should increment initial count from 0 to 1", () => {
    render(<ZustandCounter />);

    // Find the counter
    const counter = screen.getByRole("contentinfo");

    // Initial value should be 0(set as 0 in our store)
    expect(counter).toHaveTextContent("0");

    // const buttonElement = screen.getByTestId("increment");
    const buttonElement = screen.getByText(/Increment/i); //the 'i' ignore case
    fireEvent.click(buttonElement);
    // userEvent.click(buttonElement);

    expect(counter).toHaveTextContent("1");
  });

  // Two more clicks goes from 1 to 3 because of the test above
  it("should increment count to three when user clicks button two more times", () => {
    render(<ZustandCounter />);

    // Find the counter
    const counter = screen.getByRole("contentinfo");
    // Initial value should be 0(set as 0 in our store)
    expect(counter).toHaveTextContent("1");

    // const buttonElement = screen.getByTestId("increment");
    const buttonElement = screen.getByText(/Increment/i); //the 'i' ignore case
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);
    // userEvent.click(buttonElement);
    // userEvent.click(buttonElement);

    // expect(counter).toHaveTextContent("1");
    expect(counter).toHaveTextContent("3");
  });
});
