import { times } from "@chancejs/generator";
import { template } from "./function";

describe("template function", () => {
  it("works as expected", () => {
    expect(typeof template("A")).toBe("string");
  });

  test("template() returns alpha numeric substituted", () => {
    times(1000, () => {
      expect(template("ID-{Aa}-{##}")).toMatch(/^ID-[A-Z][a-z]-[0-9][0-9]$/);
    });
  });

  test("template() rejects unknown tokens", () => {
    expect(() => template("{Aa-}")).toThrow(
      'Invalid replacement character: "-".'
    );
    expect(() => template("{Aa{}")).toThrow(
      'Invalid replacement character: "{".'
    );
    expect(() => template("{Aab}")).toThrow(
      'Invalid replacement character: "b".'
    );
  });

  test("template() allows escape sequnce", () => {
    expect(template("\\\\ID-\\{Aa\\}")).toBe("\\ID-{Aa}");
  });

  test("template() rejects invalid escape sequnce", () => {
    expect(() => template("ID-\\Aa")).toThrow(
      'Invalid escape sequence: "\\A".'
    );
  });

  test("template() cannot be undefined", () => {
    // @ts-ignore:next-line
    expect(() => template()).toThrow("Template string is required");
  });

  test("template() cannot be empty", () => {
    expect(() => template("")).toThrow("Template string is required");
  });
});
