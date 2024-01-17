import { useState, useEffect } from "react";
import "./globals.css";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuIndicator,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from "@/components/ui/navigation-menu";
// import { Slider } from "@/components/ui/slider";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "./components/ui/Navbar";
import Addition from "./components/ui/Addition";

// TODO - Updating Settings isnt updating the game back to 0
// TODO - Random numbers eventually end up being 1 and then stay at 1 for the rest of the game, could be rounding error
// TODO - Game ends at an additional question (ex, 5 questions, game ends at 6)
interface Settings {
  numOneRange: { min: number; max: number };
  numTwoRange: { min: number; max: number };
  numOfAttempts: number;
  numOfQuestions: number;
}

function App() {
  const [settings, setSettings] = useState<Settings>({
    numOneRange: { min: 1, max: 10 },
    numTwoRange: { min: 1, max: 10 },
    numOfAttempts: 3,
    numOfQuestions: 5,
  });

  return (
    <div className="bg-slate-900 text-white max-w-screen max-h-screen overflow-hiddenX overflow-y-hiddenX w-screenX h-screen">
      <Navbar />

      {/* MAIN CONTENT */}
      <Addition settings={settings} />
    </div>
  );
}

export default App;
