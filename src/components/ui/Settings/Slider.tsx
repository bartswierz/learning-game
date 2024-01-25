import { useState } from "react";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import TooltipSlider__ from "./TooltipSlider";

interface SettingsSliderProps {
  name: string;
  value: number; //Current value in our Settings Store
  min?: number;
  max?: number;
  step?: number;
}

const Slider__ = ({ name, value, min = 1, max = 50, step = 1 }: SettingsSliderProps) => {
  const [thumbValue, setThumbValue] = useState(value); // [min, max

  // Value is an array of numbers, we can use first index using OnValueChange
  const handleValueChange = (thumbArray: number[]) => {
    setThumbValue(thumbArray[0]);
  };

  return (
    <Root
      className="SliderRoot"
      defaultValue={[thumbValue]}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
      name={name}
    >
      <Track className="SliderTrack">
        <Range className="SliderRange" />
      </Track>
      <Thumb className="SliderThumb" aria-label="Volume">
        <TooltipSlider__ value={thumbValue} />
      </Thumb>
    </Root>
  );
};

export default Slider__;