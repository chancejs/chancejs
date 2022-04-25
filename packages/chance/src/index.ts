/**
 * Chance.js 2.0.0
 * http://chancejs.com
 * (c) 2013 Victor Quinn
 * Chance may be freely distributed or modified under the MIT license.
 */

import { MersenneTwister } from "@chancejs/mersenne-twister/src";
import { BlueImpMD5 } from "@chancejs/blue-imp-md5";
import { BooleanOptions, generateBool } from "@chancejs/bool";

/**
 * Borrowed from the @types/chance type definitions.
 * [Link](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chance/index.d.ts)
 */
type Seed = number | string;

export default class Chance {
  /**
   * An instance of the MersenneTwister class.
   */
  private mt: MersenneTwister;
  /**
   * An instance of the BlueImpMD5 class.
   */
  private bimd5: BlueImpMD5;

  /**
   * The class constructor accepts an abitrary number of seeds as arguments.
   *
   * @param seeds Some number (including zero) of generator seeds.
   */
  constructor(...seeds: Seed[]) {
    this.bimd5 = new BlueImpMD5();
    if (seeds.length) {
      const seed = this._hashSeeds(seeds);
      this.mt = new MersenneTwister(seed);
    } else {
      this.mt = new MersenneTwister();
    }
  }

  /**
   * Hashes an array of seeds.
   *
   * @param {Array<Seed>} seeds The array of seeds to hash.
   * @return {number} The numeric hash returned.
   */
  private _hashSeeds(seeds: Seed[]): number {
    let seed = 0;
    seeds.map((s, i) => {
      let seedling: number;
      if (typeof s === "string") {
        let hash = 0;
        for (let c = 0; c < s.length; c++) {
          hash = s.charCodeAt(c) + (hash << 6) + (hash << 16) - hash;
        }
        seedling = hash;
      } else {
        seedling = s;
      }
      seed += (seeds.length - i) * seedling;
    });
    return seed;
  }

  /**
   * Return a random boolean, either true or false.
   *
   * @param {BooleanOptions} [options={ likelihood: 50 }] Alter the likelihood of
   * receiving a true or false value back.
   * @throws {RangeError} if
   * @return {boolean} Either true or false.
   */
  public bool(options?: BooleanOptions): boolean {
    return generateBool(this.mt.random.bind(this.mt), options);
  }
}
