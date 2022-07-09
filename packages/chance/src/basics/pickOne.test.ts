import { times } from "@chancejs/generator";
import Chance from "..";

describe("pickOne method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("does not modify the original array", () => {
    let arr = ["a", "b", "c", "d", "e", "f"];
    times(1000, () => {
      const clone = [...arr];
      chance.pickOne(clone);
      expect(clone.length).toBe(6);
      expect(arr).toStrictEqual(clone);
    });
  });

  it("returns a single element", () => {
    let arr = ["a", "b", "c", "d"];
    times(1000, () => {
      let picked = chance.pickOne(arr);
      expect(picked.length).toBe(1);
      expect(Array.isArray(picked)).toBe(false);
    });
  });

  it("throws if zero elements in array", () => {
    expect(() => chance.pickOne([])).toThrow(
      "Chance: Cannot pickOne() from an empty array"
    );
  });
});
