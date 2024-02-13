import { useState } from "react";
import { Root, Track, Range, Thumb } from "@radix-ui/react-slider";
import TooltipSlider from "./TooltipSlider";

interface SettingsDualSliderProps {
  min?: number;
  max?: number;
  minStepsBetween?: number;
  step?: number;
  name: string;
  minValue: number;
  maxValue: number;
}

const DualSlider = ({ name, minValue, maxValue, min = 1, max = 50, step = 1, minStepsBetween = 1 }: SettingsDualSliderProps) => {
  const [thumbValueMin, setThumbValueMin] = useState(minValue);
  const [thumbValueMax, setThumbValueMax] = useState(maxValue);

  const handleValueChange = (thumbArray: number[]) => {
    // thumbArray = [min, max]
    setThumbValueMin(thumbArray[0]);
    setThumbValueMax(thumbArray[1]);
  };

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
      <Thumb className="SliderThumb" aria-label={`${name}-range`} data-testid={`${name}-thumb-min`}>
        <TooltipSlider value={thumbValueMin} name={`${name}-1`} />
      </Thumb>

      {/* Maximum Value Thumb */}
      <Thumb className="SliderThumb" aria-label={`${name}-range`} data-testid={`${name}-thumb-max`}>
        <TooltipSlider value={thumbValueMax} name={`${name}-2`} />
      </Thumb>
    </Root>
  );
};

export default DualSlider;
