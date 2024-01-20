const RestartBtn = () => {
  // Resets Game
  // const handleGameReset = () => {
  //   setSettings({
  //     ...settings,
  //     attempts: 3,
  //   });
  //   setMessage("");
  //   setGameOver(false);
  //   generateRandomNumbers(settings);
  //   const { firstNumber, secondNumber } = randomTwoNumbers(1, 10);
  //   console.log("handleGameRest in navbar randomTwoNumbers() => firstNumber, secondNumber: ", firstNumber, secondNumber);
  //   setUserAnswer("");
  // };

  // const handleGameReset = () => {
  //   setAttempts(numOfAttempts);
  //   setScore(0);
  //   setGameOver(false);
  //   setProgress(null);
  //   setUserAnswer("");
  //   const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange);
  //   setNumberOne(num1);
  //   setNumberTwo(num2);
  // };

  return (
    // <div data-testid="restart-btn">
    <button
      className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300"
      // onClick={handleGameReset}
      data-testid="restart-btn"
    >
      Restart Game
    </button>
    // </div>
  );
};

export default RestartBtn;
