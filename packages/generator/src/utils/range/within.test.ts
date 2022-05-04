import { isWithin } from "./within";

describe("isWithin function", () => {
  it("returns true for a number in range", () => {
    expect(isWithin(0, { min: -1, max: 1 })).toBe(true);
  });

  it("returns true for the max of the range", () => {
    expect(isWithin(1, { min: -1, max: 1 })).toBe(true);
  });

  it("returns true for the min of the range", () => {
    expect(isWithin(-1, { min: -1, max: 1 })).toBe(true);
  });

  it("returns false for a number out of range", () => {
    expect(isWithin(10, { min: -1, max: 1 })).toBe(false);
  });

  it("throws if the provided range is invalid", () => {
    expect(() => isWithin(0, { min: 1, max: -1 })).toThrow(RangeError);
  });
});
