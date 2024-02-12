/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider__ from "../Slider";
import userEvent from "@testing-library/user-event";

describe("Slider", () => {
  it.skip("renders with default props", () => {
    render(<Slider__ name="volume" value={50} />);
    // Add your assertions here
  });

  it.skip("updates thumb value on value change", () => {
    // const { getByLabelText } = render(<Slider__ name="volume" value={50} />);
    const { getByLabelText } = render(<Slider__ name="volume" value={50} />);
    const sliderThumb = getByLabelText("Volume");

    userEvent.change(sliderThumb, { target: { value: 25 } });
    // Add your assertions here
  });

  it("value changes when slider is moved", () => {
    // Render the component with an initial value
    const { rerender } = render(<Slider__ name="volume" value={50} />);

    // Find the slider
    const slider = screen.getByTestId("tooltip-slider");

    // Fire a change event on the slider
    fireEvent.change(slider, { target: { value: 40 } });

    // Re-render the component with the new value
    // rerender(<TooltipSlider value={40} />);
    rerender(<Slider__ value={40} />);

    // Assert that the value has changed
    expect(slider).toHaveTextContent(40);
  });
});
