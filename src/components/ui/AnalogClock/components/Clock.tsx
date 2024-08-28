import { HourIndicators, ClockTicks, Pin, HourHand, MinuteHand } from "./index";

const Clock = ({ time }: { time: string }) => {
  if (!time) return null;

  return (
    <div className="relative w-[380px] h-[380px] border-[15px] border-black rounded-full shadow-xl bg-slate-700">
      <HourIndicators />
      <ClockTicks />
      <Pin />
      {time && <HourHand time={time} />}
      {time && <MinuteHand time={time} />}
    </div>
  );
};

export default Clock;
