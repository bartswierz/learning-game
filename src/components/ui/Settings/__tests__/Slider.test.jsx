/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
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
});
