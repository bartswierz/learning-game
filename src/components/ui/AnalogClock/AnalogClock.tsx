import { useState } from "react";
import { shuffle } from "lodash";
import { Tier, EASY, MEDIUM, HARD } from "@/types/types";

const ClockCenter = () => (
  <div className="absolute top-1/2 left-1/2 bg-gray-800 w-2 h-2 rounded-full" style={{ transform: "translate(-50%, -50%)" }}></div>
);

type positionType = { position: number };

const HourHand = ({ position }: positionType) => {
  return (
    <div
      className="absolute top-1/2x left-1/2 bg-blue-800 w-1 h-[50%] rounded-full origin-bottom"
      style={{
        transform: `rotate(${position}deg)`,
      }}
    ></div>
  );
};

const MinuteHand = ({ position }: positionType) => {
  return (
    <div
      className="absolute left-1/2 bg-red-600 w-1 h-[50%] rounded-full origin-bottom"
      style={{
        transform: `rotate(${position}deg)`,
      }}
    ></div>
  );
};

const HourIndicators = () => {
  return (
    <ul className="text-white">
      <li className="absolute top-0 left-[48%]">12</li>
      <li className="absolute bottom-0 left-[48%]">6</li>

      <li className="absolute top-[10%] left-[24%]">11</li>
      <li className="absolute top-[10%] left-[75%]">1</li>

      <li className="absolute top-[27%] left-[7%]">10</li>
      <li className="absolute top-[27%] right-[8%]">2</li>

      <li className="absolute top-[48%] left-[2%]">9</li>
      <li className="absolute top-[48%] right-[2%]">3</li>

      <li className="absolute bottom-[24%] left-[9%]">8</li>
      <li className="absolute bottom-[24%] right-[8%]">4</li>

      <li className="absolute bottom-[7%] left-[27%]">7</li>
      <li className="absolute bottom-[7%] right-[25%]">5</li>
    </ul>
  );
};

/** TODO
 * Add 15 minute interval lines - 360 degrees / 48 = 7.5 degrees per line (15 minutes)
 * EASY TIER: Half Hour Increments
 * MED TIER: 15 Min Increments
 * HARD TIER - 5 Min Increments
 *
 * On click set the tier - easy, medium, hard
 * Get three random minute choices
 * display one of the choices as the correct answer
 */
