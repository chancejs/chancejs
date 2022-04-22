import { MersenneTwister } from "../utils/MersenneTwister";

export interface BooleanOptions {
  /**
   * A number between 0 and 100 that sets the percentage probability that `true` will be returned.
   * For example, if `likelihood` is set to 80, that means `bool` will return `true` 80% of the time.
   *
   * @default 50
   */
  likelihood: number;
}

/**
 * Return a random boolean if given a pseudo-random number generator.
 *
 * @param {() => number} random Pseudo-random number generator to use.
 * @param {BooleanOptions} [options={ likelihood: 50 }] Alter the likelihood of
 * receiving a true or false value back.
 * @throws {RangeError} If the likelihood is out of bounds.
 * @returns {Bool} Either true or false.
 */
export const generateBool = (
  random: () => number,
  options: BooleanOptions = { likelihood: 50 }
): boolean => {
  if (options.likelihood < 0 || options.likelihood > 100)
    throw new RangeError("Chance: Likelihood accepts values from 0 to 100.");
  return random() * 100 < options.likelihood;
};

/**
 * Return a random boolean, either `true` or `false`.
 *
 * @param {BooleanOptions} [options={ likelihood: 50 }] Alter the likelihood of
 * receiving a `true` or `false` value back.
 * @param {number} [seed] A seed to pass to the pseudo-random number generator.
 * @throws {RangeError} If `options.likelihood` is out of bounds.
 * @return {boolean} Either `true` or `false`..
 * @example
 * // returns true 80% of the time
 * bool({ likelihood: 80 })
 */
export const bool = (
  options: BooleanOptions = { likelihood: 50 },
  seed?: number
): boolean => {
  const mt = new MersenneTwister(seed);
  return generateBool(mt.random.bind(mt), options);
};
