import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorMessage from "../ErrorMessage";

describe.skip("<ErrorMessage />", () => {
  it("should render <ErrorMessage />", () => {
    const { getByTestId } = render(<ErrorMessage message={"some text2"} />);
    expect(getByTestId("message-container")).toHaveTextContent("some text");
  });
});
