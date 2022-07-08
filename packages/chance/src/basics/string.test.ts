import { times } from "@chancejs/generator";
import { natural } from "@chancejs/natural";
import Chance from "..";

describe("string method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("works as expected", () => {
    expect(typeof chance.string()).toBe("string");
  });

  it("obeys length, when specified", () => {
    times(1000, () => {
      const length = natural({ min: 1, max: 25 });
      expect(chance.string({ length }).length).toBe(length);
    });
  });

  test("throws error if length < 0", () => {
    expect(() => chance.string({ length: -23 })).toThrow();
  });

  test("returns only letters with alpha", () => {
    times(1000, () => {
      expect(chance.string({ alpha: true })).toMatch(/[a-zA-Z]+/);
    });
  });

  test("obeys upper case", () => {
    times(1000, () => {
      expect(chance.string({ alpha: true, casing: "upper" })).toMatch(/[A-Z]+/);
    });
  });

  test("obeys lower case", () => {
    times(1000, () => {
      expect(chance.string({ alpha: true, casing: "lower" })).toMatch(/[a-z]+/);
    });
  });

  test("obeys symbol", () => {
    times(1000, () => {
      expect(chance.string({ symbols: true })).toMatch(
        /[\!\@\#\$\%\^\&\*\(\)\[\]]+/
      );
    });
  });

  test("can take just a min and obey it", () => {
    times(1000, () => {
      expect(chance.string({ min: 6 }).length).toBeGreaterThanOrEqual(6);
    });
  });

  test("can take just a max and obey it", () => {
    times(1000, () => {
      expect(chance.string({ max: 20 }).length).toBeLessThanOrEqual(20);
    });
  });
});
