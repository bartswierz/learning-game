/** TODO
 * 1. Create a button component that accepts props for:
 *   - text as CHILDREN
 *  - onClick function
 *  - className for styling
 * DO NOT HARDCODE ANY PADDING-WIDTHS-HEIGHTS-COLORS - this should be passed from className. we can however set a default className if not given
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick: (value?: string) => void;
  className?: string;
  ariaLabel?: string;
  variant?: string; // TODO - add variants once we refactor NumberBtn and CheckAnswerBtn
}

const Button = ({ children, onClick, variant = "primary", className = "", ariaLabel }: ButtonProps) => {
  return (
    <button
      // className={`relative flex items-center justify-center w-full h-full transition-all duration-700 ease-in-out`}
      className={`relative flex items-center justify-center w-full h-full transition-all duration-700 ease-in-out ${className}`}
      onClick={onClick}
      // onClick={() => handleClick(value)}
      aria-label={ariaLabel}
    >
      {/* BACKGROUND*/}
      <div className="absolute inset-x-0 h-full -bottom-2 bg-blue-600 rounded-lg"></div>

      {/* TEXT CONTAINER */}
      <div className="relative flex items-center justify-center w-full h-full bg-blue-500 border-[1.5px] border-blue-600 rounded-lg py-2 transition transform duration-600 active:translate-y-2">
        {children}
      </div>
    </button>
  );
};

export default Button;
