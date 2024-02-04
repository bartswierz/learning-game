import Question from "../Question";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Question Component", () => {
  it("displays the addition operation icon", () => {
    render(<Question operationType="ADDITION" />);

    const icon = screen.getByTestId("add-icon");

    expect(icon).toBeVisible();
  });

  it("should display the division operation icon", () => {
    render(<Question operationType="DIVISION" />);

    const icon = screen.getByTestId("divide-icon");

    expect(icon).toBeVisible();
  });

  it("should display the multiplication operation icon", () => {
    render(<Question operationType="MULTIPLICATION" />);

    const icon = screen.getByTestId("multiply-icon");

    expect(icon).toBeVisible();
  });

  it("should display the subtraction operation icon", () => {
    render(<Question operationType="SUBTRACTION" />);

    const icon = screen.getByTestId("subtract-icon");

    expect(icon).toBeVisible();
  });
});
