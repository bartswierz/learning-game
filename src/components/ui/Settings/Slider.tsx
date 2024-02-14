import { useState, useEffect, useCallback } from "react";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import TooltipSlider__ from "./TooltipSlider";
import debounce from "lodash.debounce";

interface SettingsSliderProps {
  name: string;
  value: number; //Current value in our Settings Store
  min?: number;
  max?: number;
  step?: number;
  enableSubmitBtnCallback: () => void;
}

const Slider__ = ({ name, value, min = 1, max = 50, step = 1, enableSubmitBtnCallback }: SettingsSliderProps) => {
  const [thumbValue, setThumbValue] = useState(value); // [min, max

  // Value is an array of numbers, we can use first index using OnValueChange
  const handleValueChange = (thumbArray: number[]) => {
    setThumbValue(thumbArray[0]);

    // Debounced callback to enable update settings button
    debouncedCallback();
  };

  // useCallback used to prevent debouncedCallback from being recreated on every render, without it, we would simply be calling all the debounced functions after the time has passed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(enableSubmitBtnCallback, 300), [enableSubmitBtnCallback]);

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
      <Thumb className="SliderThumb" aria-label={`${name}-thumb`}>
        <TooltipSlider__ value={thumbValue} name={name} />
      </Thumb>
    </Root>
  );
};

export default Slider__;
