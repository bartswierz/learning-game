import { Tooltip, TooltipProvider } from "@/components/ui/shadcn/tooltip";

interface TooltipSliderProps {
  value: number | string;
  name: string;
}

// Display useful text for the user on hover
const TooltipSlider = ({ value, name }: TooltipSliderProps) => {
  // console.log("TooltipSlider name: ", name);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        {/* <p className="text-center pt-5" data-testid="tooltip-slider"> */}
        <p className="text-center pt-5" data-testid={`slider-${name}`}>
          {value}
        </p>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipSlider;
