/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TooltipSlider from "../TooltipSlider";
import userEvent from "@testing-library/user-event";

describe.skip("TooltipSlider", () => {
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

  // it("value changes when slider is moved", () => {
  //   // Render the component with an initial value
  //   const { rerender } = render(<TooltipSlider value={50} />);

  //   // Find the slider
  //   const slider = screen.getByTestId("tooltip-slider");

  //   // Fire a change event on the slider
  //   fireEvent.change(slider, { target: { value: 40 } });

  //   // Re-render the component with the new value
  //   rerender(<TooltipSlider value={40} />);

  //   // Assert that the value has changed
  //   expect(slider).toHaveTextContent(40);
  // });
});
