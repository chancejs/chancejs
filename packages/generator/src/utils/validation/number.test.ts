import { InvalidNumberException } from "./exceptions";
import { validateNumber } from "./number";

describe("validateNumber function", () => {
  it("returns a valid number", () => {
    const number = validateNumber(2.5, { range: { min: -10, max: 10 } });
    expect(number).toBe(2.5);
  });

  it("returns a valid integer", () => {
    const number = validateNumber(5, { range: { min: -10, max: 10 } });
    expect(number).toBe(5);
  });

  it("throws if the number is out of range", () => {
    expect(() => validateNumber(2.5, { range: { max: 1 } }));
  });

  it("throws if the number is not an integer and isInteger is true", () => {
    expect(() => validateNumber(2.5, { isInteger: true })).toThrow(
      InvalidNumberException
    );
  });
});
