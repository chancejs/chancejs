import {
  NaturalExcludeException,
  NaturalNumeralsRangeException,
} from "@chancejs/natural";
import Chance from "..";

describe("natural method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("returns a random natural", () => {
    expect(typeof chance.natural()).toBe("number");
  });

  it("throws an error if min < 0", () => {
    expect(() => chance.natural({ min: -23 })).toThrow(RangeError);
  });

  it("is always positive or zero", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.natural()).toBeGreaterThanOrEqual(0);
    }
  });

  it("can take just a min and obey it", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.natural({ min: 9_007_199_254_740_991 })).toBeGreaterThan(
        9_007_199_254_740_990
      );
    }
  });

  it("can take just a max and obey it", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.natural({ max: 100 })).toBeLessThan(101);
    }
  });

  it("can take both a max and min and obey them both", () => {
    for (let i = 0; i < 1000; i++) {
      const n = chance.natural({ min: 90, max: 100 });
      expect(n).toBeGreaterThan(89);
      expect(n).toBeLessThan(101);
    }
  });

  it("works with both bounds 0", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.natural({ min: 0, max: 0 })).toBe(0);
    }
  });

  it("respects numerals", () => {
    for (let i = 0; i < 1000; i++) {
      const n = chance.natural({ numerals: 2 });
      expect(n).toBeLessThanOrEqual(99);
      expect(n).toBeGreaterThanOrEqual(10);
    }
  });

  it("works with excluded numbers", () => {
    for (let i = 0; i < 1000; i++) {
      const n = chance.natural({ min: 1, max: 5, exclude: [1, 3] });
      expect(n).toBeLessThanOrEqual(5);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).not.toBe(1);
      expect(n).not.toBe(3);
    }
  });

  it("works within empty exclude option", () => {
    for (let i = 0; i < 1000; i++) {
      const n = chance.natural({ min: 1, max: 5, exclude: [] });
      expect(n).toBeLessThanOrEqual(5);
      expect(n).toBeGreaterThanOrEqual(1);
    }
  });

  it("throws an error if exclude is not an array", () => {
    // @ts-ignore
    expect(() => chance.natural({ min: 1, max: 5, exclude: "foo" })).toThrow(
      NaturalExcludeException
    );
  });

  it("throws an error if exclude is not an array", () => {
    expect(() =>
      // @ts-ignore
      chance.natural({ min: 1, max: 5, exclude: ["puppies", 1] })
    ).toThrow(NaturalExcludeException);
  });

  it("throws an error if min > max", () => {
    expect(() => chance.natural({ min: 1000, max: 500 })).toThrow(RangeError);
  });

  it("throws an error if numerals is less than 1", () => {
    expect(() => chance.natural({ numerals: 0 })).toThrow(
      NaturalNumeralsRangeException
    );
  });
});
