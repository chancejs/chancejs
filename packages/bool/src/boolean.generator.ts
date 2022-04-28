import { Generator } from "@chancejs/generator";
import { BooleanLiklihoodRangeException } from "./exceptions";
import { BooleanOptions, IBooleanGenerator } from "./interfaces";

export class BooleanGenerator extends Generator implements IBooleanGenerator {
  bool(options?: BooleanOptions): boolean {
    const likelihood = options?.likelihood || 50;
    if (likelihood < 0 || likelihood > 100)
      throw new BooleanLiklihoodRangeException();
    return this.generator() * 100 < likelihood;
  }
}
