import { Range } from "./interfaces";

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

/**
 * Validates the range.
 * @throws {RangeError} If the min is out of range, the max is out of range,
 * or the min is greater than the max.
 * @param {Partial<Range>} range The range to validate.
 * @param {Partial<Range>} bounds Upper and lower inclusive bounds for the range.
 * @returns {Range} The validated range.
 * @example
 * // returns { min: -5, max: 5 }
 * // validateRange({ max: 5 }, { min: -5, max: 25 })
 * @example
 * // throws RangeError since range is out of bounds
 * // validateRange({ min: -5, max: 5 }, { min: 0, max: 5 })
 */
export const validateRange = (
  range?: Partial<Range>,
  bounds?: Partial<Range>
): Range => {
  // Initialize min, max, lowerBound, and upperBound from options
  const lowerBound: number =
    typeof bounds?.min === "undefined" ? MIN_SAFE_INTEGER : bounds.min;
  const upperBound: number =
    typeof bounds?.max === "undefined" ? MAX_SAFE_INTEGER : bounds.max;
  const min: number =
    typeof range?.min === "undefined" ? lowerBound : range.min;
  const max: number =
    typeof range?.max === "undefined" ? upperBound : range.max;

  // Validate range
  if (min > max || lowerBound > upperBound)
    throw new RangeError("Chance: Min cannot be greater than the max.");
  if (min < lowerBound)
    throw new RangeError(
      `Chance: Min cannot be less than ${printBound(lowerBound)}.`
    );
  if (min > upperBound)
    throw new RangeError(
      `Chance: Min cannot be greater than ${printBound(upperBound)}.`
    );
  if (max < lowerBound)
    throw new RangeError(
      `Chance: Max cannot be less than ${printBound(lowerBound)}.`
    );
  if (max > upperBound)
    throw new RangeError(
      `Chance: Max cannot be greater than ${printBound(upperBound)}.`
    );

  // Return validated min and max
  return {
    min,
    max,
  };
};

const printBound = (bound: number): string => {
  if (bound === MAX_SAFE_INTEGER) {
    ("the largest safe integer allowed in JavaScript (Number.MAX_SAFE_INTEGER)");
  }
  if (bound === MIN_SAFE_INTEGER) {
    ("the smallest safe integer allowed in JavaScript (Number.MIN_SAFE_INTEGER)");
  }
  return bound.toString();
};
