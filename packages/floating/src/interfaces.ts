export interface FloatingOptions {
  /**
   * The minimum for the range to generate the floating point number.
   */
  min?: number;
  /**
   * The maxiumum for the range to generate the floating point number.
   */
  max?: number;

  /**
   * The number of fixed digits after the decimal.
   * Note, a floating point number could be 14.9000 but in JavaScript,
   * when this is cast as a number, the trailing zeroes are dropped.
   * Left to the consumer if trailing zeroes are needed.
   */
  fixed?: number;
  precision?: number;
}

export interface FloatingGeneratorFunction {
  /**
   * Return a random floating-point number.
   * Note, wanted to use "float" or "double" but those are both JS reserved words.
   *
   * @param { FloatingOptions} [options={}]
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @return { number } The randomnly generated floating point number.
   * @throws {FloatingOptionsException} Can only specify fixed or precision, not both.
   * @throws {RangeError} The min cannot be greater than max.
   * @example
   * // returns a floating point number between 1 and 3
   * floating({ min: 1, max: 3 })
   */
  (options?: FloatingOptions, seed?: number): number;
}

export interface IFloatingGenerator {
  floating: FloatingGeneratorFunction;
}
