import { times } from "@chancejs/generator";
import { character } from "./character.function";

describe("character function", () => {
  it("returns a character", () => {
    const char = character();
    expect(typeof char).toBe("string");
    expect(char.length).toBe(1);
  });

  it("pulls only from pool, when specified", () => {
    times(1000, () => {
      const char = character({ pool: "abcde" });
      expect(char).toMatch(/[abcde]/);
    });
  });

  it("allows only alpha", () => {
    times(1000, () => {
      const char = character({ alpha: true });
      expect(char).toMatch(/[a-zA-Z]/);
    });
  });

  it("allows only alphanumeric", () => {
    times(1000, () => {
      const char = character({ alpha: true, numeric: true });
      expect(char).toMatch(/[a-zA-Z0-9]/);
    });
  });

  it("obeys upper case", () => {
    times(1000, () => {
      const char = character({ alpha: true, casing: "upper" });
      expect(char).toMatch(/[A-Z]/);
    });
  });

  it("obeys lower case", () => {
    times(1000, () => {
      const char = character({ alpha: true, casing: "lower" });
      expect(char).toMatch(/[a-z]/);
    });
  });
});
