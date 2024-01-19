/* eslint-disable @typescript-eslint/no-unused-vars */
// import {render, screen} from '@testing-library/react';
// import {it}
import { describe, it, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SampleComponent from "../SampleComponent";

// test("SampleComponent", () => {
describe.skip("SampleComponent", () => {
  it("should be equal to 2", () => {
    expect(1 + 1).toBe(2);
  });
});

// describe("<SampleComponent />", () => {
describe.skip("<SampleComponent />", () => {
  // Test #1
  it("renders the SampleTest component", () => {
    render(<SampleComponent />);
    // screen.debug(); // prints out the jsx in the App component unto the command line
  });

  // Test #2
  test("Contains p tag with text", () => {
    render(<SampleComponent />);
    // expect(screen.getByText("Sample Test")).toBeInTheDocument(); //ERROR - wont be found, we need to be EXACT with the text inside an element
    expect(screen.getByText("Sample Test Title")).toBeInTheDocument(); //SUCCESS

    // screen.debug(); // Allow us to see the rendered component in the command line
  });
});
