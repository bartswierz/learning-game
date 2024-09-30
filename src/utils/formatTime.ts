// Adds a leading zero to a number if it is less than 10
const padWithZero = (value: number) => (value < 10 ? `0${value}` : value);

const formatTime = (totalTimeInSeconds: number) => {
  const minutes = Math.floor(totalTimeInSeconds / 60);
  const remainingSeconds = totalTimeInSeconds % 60;

  return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
};

export default formatTime;
