/**
 * Chance.js 2.0.0
 * http://chancejs.com
 * (c) 2013 Victor Quinn
 * Chance may be freely distributed or modified under the MIT license.
 */

// plop-imports
import { HexGenerator, HexOptions } from "@chancejs/hex";
import { FloatingGenerator, FloatingOptions } from "@chancejs/floating";
import { ChanceOptions, IChance, Seed } from "./interfaces";
import { RandomNumberGenerator } from "@chancejs/generator";
import { BooleanGenerator, BooleanOptions } from "@chancejs/bool";
import { IntegerGenerator, IntegerOptions } from "@chancejs/integer";
import { NaturalGenerator, NaturalOptions } from "@chancejs/natural";
import { CharacterGenerator, CharacterOptions } from "@chancejs/character";
import { FalsyGenerator, FalsyOptions, Falsy } from "@chancejs/falsy";

export class Chance implements IChance {
  // plop-class-fields
  private hexGenerator: HexGenerator;
  private floatingGenerator: FloatingGenerator;
  private randomNumberGenerator: RandomNumberGenerator;
  private booleanGenerator: BooleanGenerator;
  private integerGenerator: IntegerGenerator;
  private naturalGenerator: NaturalGenerator;
  private characterGenerator: CharacterGenerator;
  private falsyGenerator: FalsyGenerator;

  constructor(options?: ChanceOptions) {
    let seed: number | undefined = undefined;
    // If seed provided is an array of seeds
    if (typeof options?.seed === "object") {
      seed = this._hashSeeds(options.seed);
    } else if (options?.seed) {
      seed = this._hashSeeds([options.seed]);
    }
    const generator = options?.generator;
    // plop-constructor
    this.hexGenerator = new HexGenerator({ seed, generator });
    this.floatingGenerator = new FloatingGenerator({ seed, generator });
    this.randomNumberGenerator = new RandomNumberGenerator({ seed, generator });
    this.booleanGenerator = new BooleanGenerator({ seed, generator });
    this.integerGenerator = new IntegerGenerator({ seed, generator });
    this.naturalGenerator = new NaturalGenerator({ seed, generator });
    this.characterGenerator = new CharacterGenerator({ seed, generator });
    this.falsyGenerator = new FalsyGenerator({ seed, generator });
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

  // plop-class-methods
  hex(options?: HexOptions): string {
    return this.hexGenerator.hex(options);
  }

  floating(options?: FloatingOptions): number {
    return this.floatingGenerator.floating(options);
  }

  random(): number {
    return this.randomNumberGenerator.random();
  }

  bool(options?: BooleanOptions): boolean {
    return this.booleanGenerator.bool(options);
  }

  integer(options?: IntegerOptions): number {
    return this.integerGenerator.integer(options);
  }

  natural(options?: NaturalOptions): number {
    return this.naturalGenerator.natural(options);
  }

  character(options?: CharacterOptions): string {
    return this.characterGenerator.character(options);
  }

  falsy(options?: FalsyOptions): Falsy {
    return this.falsyGenerator.falsy(options);
  }
}

export default Chance;
