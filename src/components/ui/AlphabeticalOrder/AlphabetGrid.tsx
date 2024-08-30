import { useState, useEffect } from "react";
import { shuffle } from "lodash";

const alphabetList = [
  { id: 1, letter: "A" },
  { id: 2, letter: "B" },
  { id: 3, letter: "C" },
  { id: 4, letter: "D" },
  { id: 5, letter: "E" },
  { id: 6, letter: "F" },
  { id: 7, letter: "G" },
  { id: 8, letter: "H" },
  { id: 9, letter: "I" },
  { id: 10, letter: "J" },
  { id: 11, letter: "K" },
  { id: 12, letter: "L" },
  { id: 13, letter: "M" },
  { id: 14, letter: "N" },
  { id: 15, letter: "O" },
  { id: 16, letter: "P" },
  { id: 17, letter: "Q" },
  { id: 18, letter: "R" },
  { id: 19, letter: "S" },
  { id: 20, letter: "T" },
  { id: 21, letter: "U" },
  { id: 22, letter: "V" },
  { id: 23, letter: "W" },
  { id: 24, letter: "X" },
  { id: 25, letter: "Y" },
  { id: 26, letter: "Z" },
];

interface AlphabetGridProps {
  isShuffled?: boolean;
  isEmpty?: boolean;
}

const AlphabetGrid = ({ isShuffled = false, isEmpty = false }: AlphabetGridProps) => {
  const [userChoice, setUserChoice] = useState<string[]>([]);

  const LetterBox = ({ letter }: { letter?: string }) => {
    return <div className="flex justify-center items-center w-[60px] h-[60px] bb">{letter ? letter : null}</div>;
  };

  if (isEmpty) {
    return (
      <ul className="max-w-[1000px] grid grid-cols-13 bb items-center place-content-center gap-3">
        {Array.from({ length: 26 }).map((_, index) => {
          return (
            <li key={index + 1}>
              id: {index + 1}
              <LetterBox />
            </li>
          );
        })}
      </ul>
    );
  }

  if (isShuffled) {
    const shuffledAlphabetList = shuffle(alphabetList);
    return (
      <ul className="max-w-[1000px] grid grid-cols-13 bb items-center place-content-center gap-3">
        {shuffledAlphabetList.map(({ letter, id }) => {
          return (
            <li key={id}>
              id: {id}
              <LetterBox letter={letter} />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="max-w-[1000px] grid grid-cols-13 bb items-center place-content-center gap-3">
      {alphabetList.map(({ letter, id }) => {
        return (
          <li key={id}>
            id: {id}
            <LetterBox letter={letter} />
          </li>
        );
      })}
    </ul>
  );
};

export default AlphabetGrid;
