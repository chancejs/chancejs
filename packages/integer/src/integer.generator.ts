import { Generator, validateRange } from "@chancejs/generator";
import { IIntegerGenerator, IntegerOptions } from "./interfaces";

export class IntegerGenerator extends Generator implements IIntegerGenerator {
  integer(options?: IntegerOptions): number {
    const { min, max } = validateRange(options);
    return Math.floor(this.generator() * (max - min + 1) + min);
  }
}
