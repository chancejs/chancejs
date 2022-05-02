import { falsy } from "./function";

describe("falsy function", () => {
  test("falsy() should return a falsy value", () => {
    for (let i = 0; i < 1000; i++) {
      expect(falsy()).toBeFalsy();
    }
  });

  test("falsy() should return a falsy value using a pool data", () => {
    for (let i = 0; i < 1000; i++) {
      const value = falsy({ pool: [null, undefined] });
      expect(value === null || value === undefined).toBe(true);
    }
  });
});
