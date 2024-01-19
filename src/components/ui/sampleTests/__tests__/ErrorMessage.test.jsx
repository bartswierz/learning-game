import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorMessage from "../ErrorMessage";

describe.skip("<ErrorMessage />", () => {
  it("should render <ErrorMessage />", () => {
    // const { getByTestId } = render(<ErrorMessage />);
    // const { message } = render(<ErrorMessage message={"some text"} />);
    const { getByTestId } = render(<ErrorMessage message={"some text2"} />);
    expect(getByTestId("message-container")).toHaveTextContent("some text");
    // expect(getByTestId("message-container")).toHaveTextContent("Something went wrong");
  });

  // it("Contains p tag with text", () => {
  //   render(<ErrorMessage />);
  //   expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  // });
});
