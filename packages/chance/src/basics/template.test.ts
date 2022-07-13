import { times } from "@chancejs/generator";
import Chance from "..";

describe("template method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("works as expected", () => {
    expect(typeof chance.template("A")).toBe("string");
  });

  test("chance.template() returns alpha numeric substituted", () => {
    times(1000, () => {
      expect(chance.template("ID-{Aa}-{##}")).toMatch(
        /^ID-[A-Z][a-z]-[0-9][0-9]$/
      );
    });
  });

  test("chance.template() rejects unknown tokens", () => {
    expect(() => chance.template("{Aa-}")).toThrow(
      'Invalid replacement character: "-".'
    );
    expect(() => chance.template("{Aa{}")).toThrow(
      'Invalid replacement character: "{".'
    );
    expect(() => chance.template("{Aab}")).toThrow(
      'Invalid replacement character: "b".'
    );
  });

  test("chance.template() allows escape sequnce", () => {
    expect(chance.template("\\\\ID-\\{Aa\\}")).toBe("\\ID-{Aa}");
  });

  test("chance.template() rejects invalid escape sequnce", () => {
    expect(() => chance.template("ID-\\Aa")).toThrow(
      'Invalid escape sequence: "\\A".'
    );
  });

  test("chance.template() cannot be undefined", () => {
    // @ts-ignore:next-line
    expect(() => chance.template()).toThrow("Template string is required");
  });

  test("chance.template() cannot be empty", () => {
    expect(() => chance.template("")).toThrow("Template string is required");
  });
});
