import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";
import { US, PL, MX, DE, FR } from "country-flag-icons/react/3x2";

import useTTSStore from "@/store/tts_store";
import { LanguageType } from "@/types/types";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

type LanguageListType = {
  languageCode: LanguageType;
  label: "English" | "Spanish" | "Polish" | "French" | "German";
  flag: JSX.Element;
};

const flagStyle = "w-[22px] h-[22px]";

const languages: LanguageListType[] = [
  {
    languageCode: "en-US",
    label: "English",
    flag: <US className={flagStyle} />,
  },
  {
    languageCode: "es-ES",
    label: "Spanish",
    flag: <MX className={flagStyle} />,
  },
  {
    languageCode: "pl-PL",
    label: "Polish",
    flag: <PL className={flagStyle} />,
  },
  {
    languageCode: "fr-FR",
    label: "French",
    flag: <FR className={flagStyle} />,
  },
  {
    languageCode: "de-DE",
    label: "German",
    flag: <DE className={flagStyle} />,
  },
];

const LanguageCombobox = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const { i18n } = useTranslation();
  const ttsLanguage: LanguageType = useTTSStore((state) => state.language);
  const setTTSLanguage = useTTSStore((state) => state.setLanguage);

  const handleOnSelect = (selectedLanguage: LanguageType) => {
    setOpen(false);
    setTTSLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={`flex justify-center w-full items-center px-4 py-2 rounded-md border-[3px] cursor-pointer shadow-xl transition-color duration-200 ease-in bg-${theme}-primary hover:bg-${theme}-secondary`}
        >
          {/* Setting Button text to matched label. i.e. label: "English" */}
          {ttsLanguage ? languages.find(({ languageCode }) => languageCode === ttsLanguage)?.label : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map(({ label, languageCode, flag }) => (
                <CommandItem
                  key={languageCode}
                  value={languageCode}
                  onSelect={(selectedLanguage) => handleOnSelect(selectedLanguage as LanguageType)}
                  className="cursor-pointer"
                >
                  <Check className={cn("mr-2 h-4 w-4", ttsLanguage === languageCode ? "opacity-100" : "opacity-0")} />
                  <span className="mr-2">{flag}</span>
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

export default LanguageCombobox;
