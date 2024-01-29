import Navbar from "../Navbar";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Navbar component", () => {
  // it("should render NavbarLinks", () => {
  //   render(<Navbar />);
  //   // Assert that NavbarLinks content is present
  //   expect(screen.getByText("Addition")).toBeInTheDocument();
  //   expect(screen.getByText("Subtraction")).toBeInTheDocument();
  //   expect(screen.getByText("Multiplication")).toBeInTheDocument();
  //   expect(screen.getByText("Division")).toBeInTheDocument();
  //   // You can add more specific assertions here if needed
  // });
  // it("should render NavbarLink", () => {
  //   render(<NavbarLink test="test" />);
  //   const additionLink = screen.getByRole("link", { name: /addition/i });
  //   expect(additionLink).toBeInTheDocument();
  // });

  it('The text "Addition" exists in the Navbar component', () => {
    // Render your Navbar component
    render(<Navbar />);

    // Use `screen.getByText` to query for the text
    const additionLink = screen.getByText(/Addition/i);

    // Expect that the element with the text 'Addition' is found
    expect(additionLink).toBeInTheDocument();
  });

  it("should render NavbarLinks", () => {
    render(<Navbar />);
    // Assert that NavbarLinks content is present
    const additionLink = screen.getByRole("link", {
      name: /addition/i,
    });

    console.log("additionLink", additionLink);
    // expect(screen.getByText("Addition")).toBeVisible();
    // expect(screen.getByText("Subtraction")).toBeInTheDocument();
    // expect(screen.getByText("Multiplication")).toBeInTheDocument();
    // expect(screen.getByText("Division")).toBeInTheDocument();
    // You can add more specific assertions here if needed
  });
});
