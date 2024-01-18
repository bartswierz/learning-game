import { describe, it, expect } from "vitest";

describe("A truthy statement", () => {
  it("should be equal to 2", () => {
    expect(1 + 1).toBe(2);
    // expect(2 + 1).toBe(4);
  });
});
