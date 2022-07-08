export interface IPickOne {
  /**
   * Return a single random element from a given array.
   *
   * @template T
   * @param {Array<T>} array Array to pick from.
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @returns {T} A single random element of type T.
   * @example
   * // returns either 1, 2, or 3.
   * pickOne([1, 2, 3]);
   */
  <T>(array: T[], seed?: number): T;
}

export interface IPickSet {
  /**
   * Return a random set of elements from a given array.
   *
   * @template T
   * @param {Array<T>} array Array to pick from.
   * @param {count} number The number of elements to select.
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @returns {Array<T>} An of randomly selected elements of type T.
   * @example
   * // returns either [1, 2], [2, 3], [1, 3], [2, 1], [3, 2], or [3, 1].
   * pickSet([1, 2, 3], 2);
   */
  <T>(array: T[], count: number, seed?: number): T[];
}

export interface IPicker {
  pickOne: IPickOne;
  pickSet: IPickSet;
}
