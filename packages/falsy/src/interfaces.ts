export const FALSY_VALUES = [false, null, 0, NaN, "", undefined] as const;
export type Falsy = typeof FALSY_VALUES[number];

export interface FalsyOptions {
  /**
   * The pool of falsy values to randomly select from.
   * @example
   * // returns either null or false
   * falsy({ pool: [null, false] })
   */
  pool: Falsy[];
}

export interface FalsyGeneratorFunction {
  /**
   * Return a random Falsy.
   *
   * @param { FalsyOptions} [options={}]
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @return { Falsy }
   * @example
   * // returns Falsy
   * falsy()
   */
  (options?: FalsyOptions, seed?: number): Falsy;
}

export interface IFalsyGenerator {
  falsy: FalsyGeneratorFunction;
}
