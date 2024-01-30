import useSettingsStore from "@/store/store";
// import { restartGame } from "@/store/actions";
import RestartBtn from "../RestartBtn";
import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// function testFunction() {
//   console.log("test function");
//   const restartGame = useSettingsStore((state) => state.restartGame);

//   return restartGame

// }
// console.log('restart game: ', restartGame);
describe("RestartBtn", () => {
  // console.log("test function: ", restartGame);
  it("renders correctly", () => {
    render(<RestartBtn operationType="ADDITION" />);
  });

  it("should call function when clicked", () => {
    render(<RestartBtn operationType="ADDITION" />);

    // LOCATE THE BUTTON
    const restartBtn = screen.getByRole("button", { name: /Restart Game/i });
    // console.log("restartBtn: ", restartBtn);
    // USER CLICKS THE RESTART BUTTON
    userEvent.click(restartBtn);

    // TODO - add mock function when user clicks the button
    // CHECK THAT THE FUNCTION WAS CALLED -> handleGlobalReset
    // expect(mockRestartGame).toHaveBeenCalled();

    // TODO - add logic for inside the statement to see that the handleGlobalReset function was called and calls 'restartGame' at the end of it
  });
});
