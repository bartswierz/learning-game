import { PRIMARY, SECONDARY, DANGER } from "@/types/types";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: typeof PRIMARY | typeof SECONDARY | typeof DANGER;
}

const Button = ({ children, onClick = () => {}, variant = PRIMARY, className = "", ariaLabel, type, disabled }: ButtonProps) => {
  //  Base styles for button elements
  const baseButtonStyles = "relative flex items-center justify-center w-full h-full";
  const baseContentStyles = "relative flex items-center justify-center w-full h-full py-2 px-2 rounded-lg border-[1.5px]";
  const transitionStyles = "transition transform duration-600 active:translate-y-2";

  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case PRIMARY:
        return {
          topSection: "bg-blue-500 border-blue-600",
          bottomSection: "bg-blue-600",
        };
      case SECONDARY:
        return {
          topSection: "bg-gray-500 border-gray-600",
          bottomSection: "bg-gray-600",
        };
      case DANGER:
        return {
          topSection: "bg-red-500 border-red-600",
          bottomSection: "bg-red-600",
        };
      default:
        return {
          topSection: "",
          bottomSection: "",
        };
    }
  };

  const { topSection, bottomSection } = getVariantClasses(variant);

  if (disabled) {
    return (
      <button className={`${baseButtonStyles} cursor-not-allowed ${className}`} aria-label={ariaLabel} disabled>
        <div className="absolute inset-x-0 h-full -bottom-2 bg-gray-500 rounded-lg"></div>
        <div className={`${baseContentStyles} bg-gray-500 border-gray-600`}>{children}</div>
      </button>
    );
  }

  return (
    <button
      className={`${baseButtonStyles} transition-all duration-700 ease-in-out ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
    >
      <div className={`absolute inset-x-0 h-full -bottom-2 rounded-lg ${bottomSection}`}></div>
      <div className={`${transitionStyles} ${baseContentStyles} ${topSection}`}>{children}</div>
    </button>
  );
};

export default Button;
