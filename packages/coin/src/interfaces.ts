export interface CoinOptions {}

export type CoinFlip = "heads" | "tails";

export interface CoinGeneratorFunction {
  /**
   * Return a random string.
   *
   * @param { CoinOptions} [options={}]
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @return { CoinFlip }
   * @example
   * // returns heads or tails
   * coin() => "heads"
   * coin() => "tails"
   */
  (options?: CoinOptions, seed?: number): CoinFlip;
}

export interface ICoinGenerator {
  coin: CoinGeneratorFunction;
}
