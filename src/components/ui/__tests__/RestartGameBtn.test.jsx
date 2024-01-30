import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RestartBtn from "../RestartBtn";

// queryByTestId - returns null if the element is NOT FOUND(did not render or hasn't been added to the DOM)
describe.skip("<RestartBtn />", () => {
  it("should not be rendered", () => {
    // const { getByTestId } = render(<RestartGameBtn />);
    // expect(getByTestId("restart-game-btn")).not.toBeInTheDocument();
    const { queryByTestId } = render(<RestartBtn />);
    expect(queryByTestId("restart-game-btn")).not.toBeInTheDocument();
  });
});
