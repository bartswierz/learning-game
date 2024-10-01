import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSwitcherCombobox = () => {
  const [open, setOpen] = useState(false);
  const { toggleTheme, theme } = useTheme();

  const handleOnSelect = (selectedTheme: string) => {
    setOpen(false);
    toggleTheme(selectedTheme);
  };

  const selectedTheme = themeList.find(({ themeDescription }) => themeDescription === theme);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={`flex justify-center w-full items-center px-4 py-2 rounded-md border-[3px] cursor-pointer shadow-xl transition-color duration-200 ease-in bg-${theme}-primary `}
        >
          {selectedTheme ? `Theme: ${selectedTheme.label}` : "Select Color..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No color found.</CommandEmpty>
            <CommandGroup>
              {themeList.map(({ label, themeDescription }) => (
                <CommandItem
                  key={themeDescription}
                  value={themeDescription}
                  onSelect={() => handleOnSelect(themeDescription as string)}
                >
                  <Check className={cn("mr-2 h-4 w-4", theme === themeDescription ? "opacity-100" : "opacity-0")} />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeSwitcherCombobox;

type ThemeListType = {
  colorCode: string;
  label: string;
  themeDescription: string;
};

const themeList: ThemeListType[] = [
  {
    colorCode: "#EF4444",
    label: "Red",
    themeDescription: "themeRed",
  },
  {
    colorCode: "#F97316",
    label: "Orange",
    themeDescription: "themeOrange",
  },
  {
    colorCode: "#F59E0B",
    label: "Amber",
    themeDescription: "themeAmber",
  },
  {
    colorCode: "#EAB308",
    label: "Yellow",
    themeDescription: "themeYellow",
  },
  {
    colorCode: "#84CC16",
    label: "Lime",
    themeDescription: "themeLime",
  },
  {
    colorCode: "#22C55E",
    label: "Green",
    themeDescription: "themeGreen",
  },
  {
    colorCode: "#10B981",
    label: "Emerald",
    themeDescription: "themeEmerald",
  },
  {
    colorCode: "#14B8A6",
    label: "Teal",
    themeDescription: "themeTeal",
  },
  {
    colorCode: "#06B6D4",
    label: "Cyan",
    themeDescription: "themeCyan",
  },
  {
    colorCode: "#0EA5E9",
    label: "Sky",
    themeDescription: "themeSky",
  },
  {
    colorCode: "#3B82F6",
    label: "Blue",
    themeDescription: "themeBlue",
  },
  {
    colorCode: "#6366F1",
    label: "Indigo",
    themeDescription: "themeIndigo",
  },
  {
    colorCode: "#8B5CF6",
    label: "Violet",
    themeDescription: "themeViolet",
  },
  {
    colorCode: "#A855F7",
    label: "Purple",
    themeDescription: "themePurple",
  },
  {
    colorCode: "#D946EF",
    label: "Fuchsia",
    themeDescription: "themeFuchsia",
  },
  {
    colorCode: "#EC4899",
    label: "Pink",
    themeDescription: "themePink",
  },
  {
    colorCode: "#F43F5E",
    label: "Rose",
    themeDescription: "themeRose",
  },
];
