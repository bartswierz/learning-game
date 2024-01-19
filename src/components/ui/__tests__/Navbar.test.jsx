import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

describe("<Navbar />", () => {
  it("should render Navbar", () => {
    render(<Navbar />);
    // screen.debug();
  });

  // it('should have text "Learning Game', () => {
  //   render(<Navbar />);
  //   const navbarContainer = screen.getByTestId("navbar"); // Get the navbar container with the data-testid "navbar"

  //   // Use standard methods to find the nested <span> element
  //   const spanElement = navbarContainer.querySelector('span[id="navbar-title"]');

  //   // Perform your assertions
  //   expect(spanElement).toBeInTheDocument();
  //   expect(spanElement).toHaveTextContent("Learning Game");
  // });

  // WORKING - Finds the navbar text 'Learning Game'
  // it("Has navbar text, 'Learning Game'", () => {
  //   // Arrange
  //   const { getByText } = render(<Navbar />);

  //   // Act
  //   const element = getByText("Learning Game");

  //   // Assert
  //   expect(element).toBeInTheDocument();
  // });
  it("Has navbar text, 'Learning Game'", () => {
    // Arrange
    render(<Navbar />);

    // Act
    const element = screen.getByText("Learning Game");

    // Assert
    expect(element).toBeInTheDocument();
  });
  it("Has navbar text, 'Restart Game'", () => {
    // Arrange
    render(<Navbar />);

    // Act
    const element = screen.getByText("Restart Game");

    // Assert
    expect(element).toBeInTheDocument();
  });
});
