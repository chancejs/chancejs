import { times } from "@chancejs/generator";
import { string } from "./function";
import { natural } from "@chancejs/natural";

describe("string function", () => {
  it("works as expected", () => {
    expect(typeof string()).toBe("string");
  });

  it("obeys length, when specified", () => {
    times(1000, () => {
      const length = natural({ min: 1, max: 25 });
      expect(string({ length }).length).toBe(length);
    });
  });

  test("throws error if length < 0", () => {
    expect(() => string({ length: -23 })).toThrow();
  });

  test("returns only letters with alpha", () => {
    times(1000, () => {
      expect(string({ alpha: true })).toMatch(/[a-zA-Z]+/);
    });
  });

  test("obeys upper case", () => {
    times(1000, () => {
      expect(string({ alpha: true, casing: "upper" })).toMatch(/[A-Z]+/);
    });
  });

  test("obeys lower case", () => {
    times(1000, () => {
      expect(string({ alpha: true, casing: "lower" })).toMatch(/[a-z]+/);
    });
  });

  test("obeys symbol", () => {
    times(1000, () => {
      expect(string({ symbols: true })).toMatch(/[\!\@\#\$\%\^\&\*\(\)\[\]]+/);
    });
  });

  test("can take just a min and obey it", () => {
    times(1000, () => {
      expect(string({ min: 6 }).length).toBeGreaterThanOrEqual(6);
    });
  });

  test("can take just a max and obey it", () => {
    times(1000, () => {
      expect(string({ max: 20 }).length).toBeLessThanOrEqual(20);
    });
  });
});
