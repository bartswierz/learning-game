import { SMALL } from "../../../../types/types";

interface ClockTicksProps {
  size?: typeof SMALL;
}

const ClockTicks = ({ size }: ClockTicksProps) => {
  const ticks = [];
  const circleSize = size === SMALL ? -128 : -168;

  for (let i = 0; i < 60; i++) {
    const angle = i * 6;
    ticks.push(
      <div
        key={i}
        style={{
          position: "absolute",
          // width: "2px", // thickness of the tick
          width: i % 5 === 0 ? "4px" : "2px", // thickness of the tick
          height: i % 5 === 0 ? "10px" : "5px", // longer ticks for each 5th second
          backgroundColor: i % 5 === 0 ? "red" : "white",
          // transformOrigin: "bottom center",
          // TODO - if LG - translateY(-168px)
          // TODO if small - translateY(-128px)
          // transform: `rotate(${angle}deg) translateY(-180px)`, // Adjust this value based on your clock size
          transform: `rotate(${angle}deg) translateY(${circleSize}px)`, // Adjust this value based on your clock size
          // transform: `rotate(${angle}deg) translateY(-168px)`, // Adjust this value based on your clock size
          top: "49%",
          left: "50%",
        }}
      />
    );
  }

  return <div>{ticks}</div>;
};

export default ClockTicks;
