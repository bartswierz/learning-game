import { Tooltip, TooltipProvider } from "@/components/ui/shadcn/tooltip";

interface TooltipSliderProps {
  value: number | string;
}

// Display useful text for the user on hover
const TooltipSlider = ({ value }: TooltipSliderProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <p className="text-center pt-5" data-testid="tooltip-slider">
          {value}
        </p>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipSlider;
