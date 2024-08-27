import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const ClockCenter = () => (
  <div className="absolute top-1/2 left-1/2 bg-gray-800 w-2 h-2 rounded-full" style={{ transform: "translate(-50%, -50%)" }}></div>
);

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
      className="absolute top-1/2x left-1/2 bg-blue-800 w-1 h-[50%] rounded-full origin-bottom"
      style={{
        transform: `rotate(${hourDegree}deg)`,
      }}
    ></div>
  );
};

// TODO - fix minute hand
const MinuteHand = ({ minutes }: { minutes: string }) => {
  console.log("minuteHand - minutes", minutes);
  const minuteDegree = parseInt(minutes) * 6; // * 6 because 360 / 60 minutes = 6 degrees per minute
  // TODO - minute logic here
  return (
    <div
      className="absolute left-1/2 bg-red-600 w-1 h-[50%] rounded-full origin-bottom"
      style={{
        transform: `rotate(${minuteDegree}deg)`,
      }}
    ></div>
  );
};

// const minuteDegree: number = minutes[0] * 6; // minute * 6 because 360 / 60 minutes = 6 degrees per minute
// const minuteDegree: number = minutes[0] * 6; // minute * 6 because 360 / 60 minutes = 6 degrees per minute
// const hourDegree: number = (hour % 12) * 30 + (minutes / 60) * 30;
// const minuteDegree: number = minutes * 6;

