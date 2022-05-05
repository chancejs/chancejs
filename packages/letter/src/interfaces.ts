export interface LetterOptions {
  /**
   * Specify the casing of the randomly generated letter (e.g. upper case or lower case).
   * @default 'lower'
   */
  casing: "upper" | "lower";
}

export interface LetterGeneratorFunction {
  /**
   * Return a randomly geneated letter.
   *
   * @param { LetterOptions} [options={}] Can specify casing.
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @return { string }
   * @example
   * // returns "a", "b", "c", ..., or "z"
   * letter()
   * * @example
   * // returns "A", "B", "C", ..., or "Z"
   * letter({ casing: 'upper' })
   */
  (options?: LetterOptions, seed?: number): string;
}

export interface ILetterGenerator {
  letter: LetterGeneratorFunction;
}
