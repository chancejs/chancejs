import { times } from "@chancejs/generator";
import { pickSet } from "./pickSet";

describe("PickSet function", () => {
  it("returns empty array when count 0", () => {
    const arr = ["a", "b", "c", "d"];
    times(1000, () => {
      const picked = pickSet(arr, 0);
      expect(picked.length).toBe(0);
      expect(Array.isArray(picked)).toBe(true);
    });
  });

  it("throws if zero elements in array", () => {
    expect(() => pickSet([], 1)).toThrow(
      "Chance: Cannot pickSet() from an empty array"
    );
  });

  it("throws if count is not positive number", () => {
    const arr = ["a", "b", "c", "d"];
    expect(() => pickSet(arr, -1)).toThrow(
      "Chance: Count must be a positive number"
    );
  });

  it("returns single element array when called with count of 1", () => {
    const arr = ["a", "b", "c", "d"];
    times(1000, () => {
      const picked = pickSet(arr, 1);
      expect(picked.length).toBe(1);
      expect(Array.isArray(picked)).toBe(true);
    });
  });

  it("returns multiple elements when called with count > 1", () => {
    const arr = ["a", "b", "c", "d"];
    times(1000, () => {
      const picked = pickSet(arr, 3);
      expect(picked.length).toBe(3);
      expect(Array.isArray(picked)).toBe(true);
    });
  });

  it("returns no more values than the size of the array", () => {
    const arr = ["a", "b", "c", "d"];
    times(1000, () => {
      const picked = pickSet(arr, 5);
      expect(picked.length).toBe(4);
    });
  });

  it("does not modify the original array", () => {
    const arr = ["a", "b", "c", "d", "e", "f"];
    times(1000, () => {
      let clone = [...arr];
      pickSet(clone, 3);
      expect(clone.length).toBe(6);
      expect(arr).toStrictEqual(clone);
    });
  });

  it("returns unique values", () => {
    const arr = ["a", "b", "c", "d"];
    times(1000, () => {
      const picked = pickSet(arr, 4);
      expect(picked).toContain("a");
      expect(picked).toContain("b");
      expect(picked).toContain("c");
      expect(picked).toContain("d");
    });
  });
});