const HourIndicators = () => {
  return (
    <ul className="text-white">
      <li className="absolute top-0 left-[49%]">12</li>
      <li className="absolute bottom-0 left-[49%]">6</li>

      <li className="absolute top-[8%] left-[24%]">11</li>
      <li className="absolute top-[8%] left-[73%]">1</li>

      <li className="absolute top-[25%] left-[7%]">10</li>
      <li className="absolute top-[25%] right-[8%]">2</li>

      <li className="absolute top-[47%] left-[2%]">9</li>
      <li className="absolute top-[47%] right-[2%]">3</li>

      <li className="absolute bottom-[23%] left-[9%]">8</li>
      <li className="absolute bottom-[23%] right-[8%]">4</li>

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
  const [answer, setAnswer] = useState<string>("");
  const [choicesArray, setChoicesArray] = useState<string[]>([]);
  const hour = Math.floor(Math.random() * 12) + 1; // Random hour between 1 and 12
  const shuffledArray = choicesArray && shuffle(choicesArray);
  console.log("shuffledArray", shuffledArray);

  // Each tick is at every 6 degrees(6*60 = 360 degrees)
  // Ticks for clock
  // const ticks = [];
  // const clockRadius = 190;
  // for (let i = 0; i < 60; i++) {
  //   const angle = i * 6;
  //   ticks.push(
  //     <div
  //       key={i}
  //       style={{
  //         position: "absolute",
  //         width: "2px", // thickness of the tick
  //         height: i % 5 === 0 ? "10px" : "5px", // longer ticks for each 5th second
  //         backgroundColor: i % 5 === 0 ? "red" : "white",
  //         transformOrigin: "bottom center",
  //         transform: `rotate(${angle}deg) translateY(-50%)`, // translateY centers the tick on the edge of the clock
  //         // Translates it to the center of the clock
  //         // top: "50%",
  //         // left: "50%",
  //         top: `${clockRadius}px`,
  //         left: `${clockRadius}px`,
  //       }}
  //     />
  //   );
  // }

  // Picks a random answer from the choicesArray
  useEffect(() => {
    setAnswer(choicesArray[Math.floor(Math.random() * choicesArray.length)]);
  }, [choicesArray]);

  // Easy tier will have two options - 0 and 30 minutes
  const handleEasyTier = (hour: number) => {
    if (hour === 1) {
      setChoicesArray(shuffle(["1:00", "1:30", "2:00", "2:30"]));
      return;
    } else if (hour === 12) setChoicesArray(shuffle(["12:00", "12:30", "1:00", "1:30"]));
    else setChoicesArray(shuffle([`${hour}:00`, `${hour}:30`, `${hour + 1}:00`, `${hour + 1}:30`]));
  };

  // Medium Tier will have four options - 0, 15, 30, 45 minutes
  const handleMediumTier = (hour: number) => {
    setChoicesArray(shuffle([`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`]));
  };

  // Hard Tier will have twelve options in increments of 5 minutes(0-55)
  const handleHardTier = (hour: number) => {
    const hardMinutesArray = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const startingPointMinutes = hardMinutesArray[Math.floor(Math.random() * 12)]; // index 0-11

    switch (startingPointMinutes) {
      case 0:
        setChoicesArray([`${hour}:00`, `${hour}:05`, `${hour}:10`, `${hour}:15`]);
        break;
      case 5:
        setChoicesArray([`${hour}:05`, `${hour}:10`, `${hour}:15`, `${hour}:20`]);
        break;
      case 10:
        setChoicesArray([`${hour}:10`, `${hour}:15`, `${hour}:20`, `${hour}:25`]);
        break;
      case 15:
        setChoicesArray([`${hour}:15`, `${hour}:20`, `${hour}:25`, `${hour}:30`]);
        break;
      case 20:
        setChoicesArray([`${hour}:20`, `${hour}:25`, `${hour}:30`, `${hour}:35`]);
        break;
      case 25:
        setChoicesArray([`${hour}:25`, `${hour}:30`, `${hour}:35`, `${hour}:40`]);
        break;
      case 30:
        setChoicesArray([`${hour}:30`, `${hour}:35`, `${hour}:40`, `${hour}:45`]);
        break;
      case 35:
        setChoicesArray([`${hour}:35`, `${hour}:40`, `${hour}:45`, `${hour}:50`]);
        break;
      case 40:
        setChoicesArray([`${hour}:40`, `${hour}:45`, `${hour}:50`, `${hour}:55`]);
        break;
      case 45:
        if (hour === 12) setChoicesArray([`${hour}:45`, `${hour}:50`, `${hour}:55`, `1:00`]);

        setChoicesArray([`${hour}:45`, `${hour}:50`, `${hour}:55`, `${hour + 1}:00`]);
        break;
      case 50:
        if (hour === 12) setChoicesArray([`${hour}:50`, `${hour}:55`, `1:00`, `1:05`]);

        setChoicesArray([`${hour}:50`, `${hour}:55`, `${hour + 1}:00`, `${hour + 1}:05`]);
        break;
      case 55:
        if (hour === 12) setChoicesArray([`${hour}:55`, `1:00`, `1:05`, `1:10`]);

        setChoicesArray([`${hour}:55`, `${hour + 1}:00`, `${hour + 1}:05`, `${hour + 1}:10`]);
        break;
      default:
        setChoicesArray([`${hour}:00`, `${hour}:05`, `${hour}:10`, `${hour}:15`]);
    }
  };

  const handleUserChoice = (choice: string) => {
    console.log("User Choice: ", choice);
    if (choice === answer) {
      console.log("CORRECT!");
    } else {
      console.log("INCORRECT! - answer is ", answer);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90%]">
      <div>
        <h2>
          Choices Array:{" "}
          {choicesArray.map((choice) => (
            <span className="mx-1">{choice}</span>
          ))}
        </h2>
        <h2>Answer: {answer}</h2>
      </div>
      <div className="relative w-[380px] h-[380px] border-[3px] border-white rounded-full">
        <HourIndicators />
        <ClockCenter />
        {/* {ticks} */}
        {answer && <HourHand time={answer} />}
        {answer && <MinuteHand minutes={answer.split(":")[1]} />}
      </div>

      {/* <h2>Current Tier: {tier}</h2> */}
      <div className="flex gap-4 my-4">
        <button onClick={() => handleEasyTier(hour)} className="cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 text-center">
          Easy
          <br />
          (30 mins)
        </button>
        <button
          onClick={() => handleMediumTier(hour)}
          className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-center"
        >
          Medium <br />
          (15 mins)
        </button>
        <button onClick={() => handleHardTier(hour)} className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 text-center">
          Hard
          <br />
          (5 mins)
        </button>
      </div>

      <div className="text-2xl text-center mt-4">
        <h2>Time</h2>
        <p>Blue: Hour | Red: Minute</p>
      </div>

      <div>
        <h2 className="text-center mb-2">Choices</h2>
        <ul className="flex gap-4 mx-4">
          {choicesArray &&
            choicesArray.map((choice, index) => (
              <li key={index}>
                <button
                  className="bb w-full max-w-[200px] px-2 py-6 hover:bg-blue-500/30 cursor-pointer"
                  onClick={() => handleUserChoice(choice)}
                >
                  {choice} P.M.
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalogClock;
