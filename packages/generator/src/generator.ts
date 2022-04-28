import { MersenneTwister } from "@chancejs/mersenne-twister";
import { GeneratorOptions, RandomNumberGeneratorFunction } from "./interfaces";

export abstract class Generator {
  public generator: RandomNumberGeneratorFunction;
  constructor(options?: GeneratorOptions) {
    if (options?.generator)
      this.generator = options.generator.bind(options.seed);
    else {
      const mt = new MersenneTwister(options?.seed);
      this.generator = mt.random.bind(mt);
    }
  }
}
