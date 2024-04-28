import { describe, expect, it } from "bun:test";

import { getBodyCost } from "../utils";

describe("getBodyCost", () => {
  it("should return 0 for an empty body", () => {
    expect(getBodyCost([])).toBe(0);
  });

  it("should return the cost of a single part", () => {
    expect(getBodyCost(["move"])).toBe(50);
  });

  it("should return the cost of multiple parts", () => {
    expect(getBodyCost(["move", "carry", "work"])).toBe(200);
  });
});
