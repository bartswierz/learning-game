import AlphabetGrid from "./AlphabetGrid";
import TextToSpeech from "../TextToSpeech/TextToSpeech";

const AlphabeticalOrder = () => {
  console.log("window.speechSynthesis: ", window.speechSynthesis.getVoices());
  return (
    <div className="bb flex flex-col justify-center items-center mx-6 my-[56px]">
      <h2 className="text-2xl">
        Arrange the Letters in Alphabetical Order
        <TextToSpeech text="Arrange the Letters in Alphabetical Order" />
        {/* <TextToSpeech text="Es a nice, great success" /> */}
      </h2>
      <div className="flex flex-col gap-[50px]">
        <AlphabetGrid isShuffled />
        <AlphabetGrid />
        <AlphabetGrid isEmpty />
      </div>
    </div>
  );
};

export default AlphabeticalOrder;
