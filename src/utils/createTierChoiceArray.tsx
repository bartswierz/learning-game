import { shuffle } from "lodash";
export const createEasyTierArray = (hour: number) => {
  if (hour === 1) {
    return shuffle(["1:00", "1:30", "2:00", "2:30"]);
  } else if (hour === 12) return shuffle(["12:00", "12:30", "1:00", "1:30"]);
  else return shuffle([`${hour}:00`, `${hour}:30`, `${hour + 1}:00`, `${hour + 1}:30`]);
};

export const createMediumTierArray = (hour: number) => {
  return shuffle([`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`]);
};

export const createHardTierArray = (hour: number) => {
  const hardMinutesArray = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  // Randomly select a starting point for the hard tier then we select the next 3 minute intervals
  const startingPointMinutes = hardMinutesArray[Math.floor(Math.random() * 12)]; // index 0-11

  // setIsTierSelected(true);

  switch (startingPointMinutes) {
    case 0:
      return shuffle([`${hour}:00`, `${hour}:05`, `${hour}:10`, `${hour}:15`]);
    case 5:
      return shuffle([`${hour}:05`, `${hour}:10`, `${hour}:15`, `${hour}:20`]);
    case 10:
      return shuffle([`${hour}:10`, `${hour}:15`, `${hour}:20`, `${hour}:25`]);
    case 15:
      return shuffle([`${hour}:15`, `${hour}:20`, `${hour}:25`, `${hour}:30`]);
    case 20:
      return shuffle([`${hour}:20`, `${hour}:25`, `${hour}:30`, `${hour}:35`]);
    case 25:
      return shuffle([`${hour}:25`, `${hour}:30`, `${hour}:35`, `${hour}:40`]);
    case 30:
      return shuffle([`${hour}:30`, `${hour}:35`, `${hour}:40`, `${hour}:45`]);
    case 35:
      return shuffle([`${hour}:35`, `${hour}:40`, `${hour}:45`, `${hour}:50`]);
    case 40:
      return shuffle([`${hour}:40`, `${hour}:45`, `${hour}:50`, `${hour}:55`]);
    case 45:
      if (hour === 12) return shuffle([`${hour}:45`, `${hour}:50`, `${hour}:55`, `1:00`]);
      return shuffle([`${hour}:45`, `${hour}:50`, `${hour}:55`, `${hour + 1}:00`]);
    case 50:
      if (hour === 12) return shuffle([`${hour}:50`, `${hour}:55`, `1:00`, `1:05`]);
      return shuffle([`${hour}:50`, `${hour}:55`, `${hour + 1}:00`, `${hour + 1}:05`]);
    case 55:
      if (hour === 12) return shuffle([`${hour}:55`, `1:00`, `1:05`, `1:10`]);
      return shuffle([`${hour}:55`, `${hour + 1}:00`, `${hour + 1}:05`, `${hour + 1}:10`]);

    default:
      return shuffle([`${hour}:00`, `${hour}:05`, `${hour}:10`, `${hour}:15`]);
  }
};
