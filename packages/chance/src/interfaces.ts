// plop-interface-imports
import { IFloatingGenerator } from "@chancejs/floating";
import { IBooleanGenerator } from "@chancejs/bool";
import {
  IRandomNumberGenerator,
  RandomNumberGeneratorFunction,
} from "@chancejs/generator";

/**
 * Types originally borrowed from the @types/chance type definitions.
 * [Link](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chance/index.d.ts)
 */
export type Seed = number | string;

export interface ChanceOptions {
  /**
   * Accepts either a seed or array of seeds to seed the pseudo-random number generator.
   */
  seed?: Seed | Seed[];
  /**
   * A pseudo-random number generator function to use in place of the default Mersenne Twister.
   * Must return a randomnly generated number between zero and one,
   * inclusive of zero, exclusive of one.
   */
  generator?: RandomNumberGeneratorFunction;
}

export type IChance = IRandomNumberGenerator &
  // plop-interface-union
  IFloatingGenerator &
  IBooleanGenerator;
