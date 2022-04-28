import { Generator } from "@chancejs/generator";
import { IntegerRangeException } from "./exceptions";
import { IIntegerGenerator, IntegerOptions } from "./interfaces";

interface Range {
  min: number;
  max: number;
}

export class IntegerGenerator extends Generator implements IIntegerGenerator {
  integer(options?: IntegerOptions): number {
    const { min, max } = this._validateRange({
      min: options?.min,
      max: options?.max,
    });
    return Math.floor(this.generator() * (max - min + 1) + min);
  }

  /**
   * Validates the range.
   * @throws {IntegerRangeException} If the min is too low, the max is too high,
   * or the min is greater than the max.
   * @param {Partial<Range>} range The range to validate.
   * @returns {Range} The validated range.
   */
  private _validateRange(range: Partial<Range>): Range {
    let { min, max } = range;
    if (typeof min === "undefined") min = Number.MIN_SAFE_INTEGER;
    if (typeof max === "undefined") max = Number.MAX_SAFE_INTEGER;
    if (typeof min !== "number" || typeof max !== "number")
      throw new IntegerRangeException();
    if (min > max)
      throw new IntegerRangeException(
        "Chance: Min cannot be greater than the max."
      );
    if (min < Number.MIN_SAFE_INTEGER)
      throw new IntegerRangeException(
        "Chance: Min cannot be less than Number.MIN_SAFE_INTEGER."
      );
    if (min > Number.MAX_SAFE_INTEGER)
      throw new IntegerRangeException(
        "Chance: Min cannot be greater than Number.MAX_SAFE_INTEGER."
      );
    if (max < Number.MIN_SAFE_INTEGER)
      throw new IntegerRangeException(
        "Chance: Max cannot be less than Number.MIN_SAFE_INTEGER."
      );
    if (max > Number.MAX_SAFE_INTEGER)
      throw new IntegerRangeException(
        "Chance: Max cannot be greater than Number.MAX_SAFE_INTEGER."
      );
    return {
      min,
      max,
    };
  }
}
