import Chance from "../../src/index";

describe("falsy method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  test("falsy() should return a falsy value", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.falsy()).toBeFalsy();
    }
  });

  test("falsy() should return a falsy value using a pool data", () => {
    for (let i = 0; i < 1000; i++) {
      const value = chance.falsy({ pool: [null, undefined] });
      expect(value === null || value === undefined).toBe(true);
    }
  });
});
