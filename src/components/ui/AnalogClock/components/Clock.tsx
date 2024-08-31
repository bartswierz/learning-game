import { HourIndicators, ClockTicks, Pin, HourHand, MinuteHand } from "./index";
import { SMALL } from "../../../../types/types";

const Clock = ({ time = "12:15" }: { time: string }) => {
  if (!time) return null;

  return (
    <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] border-[15px] border-black/60 rounded-full shadow-2xl bg-slate-700">
      <HourIndicators />
      <div className="sm:hidden">
        <ClockTicks size={SMALL} />
      </div>
      <div className="hidden sm:block">
        <ClockTicks />
      </div>
      <Pin />

      <div className="sm:hidden">
        <HourHand time={time} size={SMALL} />
        <MinuteHand time={time} size={SMALL} />
      </div>
      <div className="hidden sm:block">
        <HourHand time={time} />
        <MinuteHand time={time} />
      </div>
    </div>
  );
};

export default Clock;
