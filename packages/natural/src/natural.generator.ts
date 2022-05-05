import {
  Generator,
  GeneratorOptions,
  validateRange,
  Range,
} from "@chancejs/generator";
import { IntegerGenerator } from "@chancejs/integer";
import {
  NaturalExcludeException,
  NaturalNumeralsRangeException,
} from "./exceptions";
import { INaturalGenerator, NaturalOptions } from "./interfaces";

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
   * @throws {RangeError} If the min is too low, the max is too high,
   * or the min is greater than the max.
   * @param {Partial<Range>} range The range to validate.
   * @param {number} [numerals] The numerals value provided to options.
   * @returns {Range} The validated range.
   */
  private _validateRange(range: Partial<Range>, numerals?: number): Range {
    let { min, max } = validateRange(range, { min: 0 });
    const nums = this._validateNumerals(numerals);
    if (nums) {
      min = Math.max(min, Math.pow(10, nums - 1));
      max = Math.min(max, Math.pow(10, nums) - 1);
    }
    if (min > max)
      throw new RangeError("Chance: Min cannot be greater than max.");
    return {
      min,
      max,
    };
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
