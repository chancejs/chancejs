import { BooleanGenerator } from "@chancejs/bool";
import { Generator, GeneratorOptions } from "@chancejs/generator";
import { CoinFlip, CoinOptions, ICoinGenerator } from "./interfaces";

export class CoinGenerator extends Generator implements ICoinGenerator {
  private booleanGenerator: BooleanGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.booleanGenerator = new BooleanGenerator(options);
  }

  public coin(options?: CoinOptions): CoinFlip {
    return this.booleanGenerator.bool() ? "heads" : "tails";
  }
}
