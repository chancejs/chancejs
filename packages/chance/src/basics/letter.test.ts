import { times } from "@chancejs/generator";
import Chance from "..";

describe("letter method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("returns a letter", () => {
    times(1000, () => {
      const letter = chance.letter();
      expect(typeof letter).toBe("string");
      expect(letter.length).toBe(1);
      expect(letter).toMatch(/[a-z]/);
    });
  });

  it("can take upper case", () => {
    times(1000, () => {
      const letter = chance.letter({ casing: "upper" });
      expect(typeof letter).toBe("string");
      expect(letter.length).toBe(1);
      expect(letter).toMatch(/[A-Z]/);
    });
  });
});
