const HourHand = ({ time }: { time: string }) => {
  console.log("hourHand - hour", time);
  const hour = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1]);
  console.log("hour", hour);
  console.log("minutes", minutes);
  const hourDegree: number = (hour % 12) * 30 + (minutes / 60) * 30;
  console.log("hourDegree", hourDegree);

  // TODO - hour logic here
  return (
    <div
      className="absolute z-[2] left-1/2x left-[49%] top-[45px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[130px] border-b-blue-600 border-l-transparent border-r-transparent origin-bottom transition-all duration-1000 ease-in-out"
      // className="absolute top-1/2x left-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[180px]x border-b-[240px] border-b-blue-800 border-l-transparent border-r-transparent origin-bottom"
      style={{
        transform: `rotate(${hourDegree}deg)`,
      }}
    ></div>
  );
};

export default HourHand;
