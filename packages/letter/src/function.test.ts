import { times } from "@chancejs/generator";
import { letter } from "./function";

describe("letter function", () => {
  it("returns a letter", () => {
    times(1000, () => {
      const l = letter();
      expect(typeof l).toBe("string");
      expect(l.length).toBe(1);
      expect(l).toMatch(/[a-z]/);
    });
  });

  it("can take upper case", () => {
    times(1000, () => {
      const l = letter({ casing: "upper" });
      expect(typeof l).toBe("string");
      expect(l.length).toBe(1);
      expect(l).toMatch(/[A-Z]/);
    });
  });
});
