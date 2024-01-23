import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/shadcn/tooltip";

interface TooltipButtonProps {
  trigger: string | JSX.Element; // Accepts Text or React Icons as the trigger
  popup: string;
}

// Display useful text for the user on hover
const TooltipButton = ({ trigger, popup }: TooltipButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>{trigger}</button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-bold">Go to {popup}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
