export interface IntegerOptions {
  /**
   * The bottom of the range of natural integers to choose from.
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number;

  /**
   * The top of the range of natural integers to choose from.
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
}

export interface IntegerGeneratorFunction {
  /**
   * Return a random integer.
   * NOTE: the max and min are INCLUDED in the range.
   * Due to its appraoch to floating point arithmetic, JavaScript has a range of safe
   * integers that do not suffer from precision loss. This range is from Number.MIN_SAFE_INTEGER
   * or -(2^53 - 1) to Number.MAX_SAFE_INTEGER or (2^53 - 1).
   * See [this article](http://vq.io/132sa2j) for more information.
   *
   * @param {IntegerOptions} [options={}] Can specify a min and/or max.
   * @returns {Number} A single random integer number.
   * @throws {IntegerRangeError} If the min is less than the max.
   * @example
   * // returns either 1, 2, or 3.
   * chance.integer({min: 1, max: 3});
   */
  (options?: IntegerOptions, seed?: number): number;
}

export interface IIntegerGenerator {
  integer: IntegerGeneratorFunction;
}
