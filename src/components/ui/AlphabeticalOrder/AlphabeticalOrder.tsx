import AlphabetGrid from "./AlphabetGrid";

const AlphabeticalOrder = () => {
  return (
    <div className="bb flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">Arrange the Letters in Alphabetical Order</h2>
      <div className="flex flex-col gap-[100px]">
        {/* TODO - make this an empty grid of 13 col / 2 row grid */}
        {/* <AlphabetGrid /> */}
        {/* TODO - make this a shuffled list of letters */}
        <AlphabetGrid isShuffled />
        <AlphabetGrid />
        <AlphabetGrid isEmpty />
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
