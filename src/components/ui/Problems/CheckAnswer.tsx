// const CheckAnswer = () => {
//   const handleCheck = () => {
//     const { userInput, numberOne, numberTwo } = globals;
//     // TODO - replace this checkAnswer with a specific function for each operation
//     // Passed as an object to ensure the order of the arguments doesn't matter
//     const isCorrect = checkAnswer({ userInput, numberOne, numberTwo, operationType });

//     // IF correct, score + 1, new question
//     if (isCorrect) {
//       let newNum1: number;
//       let newNum2: number;

//       if (operationType === "DIVISION") {
//         const { num1, num2 } = randomTwoNumbersForDivision(numOneRange, numTwoRange);
//         newNum1 = num1;
//         newNum2 = num2;
//       } else {
//         const { num1, num2 } = randomTwoNumbers(numOneRange, numTwoRange); // TODO - update max value to be the user's selected number range
//         newNum1 = num1;
//         newNum2 = num2;
//       }

//       // USER ANSWERED QUESTION CORRECTLY - UPDATE GLOBAL STATE
//       setGlobals((prev) => ({
//         ...prev,
//         numberOne: newNum1,
//         numberTwo: newNum2,
//         userInput: "",
//         score: prev.score + 1,
//         numOfAttempts: numOfAttempts,
//       }));

//       // SUCCESS - ALL QUESTIONS ANSWERED - GAME OVER
//       if (globals.score === numOfQuestions - 1) {
//         setGlobals((prev) => ({ ...prev, isGameOver: true, progress: "Success" }));
//       }
//     } else {
//       // INCORRECT ANSWER - UPDATE GLOBAL STATE
//       setGlobals((prev) => ({ ...prev, numOfAttempts: prev.numOfAttempts - 1, userInput: "" }));

//       // OUT OF ATTEMPTS - GAME OVER
//       if (globals.numOfAttempts - 1 === 0) {
//         setGlobals((prev) => ({ ...prev, isGameOver: true, progress: "Failed" }));
//       }
//     }
//   };

//   return (
//     <button
//       onClick={handleCheck}
//       className={`${disabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"} bg-blue-500 text-xl px-2 py-3`}
//       disabled={disabled}
//     >
//       Check Answer
//     </button>
//   );
// };

// export default CheckAnswer;
