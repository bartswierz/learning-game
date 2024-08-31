import { useEffect, useState } from "react";
import { SMALL } from "../../../../types/types";

interface MinuteHandProps {
  time: string;
  size?: typeof SMALL;
}

// TODO - fix minute hand
const MinuteHand = ({ time, size }: MinuteHandProps) => {
  const minutes = time.split(":")[1]; // '12:30' split -> '30' minutes
  const minuteDegree = parseInt(minutes) * 6; // * 6 because 360 / 60 minutes = 6 degrees per minute

  const [previousDegree, setPreviousDegree] = useState(0);
  const [adjustedDegree, setAdjustedDegree] = useState(minuteDegree);

  useEffect(() => {
    let newDegree = minuteDegree;

    // Ensure clockwise rotation
    if (newDegree < previousDegree) {
      newDegree += 360;
    }

    setAdjustedDegree(newDegree);
    setPreviousDegree(newDegree % 360); // modulo 360 removes 360 each time render to keep track of the previous degree better otherwise the degree would grow indefinitely -> ex. 480 % 360 = 120 degrees for previous degree
    // console.log("previousDegree", previousDegree);
  }, [minuteDegree, previousDegree]);

  // TODO - refactor
  if (size === SMALL) {
    return (
      <div
        className="absolute left-[49%] top-[23px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[115px] border-b-red-600 border-l-transparent border-r-transparent origin-bottom transition-all duration-1000 ease-in-out"
        style={{
          transform: `rotate(${adjustedDegree}deg)`,
        }}
      ></div>
    );
  }

  // Normal Size
  return (
    <div
      className="absolute left-[49%] top-[15px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[160px] border-b-red-600 border-l-transparent border-r-transparent origin-bottom transition-all duration-1000 ease-in-out"
      style={{
        transform: `rotate(${adjustedDegree}deg)`,
      }}
    ></div>
  );
};

export default MinuteHand;
