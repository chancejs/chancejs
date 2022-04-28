export interface BooleanOptions {
  /**
   * A number between 0 and 100 that sets the percentage probability that `true` will be returned.
   * For example, if `likelihood` is set to 80, that means `bool` will return `true` 80% of the time.
   *
   * @default 50
   */
  likelihood?: number;
}

export interface BooleanGeneratorFunction {
  /**
   * Return a random boolean, either `true` or `false`.
   *
   * @param {BooleanOptions} [options={ likelihood: 50 }] Alter the likelihood of
   * receiving a `true` or `false` value back.
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @throws {RangeError} If `options.likelihood` is out of bounds.
   * @return {boolean} Either `true` or `false`..
   * @example
   * // returns true 80% of the time
   * bool({ likelihood: 80 })
   */
  (options?: BooleanOptions, seed?: number): boolean;
}

export interface IBooleanGenerator {
  bool: BooleanGeneratorFunction;
}
