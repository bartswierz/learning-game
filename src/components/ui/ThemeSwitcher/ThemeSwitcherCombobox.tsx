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
              {themeList.map(({ label, themeDescription, sampleColor }) => (
                <CommandItem
                  key={themeDescription}
                  value={themeDescription}
                  onSelect={() => handleOnSelect(themeDescription as string)}
                  className="cursor-pointer"
                >
                  <Check className={cn("mr-2 h-4 w-4", theme === themeDescription ? "opacity-100" : "opacity-0")} />
                  <span className={`mr-2 w-3 h-3 rounded-full ${sampleColor}`}></span> {label}
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
  label: string;
  themeDescription: string;
  sampleColor: string;
};

const themeList: ThemeListType[] = [
  {
    label: "Red",
    themeDescription: "themeRed",
    sampleColor: "bg-[#EF4444]",
  },
  {
    label: "Orange",
    themeDescription: "themeOrange",
    sampleColor: "bg-[#F97316]",
  },
  {
    label: "Amber",
    themeDescription: "themeAmber",
    sampleColor: "bg-[#F59E0B]",
  },
  {
    label: "Yellow",
    themeDescription: "themeYellow",
    sampleColor: "bg-[#EAB308]",
  },
  {
    label: "Lime",
    themeDescription: "themeLime",
    sampleColor: "bg-[#84CC16]",
  },
  {
    label: "Green",
    themeDescription: "themeGreen",
    sampleColor: "bg-[#22C55E]",
  },
  {
    label: "Emerald",
    themeDescription: "themeEmerald",
    sampleColor: "bg-[#10B981]",
  },
  {
    label: "Teal",
    themeDescription: "themeTeal",
    sampleColor: "bg-[#14B8A6]",
  },
  {
    label: "Cyan",
    themeDescription: "themeCyan",
    sampleColor: "bg-[#06B6D4]",
  },
  {
    label: "Sky",
    themeDescription: "themeSky",
    sampleColor: "bg-[#0EA5E9]",
  },
  {
    label: "Blue",
    themeDescription: "themeBlue",
    sampleColor: "bg-[#3B82F6]",
  },
  {
    label: "Indigo",
    themeDescription: "themeIndigo",
    sampleColor: "bg-[#6366F1]",
  },
  {
    label: "Violet",
    themeDescription: "themeViolet",
    sampleColor: "bg-[#8B5CF6]",
  },
  {
    label: "Purple",
    themeDescription: "themePurple",
    sampleColor: "bg-[#A855F7]",
  },
  {
    label: "Fuchsia",
    themeDescription: "themeFuchsia",
    sampleColor: "bg-[#D946EF]",
  },
  {
    label: "Pink",
    themeDescription: "themePink",
    sampleColor: "bg-[#EC4899]",
  },
  {
    label: "Rose",
    themeDescription: "themeRose",
    sampleColor: "bg-[#F43F5E]",
  },
];
