export interface CharacterOptions {
  /**
   * Can specify a subset of UTF-8 characters to randomly select from.
   *
   * @example
   * // returns one of "a", "b", or "c"
   * // character({ pool: "abc" })
   */
  pool?: string;

  /**
   * Sets the selection pool to either lower case or upper case alphabetic characters.
   *
   * @example
   * // returns one of "a", "b", "c", ..., "z"
   * // character({ casing: "lower" })
   * @example
   * // returns one of "A", "B", "C", ..., "Z"
   * // character({ casing: "upper" })
   *
   */
  casing?: "upper" | "lower";

  /**
   * Adds alphabetic characters (upper and lower case) to the selection pool.
   *
   * @example
   * // returns one of "a", "A", "b", "B", "c", "C", ..., "z", "Z"
   * // character({ alpha: true })
   */
  alpha?: boolean;

  /**
   * Adds numbers to the selection pool.
   *
   * @example
   * // returns one of "0", "1", "2", ..., "9"
   * // character({ numeric: true })
   */
  numeric?: boolean;

  /**
   * Adds symbols to the selection pool.
   *
   * @example
   * // returns one of "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "[", or "]"
   * // character({ symbols: true })
   */
  symbols?: boolean;
}

export interface CharacterGeneratorFunction {
  /**
   * Return a random character if given a pseudo-random number generator.
   *
   * @param {Partial<CharacterOptions>} [options={}] Can specify a character pool or alpha,
   * numeric, symbols and casing (lower or upper).
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @returns {string} A single random character.
   * @example
   * // returns one of "a", "b", or "c"
   * // character({ pool: "abc" })
   * @example
   * // returns a random alphnumeric character
   * character({ alpha: true, numeric: true })
   */
  (options?: CharacterOptions, seed?: number): string;
}

export interface ICharacterGenerator {
  character: CharacterGeneratorFunction;
}
