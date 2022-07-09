import { times } from "@chancejs/generator";
import Chance from "..";

describe("prime method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  test("prime() returns a number", () => {
    expect(typeof chance.prime()).toBe("number");
  });

  test("prime() throws an error if min < 0", () => {
    expect(() => chance.prime({ min: -23 })).toThrow(
      "Chance: Min cannot be less than 0."
    );
  });

  test("prime() throws an error if min > max", () => {
    expect(() => chance.prime({ min: 1000, max: 500 })).toThrow(
      "Chance: Min cannot be greater than the max."
    );
  });

  test("prime() is always positive and odd (or 2)", () => {
    let count = 0;
    times(1000, () => {
      const p = chance.prime();
      if (p > 0 && (p % 2 === 1 || p === 2)) {
        count++;
      }
    });
    expect(count).toBe(1000);
  });

  test("prime() can take just a min and obey it", () => {
    times(1000, () => {
      expect(chance.prime({ min: 5000 })).toBeGreaterThanOrEqual(5000);
    });
  });

  test("prime() can take just a max and obey it", () => {
    times(1000, () => {
      expect(chance.prime({ max: 20000 })).toBeLessThanOrEqual(20000);
    });
  });

  test("prime() can take both a max and min and obey them both", () => {
    times(1000, () => {
      const p = chance.prime({ min: 90, max: 100 });
      expect(p).toBeGreaterThanOrEqual(90);
      expect(p).toBeLessThanOrEqual(100);
    });
  });
});
