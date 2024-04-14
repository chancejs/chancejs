import { validateRange } from "./validate";

describe("validateRange function", () => {
  it("returns the largest safe integer interval by default", () => {
    const validatedRange = validateRange();
    expect(validatedRange).toStrictEqual({
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
    });
  });

  it("returns a specified range that is valid", () => {
    const validatedRange = validateRange({ min: -1, max: 1 });
    expect(validatedRange).toStrictEqual({ min: -1, max: 1 });
  });

  it("returns a specified range that is within bounds", () => {
    const validatedRange = validateRange(
      { min: -1, max: 1 },
      { min: -5, max: 5 }
    );
    expect(validatedRange).toStrictEqual({ min: -1, max: 1 });
  });

  it("returns a specified range if the range is equal to the specified bounds", () => {
    const validatedRange = validateRange(
      { min: -1, max: 1 },
      { min: -1, max: 1 }
    );
    expect(validatedRange).toStrictEqual({ min: -1, max: 1 });
  });

  it("throws when given a specified range that is outside of bounds", () => {
    expect(() =>
      validateRange({ min: -5, max: 5 }, { min: -1, max: 1 })
    ).toThrow(RangeError);
  });

  it("throws when given a min below the lowest safe integer", () => {
    expect(() =>
      validateRange({ min: Number.MIN_SAFE_INTEGER - 10, max: 0 })
    ).toThrow(RangeError);
  });

  it("can handle dangerously low intervals using specified bounds", () => {
    expect(() =>
      validateRange(
        { min: Number.MIN_SAFE_INTEGER - 10, max: 0 },
        { min: Number.MIN_SAFE_INTEGER - 10, max: 0 }
      )
    ).not.toThrow();
  });

  it("throws when given a upper bound above the highest safe integer", () => {
    expect(() =>
      validateRange({ min: 0, max: Number.MAX_SAFE_INTEGER + 10 })
    ).toThrow(RangeError);
  });

  it("can handle dangerously high intervals using specified bounds", () => {
    expect(() =>
      validateRange(
        { min: 0, max: Number.MAX_SAFE_INTEGER + 10 },
        { min: 0, max: Number.MAX_SAFE_INTEGER + 10 }
      )
    ).not.toThrow();
  });

  it("throws when min is greater than max", () => {
    expect(() => validateRange({ min: 1, max: -1 })).toThrow(RangeError);
  });

  it("throws when lower bound is greater than upper bound", () => {
    expect(() =>
      validateRange({ min: -1, max: 1 }, { min: 1, max: -1 })
    ).toThrow(RangeError);
  });

  it("should return largest safe integer as the max range by default", () => {
    expect(validateRange({ min: 0 })).toStrictEqual({
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
    });
  });

  it("should return upper bound as the max range when specified", () => {
    expect(validateRange({ min: 0 }, { min: -5, max: 5 })).toStrictEqual({
      min: 0,
      max: 5,
    });
  });

  it("should return smallest safe integer as the min range by default", () => {
    expect(validateRange({ max: 0 })).toStrictEqual({
      min: Number.MIN_SAFE_INTEGER,
      max: 0,
    });
  });

  it("should return lower bound as the min range when specified", () => {
    expect(validateRange({ max: 0 }, { min: -5, max: 5 })).toStrictEqual({
      min: -5,
      max: 0,
    });
  });
});
