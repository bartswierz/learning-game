import useSettingsStore from "@/store/store";
// import { restartGame } from "@/store/actions";
import RestartBtn from "../RestartBtn";
import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/store/store");
console.log("vi: ", vi.mock("@/store/store"));
describe("RestartBtn", () => {
  let mockRestartGame;

  // beforeEach(() => {
  mockRestartGame = vi.fn();

  let storeFunction = useSettingsStore.mockImplementation(
    (state) =>
      // settings: {
      //   numOneRange: { min: 1, max: 10 },
      //   numTwoRange: { min: 1, max: 10 },
      //   numOfAttempts: 3,
      //   numOfQuestions: 5,
      // },
      state.restartGame
  );

  mockRestartGame = storeFunction;
  // console.log("mockRestartGame: ", mockRestartGame);
  // });

  it("renders correctly", () => {
    render(<RestartBtn operationType="ADDITION" />);
    const buttonElement = screen.getByRole("button", { name: /Restart Game/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call function when clicked", () => {
    render(<RestartBtn operationType="ADDITION" />);

    // LOCATE THE BUTTON
    const buttonElement = screen.getByRole("button", { name: /Restart Game/i });

    // USER CLICKS THE RESTART BUTTON
    userEvent.click(buttonElement);

    // CHECK THAT THE FUNCTION WAS CALLED -> handleGlobalReset
    expect(mockRestartGame).toHaveBeenCalled(1);
    console.log("Button was clicked");
    // expect(mockRestartGame).toHaveBeenCalled();
    // TODO - figure out how to test that the function was called with the correct arguments in our handleGlobalReset() function in RestartBtn.tsx
    // expect(mockRestartGame).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(mockRestartGame).toHaveBeenCalledWith(8, 10);
    // expect(mockRestartGame).toHaveBeenCalledWith(expect(8), expect(10));
    // expect(mockRestartGame(8, 10)).toHaveBeenCalledWith(8, 10);
    // console.log("mockRestartGame: ", mockRestartGame);
    // expect(mockRestartGame);
  });
});
// vi.mock("@/store/actions", "restartGame", () => {
//   console.log("mock function - user clicked on restart button");
// });
// // }
// // console.log('restart game: ', restartGame);
// describe("RestartBtn", () => {
//   // beforeEach(() => {
//   let fn = vi.fn();

//   // useSettingsStore.mockImplementation(() => ({
//   //   settings: {
//   //     numOneRange: 1,
//   //     numTwoRange: 10,
//   //   },
//   //   restartGame: mockRestartGame,
//   // }));
//   // mockRestartGame.useSettingsStore.mockImplementation((state) => state.settings.restartGame);
//   console.log(
//     "SETTING STORE: ",
//     useSettingsStore((state) => state.settings.restartGame)
//   );
//   // fn = useSettingsStore((state) => state.settings.restartGame);
//   // let restartGameFn = useSettingsStore.mockImplementation((state) => state.settings.restartGame);

//   // console.log("mockRestartGame: ", fn);

//   // console.log("test function: ", restartGame);
//   it("renders correctly", () => {
//     render(<RestartBtn operationType="ADDITION" />);
//   });

//   it("should call function when clicked", () => {
//     render(<RestartBtn operationType="ADDITION" />);

//     // LOCATE THE BUTTON
//     const restartBtn = screen.getByRole("button", { name: /Restart Game/i });
//     // console.log("restartBtn: ", restartBtn);
//     // USER CLICKS THE RESTART BUTTON
//     userEvent.click(restartBtn);

//     // TODO - add mock function when user clicks the button
//     // CHECK THAT THE FUNCTION WAS CALLED -> handleGlobalReset
//     expect(mockRestartGame).toHaveBeenCalled();

//     // TODO - add logic for inside the statement to see that the handleGlobalReset function was called and calls 'restartGame' at the end of it
//   });
// });
