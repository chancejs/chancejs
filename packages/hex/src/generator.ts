import {
  Generator,
  GeneratorOptions,
  validateRange,
} from "@chancejs/generator";
import { HexOptions, IHexGenerator } from "./interfaces";
import { NaturalGenerator } from "@chancejs/natural";

export class HexGenerator extends Generator implements IHexGenerator {
  private naturalGenerator: NaturalGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.naturalGenerator = new NaturalGenerator(options);
  }

  hex(options?: HexOptions): string {
    const { min, max } = validateRange({ ...options }, { min: 0 });
    const integer = this.naturalGenerator.natural({ min, max });
    if (options?.casing === "upper") {
      return integer.toString(16).toUpperCase();
    }
    return integer.toString(16);
  }
}
