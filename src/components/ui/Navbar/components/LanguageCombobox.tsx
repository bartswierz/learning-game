import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../../shadcn/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../shadcn/popover";

import useTTSStore from "@/store/tts_store";
import { LanguageType } from "@/types/types";
import { useTranslation } from "react-i18next";

const languages = [
  {
    languageCode: "en-US",
    label: "English",
  },
  {
    languageCode: "es-ES",
    label: "Spanish",
  },
  {
    languageCode: "pl-PL",
    label: "Polish",
  },
  {
    languageCode: "de-DE",
    label: "French",
  },
  {
    languageCode: "fr-FR",
    label: "German",
  },
];

const LanguageCombobox = () => {
  const [open, setOpen] = useState(false);

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
          className="flex justify-center w-full bg-blue-500 items-center px-4 py-2 rounded-md border-[3px] cursor-pointer shadow-xl transition-color duration-200 ease-in "
        >
          {/* Setting Button text to matched label. i.e. label: "English" */}
          {ttsLanguage ? languages.find(({ languageCode }) => languageCode === ttsLanguage)?.label : "Select language..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bb">
        <Command>
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map(({ label, languageCode }) => (
                <CommandItem
                  key={languageCode}
                  value={languageCode}
                  onSelect={(selectedLanguage) => handleOnSelect(selectedLanguage as LanguageType)}
                >
                  <Check className={cn("mr-2 h-4 w-4", ttsLanguage === languageCode ? "opacity-100" : "opacity-0")} />
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
