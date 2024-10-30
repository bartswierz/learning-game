/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../Slider";
import userEvent from "@testing-library/user-event";

describe.skip("Slider", () => {
  /*
  data-testids:
  slider-numberOne-1
  slider-numberOne-2
  slider-numberTwo-1
  slider-numberTwo-2
  slider-questions
  slider-attempts
  */
  it("value changes when slider is moved", () => {
    // Render the component with an initial value
    const { rerender } = render(<Slider name="volume" value={30} />);

    /*
    use the data-testid we placed on the slider value to check if the getByText method returns the correct value
    */
    // Find the slider
    // const slider = screen.getByTestId("tooltip-slider");
    // const sliderElement = screen.getAllByRole("input", "numberOne[]");
    // Find the hidden input element
    // console.log("sliderElement: ", sliderElement);
    // const inputElement = screen.getByLabelText("numberOne[]", { selector: 'input[name="numberOne[]"]', hidden: true });
    // console.log("inputElement: ", inputElement);

    const sliderElement = screen.getByTestId("slider-questions");
    expect(sliderElement).toBeInTheDocument();
    // Fire a change event on the slider
    fireEvent.change(sliderElement, { target: { value: 40 } });

    // Re-render the component with the new value
    rerender(<Slider value={40} />);

    // Assert that the value has changed
    expect(sliderElement).toHaveTextContent(40);
  });

  it.skip("renders with default props", () => {
    render(<Slider name="volume" value={50} />);
    // Add your assertions here
  });

  it.skip("updates thumb value on value change", () => {
    // const { getByLabelText } = render(<Slider__ name="volume" value={50} />);
    const { getByLabelText } = render(<Slider name="volume" value={50} />);
    const sliderThumb = getByLabelText("Volume");

    userEvent.change(sliderThumb, { target: { value: 25 } });
    // Add your assertions here
  });

  it.skip("updates store settings when user clicks Update Settings Button", () => {});

  it.skip("Update Settings Button is disabled when no changes are made", () => {});
});
