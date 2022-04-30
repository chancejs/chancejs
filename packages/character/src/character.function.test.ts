import { character } from "./character.function";

describe("character function", () => {
  it("returns a character", () => {
    const char = character();
    expect(typeof char).toBe("string");
    expect(char.length).toBe(1);
  });

  it("pulls only from pool, when specified", () => {
    for (let i = 0; i < 1000; i++) {
      const char = character({ pool: "abcde" });
      expect(char).toMatch(/[abcde]/);
    }
  });

  it("allows only alpha", () => {
    for (let i = 0; i < 1000; i++) {
      const char = character({ alpha: true });
      expect(char).toMatch(/[a-zA-Z]/);
    }
  });

  it("allows only alphanumeric", () => {
    for (let i = 0; i < 1000; i++) {
      const char = character({ alpha: true, numeric: true });
      expect(char).toMatch(/[a-zA-Z0-9]/);
    }
  });

  it("obeys upper case", () => {
    for (let i = 0; i < 1000; i++) {
      const char = character({ alpha: true, casing: "upper" });
      expect(char).toMatch(/[A-Z]/);
    }
  });

  it("obeys lower case", () => {
    for (let i = 0; i < 1000; i++) {
      const char = character({ alpha: true, casing: "lower" });
      expect(char).toMatch(/[a-z]/);
    }
  });
});
