import { times } from "@chancejs/generator";
import { falsy } from "./function";

describe("falsy function", () => {
  test("falsy() should return a falsy value", () => {
    times(1000, () => {
      expect(falsy()).toBeFalsy();
    });
  });

  test("falsy() should return a falsy value using a pool data", () => {
    times(1000, () => {
      const value = falsy({ pool: [null, undefined] });
      expect(value === null || value === undefined).toBe(true);
    });
  });
});
