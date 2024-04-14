export interface PrimeOptions {
  /**
   * The inclusive minimum bound of the interval from which to select a prime number.
   * @default 0
   */
  min?: number;
  /**
   * The inclusive maximum bound of the interval from which to select a prime number.
   * @default 10000
   */
  max?: number;
}

export interface PrimeGeneratorFunction {
  /**
   * Return a random number.
   *
   * @param { PrimeOptions} [options={}]
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @return { number }
   * @example
   * // returns prime number
   * prime()
   */
  (options?: PrimeOptions, seed?: number): number;
}

export interface IPrimeGenerator {
  prime: PrimeGeneratorFunction;
}
