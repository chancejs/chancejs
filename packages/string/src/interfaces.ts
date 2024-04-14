import { CharacterOptions } from "@chancejs/character";

export interface StringOptions extends CharacterOptions {
  /**
   * The length of the character string to generate.
   * Must be a positive integer.
   */
  length?: number;
  /**
   * The length of the shortest possible generated character string.
   * Must be a positive integer.
   * @default 5
   */
  min?: number;
  /**
   * The length of the longest possible generated character string.
   * Must be a positive integer.
   * @default 20
   */
  max?: number;
}

export interface StringGeneratorFunction {
  /**
   * Return a random string.
   *
   * @param { StringOptions} [options={}]
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @return { string }
   * @example
   * // returns string
   * string()
   */
  (options?: StringOptions, seed?: number): string;
}

export interface IStringGenerator {
  string: StringGeneratorFunction;
}
