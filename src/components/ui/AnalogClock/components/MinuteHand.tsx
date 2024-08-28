// TODO - fix minute hand
const MinuteHand = ({ time }: { time: string }) => {
  const minutes = time.split(":")[1]; // '12:30' split -> '30' minutes
  console.log("minuteHand - minutes", minutes);
  const minuteDegree = parseInt(minutes) * 6; // * 6 because 360 / 60 minutes = 6 degrees per minute
  // TODO - minute logic here
  return (
    <div
      // TODO - this positioning is with the new updated className styles, adjust as needed to be centered
      // className="absolute left-1/2 bg-red-600 w-1 h-[50%] rounded-full origin-bottom"
      className="absolute left-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[190px] border-b-red-800 border-l-transparent border-r-transparent origin-bottom"
      style={{
        transform: `rotate(${minuteDegree}deg)`,
      }}
    ></div>
  );
};

export default MinuteHand;
