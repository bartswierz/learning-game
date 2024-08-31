import AnalogClock from "@/components/ui/AnalogClock/AnalogClock";

export default function AnalogClockPage() {
  return (
    <div className="pt-[4vh] pb-[8vh]">
      <h1 className="text-center text-2xl font-bold mb-4">Time Out!</h1>
      <AnalogClock />
    </div>
  );
}
