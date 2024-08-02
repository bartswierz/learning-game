import { useState } from "react";
import { shuffle } from "lodash";

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
 */
const AnalogClock = () => {
  const [randomize, setRandomize] = useState(false);

  const getRandomPosition = (type: "minute" | "hour") => {
    // const max = type === "minute" ? 60 : 12; // Minutes: 0-60 | Hours: 1-12
    const max = type === "minute" ? 59 : 12; // Minutes: 0-60 | Hours: 1-12

    const randPosition = Math.floor(Math.random() * max) + 1;
    console.log("randPosition: ", randPosition);
    return randPosition;
    // return Math.floor(Math.random() * max) + 1;
  };

  // TODO default time
  const hour: number = randomize ? getRandomPosition("hour") : 3; // Default hour
  const minute: number = randomize ? getRandomPosition("minute") : 15; // Default minute

  const hourDegree: number = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteDegree: number = minute * 6;

  console.log("hourDegree", hourDegree, "minuteDegree", minuteDegree, "hour", hour, "minute", minute); // 97.5, 90

  // TODO add in a function to get two other random hours that are 1 or below as choices
  // Minute is displayingas the degrees not the minutes
  // Issue here is that we are passing in the degrees not the hour and minute
  const createChoices = (hour: number, minute: number) => {
    console.log("hour", hour, "minute", minute);
    // const choices: { hour: number; minute: number | string }[] = [];
    const choices: string[] = [];

    for (let i = 0; i < 2; i++) {
      const hr = getRandomPosition("hour");
      let min = getRandomPosition("minute");

      // Check if this minute is already in the choices array
      // const exists = choices.some((choice) => choice.minute === formattedMinute);
      // TODO check the time
      const exists = choices.some((choice) => choice === `${hr}:${minute < 10 ? `0${min}` : minute}`);
      if (exists) min = getRandomPosition("minute"); // If it exists, get a new random minute
      // else {
      const formattedMinute = min < 10 ? `0${min}` : minute; //adds 0 in front of minute if less than 10
      choices.push(`${hr}:${formattedMinute}`);
      // TODO  -change to a string
      // choices.push({ hour: hr, minute: formattedMinute });
      // }
    }
    // OUTSIDE LOOP: Push our last minute into the choices array once we get our other two random hour/minutes
    choices.push(`${hour}:${minute}`);
    const shuffledChoices = shuffle(choices);
    return shuffledChoices;
  };

  const choicesArray = createChoices(hour, minute);

  return (
    <div className="flex flex-col items-center justify-center min-h-[90%] bg-gray-100x">
      <div className="relative w-[380px] h-[380px] border-[3px] border-white rounded-full">
        <HourIndicators />
        <ClockCenter />
        <HourHand position={hourDegree} />
        <MinuteHand position={minuteDegree} />
      </div>
      <button onClick={() => setRandomize(!randomize)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {randomize ? "Reset" : "Randomize"}
      </button>
      <div className="text-2xl text-center mt-4">
        <h2>Time</h2>
        <p>
          {hour}:{minute < 10 ? `0${minute}` : minute} P.M.
        </p>
        <p>Blue: Hour | Red: Minute</p>
      </div>

      {/* TODO - add in three random choices with hours that are 1 or below */}
      <div>
        <h2 className="text-center mb-2">Choices</h2>
        <ul className="bb flex gap-4 mx-4">
          {/* TODO - change this into an array of strings - we will format the minutes before pushing into the choices array */}
          {choicesArray.map((choice, index) => (
            <li key={index}>
              <div className="bb w-full max-w-[200px] px-2 py-6 hover:bg-blue-500/30 cursor-pointer">{choice} P.M.</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalogClock;
