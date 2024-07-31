import { useState } from "react";

const AnalogClock = () => {
  const [randomize, setRandomize] = useState(false);

  const getRandomPosition = (type: "minute" | "hour") => {
    const max = type === "minute" ? 60 : 12;
    return Math.floor(Math.random() * max) + 1;
  };

  // TODO default time
  const hour = randomize ? getRandomPosition("hour") : 3; // Default hour
  const minute = randomize ? getRandomPosition("minute") : 15; // Default minute

  const hourDegree = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteDegree = minute * 6;

  const ClockCenter = () => {
    return (
      <div className="absolute top-1/2 left-1/2 bg-gray-800 w-2 h-2 rounded-full" style={{ transform: "translate(-50%, -50%)" }}></div>
    );
  };

  const HourHand = () => {
    return (
      <div
        className="absolute top-1/2x left-1/2 bg-blue-800 w-1 h-[50%] rounded-full origin-bottom"
        style={{
          transform: `rotate(${hourDegree}deg)`,
        }}
      ></div>
    );
  };

  const MinuteHand = () => {
    return (
      <div
        className="absolute top-1/2x left-1/2 bg-red-600 w-1 h-36x h-24x h-[50%] rounded-full origin-bottom"
        style={{
          transform: `rotate(${minuteDegree}deg)`,
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

  return (
    <div className="flex flex-col items-center justify-center min-h-[90%] bg-gray-100x">
      <div className="relative w-[380px] h-[380px] border-4 border-gray-800x border-white rounded-full">
        <HourIndicators />
        <ClockCenter />
        <HourHand />
        <MinuteHand />
      </div>
      <button onClick={() => setRandomize(!randomize)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        {randomize ? "Reset" : "Randomize"}
      </button>
      <div className="w-64 text-2xl text-center mt-12">
        <h2>Time</h2>
        <p>
          {hour}:{minute < 10 ? `0${minute}` : minute}
        </p>
      </div>
    </div>
  );
};

export default AnalogClock;
