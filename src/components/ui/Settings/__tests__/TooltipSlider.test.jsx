/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TooltipSlider from "../TooltipSlider";

describe("TooltipSlider", () => {
  it("renders with the passed value", () => {
    {
      render(<TooltipSlider name="volume" value={50} />);
      // Add your assertions here
      // FIND THE SLIDER
      const sliderElement = screen.getByTestId("tooltip-slider");

      // expect(sliderElement).toBeInTheDocument();
      expect(sliderElement).toHaveTextContent(50);
    }
  });
});
