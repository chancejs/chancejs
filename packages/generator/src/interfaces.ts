export interface RandomNumberGeneratorFunction {
  /**
   * Generates a pseudo-random number on [0,1)-real-interval.
   *
   * @param {number} [numericSeed] An optional parramter to seed the PRNG.
   * @return {number} A randomnly generated number between zero and one,
   * inclusive of zero, exclusive of one.
   */
  (numericSeed?: number): number;
}

export interface GeneratorOptions {
  /**
   * An optional pseudo-random number generator function to override the default
   * Mersenne Twister implementation.
   */
  generator?: RandomNumberGeneratorFunction;
  /**
   * An optional numeric parramter used to seed the PRNG.
   */
  seed?: number;
}

export interface IRandomNumberGenerator {
  random: RandomNumberGeneratorFunction;
}
