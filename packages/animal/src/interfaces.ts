import {animals} from './constants'

export enum AnimalTypes {
  OCEAN = "ocean",
  DESERT = "desert",
  GRASSLAND = "grassland",
  FOREST = "forest",
  FARM = "farm",
  PET = "pet",
  ZOO = "zoo",
}

export interface AnimalOptions {
  /**
   * The type of animal you would like to recieve
   * For example, if `type` is set to 'zoo', only animals that you would expect to see in a zoo will be returned.
   * @default null
   */
  type?: AnimalTypes;
}

export interface AnimalGeneratorFunction {
  /**
   * Return a random boolean, either `true` or `false`.
   *
   * @param {AnimalOptions} [options={ type: 'zoo' }] Change the type of animal that will be returned
   * @param {number} [seed] A numeric seed to pass to the pseudo-random number generator.
   * @throws {TypeError} If `options.likelihood` is out of bounds.
   * @return {string} A string representation of the animals name
   * @example
   * // returns animal that you would expect to find in a zoo
   * animal({ type: 'zoo' })
   */
  (options?: AnimalOptions, seed?: number): string;
}

export interface IAnimalGenerator {
  animal: AnimalGeneratorFunction;
}
