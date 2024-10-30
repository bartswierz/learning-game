import { SMALL } from "../../../../types/types";

interface HourHandProps {
  time: string;
  size?: typeof SMALL;
}

const HourHand = ({ time, size }: HourHandProps) => {
  const hour = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1]);
  const hourDegree: number = (hour % 12) * 30 + (minutes / 60) * 30;

  if (size === SMALL) {
    return (
      <div
        className="absolute z-[2] left-[49%] top-[39px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[95px] border-b-blue-600 border-l-transparent border-r-transparent origin-bottom transition-all duration-1000 ease-in-out"
        style={{
          transform: `rotate(${hourDegree}deg)`,
        }}
      ></div>
    );
  }

  return (
    <div
      className="absolute z-[2] left-[49%] top-[45px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[130px] border-b-blue-600 border-l-transparent border-r-transparent origin-bottom transition-all duration-1000 ease-in-out"
      style={{
        transform: `rotate(${hourDegree}deg)`,
      }}
    ></div>
  );
};

export default HourHand;
