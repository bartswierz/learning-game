import { shuffle } from "lodash";

interface TierChoiceProps {
  setChoicesArray: (Timelist: string[]) => void;
  hour: number;
}

const TierChoice = ({ setChoicesArray, hour }: TierChoiceProps) => {
  const handleEasyTier = (hour: number) => {
    if (hour === 1) {
      setChoicesArray(shuffle(["1:00", "1:30", "2:00", "2:30"]));
      return;
    } else if (hour === 12) setChoicesArray(shuffle(["12:00", "12:30", "1:00", "1:30"]));
    else setChoicesArray(shuffle([`${hour}:00`, `${hour}:30`, `${hour + 1}:00`, `${hour + 1}:30`]));
  };

  const handleMediumTier = (hour: number) => {
    setChoicesArray(shuffle([`${hour}:00`, `${hour}:15`, `${hour}:30`, `${hour}:45`]));
  };

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

  return (
    <div className="flex gap-4 my-4">
      <button onClick={() => handleEasyTier(hour)} className="cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 text-center">
        Easy
        <br />
        30 mins
      </button>
      <button
        onClick={() => handleMediumTier(hour)}
        className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-center"
      >
        Medium <br />
        15 mins
      </button>
      <button onClick={() => handleHardTier(hour)} className="cursor-pointer bg-red-600 hover:bg-red-700 px-4 py-2 text-center">
        Hard
        <br />5 mins
      </button>
    </div>
  );
};

export default TierChoice;
