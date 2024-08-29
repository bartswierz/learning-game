import { useEffect, useState } from "react";

// TODO - fix minute hand
const MinuteHand = ({ time }: { time: string }) => {
  const minutes = time.split(":")[1]; // '12:30' split -> '30' minutes
  console.log("minuteHand - minutes", minutes);
  const minuteDegree = parseInt(minutes) * 6; // * 6 because 360 / 60 minutes = 6 degrees per minute

  // console.log("minuteDegree", minuteDegree);
  // let previousDegree = 0;
  // let adjustedDegree = minuteDegree < 360 ? minuteDegree + 360 : minuteDegree;

  // console.log("adjustedDegree", adjustedDegree);

  // // Used to adjust the minute hand to rotate CLOCKWISE
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
    console.log("previousDegree", previousDegree);
  }, [minuteDegree, previousDegree]);

  // TODO - minute logic here
  return (
    <>
      <div
        className="absolute left-[50%] top-[15px] w-0 h-0 border-l-[6px] border-r-[6px] border-b-[160px] border-b-red-600 border-l-transparent border-r-transparent origin-bottom transition-all duration-1000 ease-in-out"
        style={{
          // transform: `rotate(${minuteDegree}deg)`,
          transform: `rotate(${adjustedDegree}deg)`,
        }}
      ></div>
      <div className="absolute bb top-[-40%]">
        ADJUSTED DEGREE: {adjustedDegree} <br />
        PREVIOUS DEGREE:{previousDegree}
      </div>
    </>
  );
};

export default MinuteHand;
