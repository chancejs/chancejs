import { Range } from "./interfaces";
import { validateRange } from "./validate";

/**
 * Determines whether a number is within a given range.
 *
 * @param number The number.
 * @param range The range.
 * @return {boolean} True if the number is within range, otherwise false.
 * @throws {RangeError} If the given range is invalid.
 */
export const isWithin = (number: number, range: Range): boolean => {
  const validatedRange = validateRange(range);
  const { min, max } = validatedRange;
  if (min && number < min) return false;
  if (max && number > max) return false;
  return true;
};
