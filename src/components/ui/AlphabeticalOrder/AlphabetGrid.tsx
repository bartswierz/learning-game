const AlphabetGrid = () => {
  const alphabetList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const LetterBox = ({ letter }: { letter: string }) => {
    return <div className="flex justify-center items-center w-[60px] h-[60px] bb">{letter}</div>;
  };

  return (
    <ul className="max-w-[1000px] grid grid-cols-13 bb items-center place-content-center gap-3">
      {alphabetList.map((letter) => {
        return (
          <li key={letter} className="">
            <LetterBox letter={letter} />
          </li>
        );
      })}
    </ul>
  );
};

export default AlphabetGrid;
