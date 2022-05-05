export interface HexOptions {
  /**
   * The numeric value of the generator range minimum (inclusive).
   * @default 0
   */
  min?: number;
  /**
   * The numeric value of the generator range maximum (inclusive).
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
  /**
   * The casing of the alphabetic characters in the hex string returned.
   * @default 'lower'
   * @example
   * // returns 'a'
   * hex({ min: 10, max: 10 })
   * @example
   * // returns 'A'
   * hex({ min: 10, max: 10, casing: 'upper' })
   */
  casing?: "upper" | "lower";
}

export interface HexGeneratorFunction {
  /**
   * Return a random hex number as string.
   * NOTE: The max and min are INCLUDED in the range.
   *
   * @param {HexOptions} [options={}] Can specify a min and/or max and/or casing.
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @returns {string} A single random hex number as string.
   * @throws {RangeError} The min cannot be greater than max.
   * @example
   * // returns either '9', 'a' or 'b'.
   * chance.hex({min: 9, max: 11});
   */
  (options?: HexOptions, seed?: number): string;
}

export interface IHexGenerator {
  hex: HexGeneratorFunction;
}
