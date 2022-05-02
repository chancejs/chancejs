import { Generator, GeneratorOptions } from "@chancejs/generator";
import { IntegerGenerator } from "@chancejs/integer";
import {
  Falsy,
  FalsyOptions,
  FALSY_VALUES,
  IFalsyGenerator,
} from "./interfaces";

export class FalsyGenerator extends Generator implements IFalsyGenerator {
  private integerGenerator: IntegerGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.integerGenerator = new IntegerGenerator(options);
  }

  falsy(options?: FalsyOptions): Falsy {
    const pool = options?.pool || FALSY_VALUES;
    const randomIndex = this.integerGenerator.integer({
      min: 0,
      max: pool.length - 1,
    });
    return pool[randomIndex];
  }
}
