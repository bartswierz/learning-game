const RestartGameBtn = () => {
  // Resets Game
  const handleGameReset = () => {
    setSettings({
      ...settings,
      attempts: 3,
    });
    setMessage("");
    setGameOver(false);
    generateRandomNumbers(settings);
    const { firstNumber, secondNumber } = randomTwoNumbers(1, 10);
    console.log("handleGameRest in navbar randomTwoNumbers() => firstNumber, secondNumber: ", firstNumber, secondNumber);
    setUserAnswer("");
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 hover:text-white hover:ring ring-slate-200 px-4 py-2 rounded-full hover:shadow-xl transition-all duration-300"
      onClick={handleGameReset}
    >
      Restart Game
    </button>
  );
};

export default RestartGameBtn;
