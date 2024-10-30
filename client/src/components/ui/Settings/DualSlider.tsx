import { useState, useCallback } from "react";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import TooltipSlider from "./TooltipSlider";
import debounce from "lodash.debounce";

interface SettingsDualSliderProps {
  min?: number;
  max?: number;
  minStepsBetween?: number;
  step?: number;
  name: string;
  minValue: number;
  maxValue: number;
  enableSubmitBtnCallback: () => void;
}

const DualSlider = ({
  name,
  minValue,
  maxValue,
  min = 1,
  max = 50,
  step = 1,
  minStepsBetween = 1,
  enableSubmitBtnCallback,
}: SettingsDualSliderProps) => {
  const [thumbValueMin, setThumbValueMin] = useState(minValue);
  const [thumbValueMax, setThumbValueMax] = useState(maxValue);

  const handleValueChange = (thumbArray: number[]) => {
    // thumbArray = [min, max]
    setThumbValueMin(thumbArray[0]);
    setThumbValueMax(thumbArray[1]);

    // SET UPDATE SETTINGS BUTTON TO ENABLED
    debouncedCallback();
  };

  // useCallback used to prevent debouncedCallback from being recreated on every render, without it, we would simply be calling all the debounced functions after the time has passed
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(enableSubmitBtnCallback, 300), [enableSubmitBtnCallback]);

  return (
    <Root
      className="SliderRoot mx-auto"
      defaultValue={[thumbValueMin, thumbValueMax]}
      min={min}
      max={max}
      step={step}
      minStepsBetweenThumbs={minStepsBetween}
      onValueChange={handleValueChange}
      name={name}
    >
      <Track className="SliderTrack">
        <Range className="SliderRange" />
      </Track>

      {/* Minimum Value Thumb */}
      <Thumb className="SliderThumb" aria-label={`${name}-min-range`} data-testid={`${name}-thumb-min`}>
        <TooltipSlider value={thumbValueMin} name={`${name}-1`} />
      </Thumb>

      {/* Maximum Value Thumb */}
      <Thumb className="SliderThumb" aria-label={`${name}-max-range`} data-testid={`${name}-thumb-max`}>
        <TooltipSlider value={thumbValueMax} name={`${name}-2`} />
      </Thumb>
    </Root>
  );
};

export default DualSlider;
