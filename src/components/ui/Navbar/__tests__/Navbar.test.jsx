import Navbar from "../Navbar";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe.skip("Navbar component", () => {
  it('The text "Addition" link exists in the Navbar component', () => {
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
    screen.getByRole("link", {
      name: /addition/i,
    });
  });
});
