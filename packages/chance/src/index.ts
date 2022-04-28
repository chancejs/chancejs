/**
 * Chance.js 2.0.0
 * http://chancejs.com
 * (c) 2013 Victor Quinn
 * Chance may be freely distributed or modified under the MIT license.
 */

import { BooleanGenerator, BooleanOptions } from "@chancejs/bool";
import { ChanceOptions, IChance, Seed } from "./interfaces";
import { RandomNumberGenerator } from "@chancejs/generator";

export class Chance implements IChance {
  private randomNumberGenerator: RandomNumberGenerator;
  private booleanGenerator: BooleanGenerator;

  constructor(options?: ChanceOptions) {
    let seed: number | undefined = undefined;
    // If seed provided is an array of seeds
    if (typeof options?.seed === "object") {
      seed = this._hashSeeds(options.seed);
    } else if (options?.seed) {
      seed = this._hashSeeds([options.seed]);
    }
    const randomNumberGenerator = new RandomNumberGenerator({
      seed,
      generator: options?.generator,
    });
    this.randomNumberGenerator = randomNumberGenerator;
    const generator = randomNumberGenerator.random.bind(this);
    this.booleanGenerator = new BooleanGenerator({ seed, generator });
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

  random(): number {
    return this.randomNumberGenerator.random();
  }

  bool(options?: BooleanOptions): boolean {
    return this.booleanGenerator.bool(options);
  }
}

export default Chance;
