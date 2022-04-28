export interface NaturalOptions {
  /**
   * The bottom of the range of natural integers to choose from.
   * @default 0
   */
  min?: number;

  /**
   * The top of the range of natural integers to choose from.
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;

  /**
   * An array of numbers to exclude from the range.
   */
  exclude?: number[];

  /**
   * The number of digits of the generated number.
   * NOTE: must be an integer between 1 and 16 inclusive.
   */
  numerals?: number;
}

export interface NaturalGeneratorFunction {
  /**
   * Return a random natural number.
   * NOTE: the max and min are INCLUDED in the range.
   *
   * @param {NaturalOptions} [options={}] Can specify a min and/or max or a numerals count.
   * @returns {Number} A single random integer number.
   * @throws {NaturalRangeError} If the min is less than the max.
   * @example
   * // returns either 1, 2, or 3.
   * chance.natural({min: 1, max: 3});
   * @example
   * // returns either 1 or 3.
   * chance.natural({min: 1, max: 3, exclude: [2]});
   * @example
   * // returns a number between 10 and 99 inclusive.
   * chance.natural({ numerals: 2 });
   */
  (options?: NaturalOptions, seed?: number): number;
}

export interface INaturalGenerator {
  natural: NaturalGeneratorFunction;
}
