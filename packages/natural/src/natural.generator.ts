import { Generator, GeneratorOptions } from "@chancejs/generator";
import { IntegerGenerator } from "@chancejs/integer";
import {
  NaturalExcludeException,
  NaturalNumeralsRangeException,
  NaturalRangeException,
} from "./exceptions";
import { INaturalGenerator, NaturalOptions } from "./interfaces";

interface Range {
  min: number;
  max: number;
}

export class NaturalGenerator extends Generator implements INaturalGenerator {
  private integerGenerator: IntegerGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.integerGenerator = new IntegerGenerator(options);
  }

  natural(options?: NaturalOptions): number {
    const { min, max } = this._validateRange({ ...options }, options?.numerals);
    if (options?.exclude) {
      this._validateExcludeArray(options.exclude);
      let random =
        min + this.natural({ max: max - min - options.exclude.length });
      const sortedExclusions = options.exclude.sort();
      for (let sortedExclusionIndex in sortedExclusions) {
        if (random < sortedExclusions[sortedExclusionIndex]) break;
        random++;
      }
      return random;
    }
    return this.integerGenerator.integer({ min, max });
  }

  /**
   * Validates the range.
   * @throws {NaturalRangeException} If the min is too low, the max is too high,
   * or the min is greater than the max.
   * @param {Partial<Range>} range The range to validate.
   * @param {number} [numerals] The numerals value provided to options.
   * @returns {Range} The validated range.
   */
  private _validateRange(range: Partial<Range>, numerals?: number): Range {
    let min: number, max: number;
    min = this._validateMin(range.min);
    max = this._validateMax(range.max);
    const nums = this._validateNumerals(numerals);
    if (nums) {
      min = Math.max(min, Math.pow(10, nums - 1));
      max = Math.min(max, Math.pow(10, nums) - 1);
    }
    if (min > max)
      throw new NaturalRangeException(
        "Chance: Min cannot be greater than max."
      );
    return {
      min,
      max,
    };
  }

  /**
   * Validates the min value provided in options.
   * @throws {NaturalNumeralsException} If the provided min value is invalid.
   * @param {number} [min] The provided min value.
   * @returns {number} The validated min value or 0 if not provided.
   */
  private _validateMin(min?: number): number {
    switch (typeof min) {
      case "number":
        if (min < 0)
          throw new NaturalRangeException(
            "Chance: Min cannot be less than zero."
          );
        if (min > Number.MAX_SAFE_INTEGER)
          throw new NaturalRangeException(
            "Chance: Min cannot be greater than Number.MAX_SAFE_INTEGER."
          );
        return min;
      case "undefined":
        return 0;
      default:
        throw new NaturalRangeException();
    }
  }

  /**
   * Validates the max value provided in options.
   * @throws {NaturalNumeralsException} If the provided max value is invalid.
   * @param {number} [max] The provided max value.
   * @returns {number} The validated max value or Number.MAX_SAFE_INTEGER if not provided.
   */
  private _validateMax(max?: number): number {
    switch (typeof max) {
      case "number":
        if (max < 0)
          throw new NaturalRangeException(
            "Chance: Max cannot be less than zero."
          );
        if (max > Number.MAX_SAFE_INTEGER)
          throw new NaturalRangeException(
            "Chance: Max cannot be greater than Number.MAX_SAFE_INTEGER."
          );
        return max;
      case "undefined":
        return Number.MAX_SAFE_INTEGER;
      default:
        throw new NaturalRangeException();
    }
  }

  /**
   * Validates the numerals value provided in options.
   * @throws {NaturalNumeralsException} If the provided numerals value is invalid.
   * @param {number} [numerals] The provided numerals value.
   * @returns {number | undefined} The validated numeral value or undefined if not provided.
   */
  private _validateNumerals(numerals?: number): number | undefined {
    switch (typeof numerals) {
      case "number":
        if (numerals < 1)
          throw new NaturalNumeralsRangeException(
            "Chance: Numerals cannot be less than 1."
          );
        if (numerals > 16)
          throw new NaturalNumeralsRangeException(
            "Chance: Numerals cannot be greater than 16."
          );
        return numerals;
      case "undefined":
        return undefined;
      default:
        throw new NaturalNumeralsRangeException();
    }
  }

  /**
   * Validates the exclude array provided in options.
   * @throws {NaturalExcludeException} If array provided is invalid.
   * @param {Array<number>} excludeArray The exclude array to be validated.
   */
  private _validateExcludeArray(excludeArray: number[]): void {
    if (!Array.isArray(excludeArray))
      throw new NaturalExcludeException(
        "Chance: Exclude parameter must be an array of natural numbers."
      );
    for (let exclusionIndex in excludeArray) {
      if (!Number.isInteger(excludeArray[exclusionIndex]))
        throw new NaturalExcludeException();
    }
  }
}
