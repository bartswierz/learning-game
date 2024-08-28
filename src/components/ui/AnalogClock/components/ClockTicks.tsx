const ClockTicks = () => {
  const ticks = [];
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
          // transform: `rotate(${angle}deg) translateY(-180px)`, // Adjust this value based on your clock size
          transform: `rotate(${angle}deg) translateY(-168px)`, // Adjust this value based on your clock size
          top: "49%",
          left: "50%",
        }}
      />
    );
  }

  return <div className="p-4">{ticks}</div>;
};

export default ClockTicks;