const AnalogClock = () => {
  // const [randomize, setRandomize] = useState(false);
  const [tier, setTier] = useState<Tier>("");
  const [minutes, setMinutes] = useState([]);
  const [hour, setHour] = useState(0);

  const minuteTiers = {
    EASY: [0, 30], // 0 1
    MEDIUM: [0, 15, 30, 45], // 0, 1, 2, 3
    HARD: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
  };

  const handleTierChoice = (tier: Tier) => {
    setTier(tier);

    const randomHour = Math.floor(Math.random() * 12) + 1;
    setHour(randomHour);

    // gets a random direction in which we will collect three answers
    const direction = ["below", "around", "above"];
    const randomDirection = direction[Math.floor(Math.random() * direction.length)];

    const randomMinutes = getRandomMinutes(tier, randomDirection);
    console.log("randomMinutes", randomMinutes);
    setMinutes(randomMinutes);
  };

  // TODO - this works getting the random option - we need to make this function return THREE options not 1
  // Will randomly choose one of the minute times from on of the three tiers available
  const getRandomMinutes = (tier: Tier, direction: string) => {
    if (!tier) return null;
    const choices = [];

    // Get the index within the tier
    console.log("direction", direction);
    const minutes = minuteTiers[tier];
    const randomIndex = Math.floor(Math.random() * minutes.length); // This will be the starting index

    // easy - index 0, 1
    // medium - index 0, 1, 2, 3
    // hard - index 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
    choices.push(minutes[randomIndex]); // first number from array
    console.log("choices", choices);

    // TODO - get the other two indexes based on the random direction
    if (direction === "below") {
      // If the index below our randomIndex exists, push that into the choices array otherwise push the last element in the array
      // First index
      if (minutes[randomIndex - 1]) choices.push(minutes[randomIndex - 1]);
      else choices.push(minutes[minutes.length - 1]); // Last element in the array

      // Second index
      if (minutes[randomIndex - 2]) choices.push(minutes[randomIndex - 2]);
      else choices.push(minutes[minutes.length - 2]); // 2nd to last element in the array
    }

    // If index is the LAST element, get the first two elements in array
    else if (direction === "above") {
      if (minutes[randomIndex + 1]) choices.push(minutes[randomIndex + 1]);
      else choices.push(minutes[0]); // 1st element in array

      if (minutes[randomIndex + 2]) choices.push(minutes[randomIndex + 2]);
      else choices.push(minutes[1]); // 2nd element in array
    }

    // AROUND
    else {
      if (minutes[randomIndex + 1]) choices.push(minutes[randomIndex + 1]);
      else choices.push(minutes[0]); // 1st element in array

      if (minutes[randomIndex - 1]) choices.push(minutes[randomIndex - 1]);
      else choices.push(minutes[minutes.length - 1]); // Last element in the array
    }

    // Get the next two indexes based on the random direction(if above, get the next two indexes above the randomIndex)
    console.log("randomIndex & minutes[randomIndex]", randomIndex, minutes[randomIndex]);
    // return minutes[randomIndex];
    const shuffledChoices = shuffle(choices);
    return shuffledChoices;
  };

  // TODO - undefined error happens here
  const hourDegree: number = (parseInt(hour) % 12) * 30 + (parseInt(minutes[0]) / 60) * 30;
  const minuteDegree: number = minutes[0] * 6; // minute * 6 because 360 / 60 minutes = 6 degrees per minute

  return (
    <div className="flex flex-col items-center justify-center min-h-[90%] bg-gray-100x">
      <div className="relative w-[380px] h-[380px] border-[3px] border-white rounded-full">
        <HourIndicators />
        <ClockCenter />
        {/* {hourDegree && <HourHand position={hourDegree} />}
        {minuteDegree && <MinuteHand position={minuteDegree} />} */}
      </div>
      {/* <button onClick={() => setRandomize(!randomize)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {randomize ? "Reset" : "Randomize"}
      </button> */}

      <h2>Current Tier: {tier}</h2>
      <div>
        Hour: {hour} - Minutes: {minutes.map((min) => `${min} mins `)}
      </div>
      {/* {!tier && ( */}
      <div className="flex gap-4 my-4">
        <button
          onClick={() => handleTierChoice(EASY)}
          className="cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 text-center"
        >
          Easy
          <br />
          (30 mins)
        </button>
        <button
          onClick={() => handleTierChoice(MEDIUM)}
          className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 px-4 py-2  text-center"
        >
          Medium <br />
          (15 mins)
        </button>
        <button onClick={() => handleTierChoice(HARD)} className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 text-center">
          Hard
          <br />
          (5 mins)
        </button>
      </div>
      {/* )} */}

      <div className="text-2xl text-center mt-4">
        <h2>Time</h2>
        <p>{/* {hour}:{minute < 10 ? `0${minute}` : minute} P.M. */}</p>
        <p>Blue: Hour | Red: Minute</p>
      </div>

      {/* TODO - add in three random choices with hours that are 1 or below */}
      {tier && (
        <div>
          <h2 className="text-center mb-2">Choices</h2>
          <ul className="bb flex gap-4 mx-4">
            {/* TODO - change this into an array of strings - we will format the minutes before pushing into the choices array */}
            {minutes &&
              minutes.map((mins, index) => (
                <li key={index}>
                  <div className="bb w-full max-w-[200px] px-2 py-6 hover:bg-blue-500/30 cursor-pointer">
                    {hour}:{mins < 10 ? `0${mins}` : mins} P.M.
                  </div>
                </li>
              ))}
            {/* {choicesArray.map((choice, index) => (
              <li key={index}>
                <div className="bb w-full max-w-[200px] px-2 py-6 hover:bg-blue-500/30 cursor-pointer">{choice} P.M.</div>
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalogClock;
