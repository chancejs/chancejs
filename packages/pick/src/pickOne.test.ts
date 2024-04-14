import { times } from "@chancejs/generator";
import { pickOne } from "./pickOne";

describe("pickOne function", () => {
  it("does not modify the original array", () => {
    let arr = ["a", "b", "c", "d", "e", "f"];
    times(1000, () => {
      const clone = [...arr];
      pickOne(clone);
      expect(clone.length).toBe(6);
      expect(arr).toStrictEqual(clone);
    });
  });

  it("returns a single element", () => {
    let arr = ["a", "b", "c", "d"];
    times(1000, () => {
      let picked = pickOne(arr);
      expect(picked.length).toBe(1);
      expect(Array.isArray(picked)).toBe(false);
    });
  });

  it("throws if zero elements in array", () => {
    expect(() => pickOne([])).toThrow(
      "Chance: Cannot pickOne() from an empty array"
    );
  });
});
