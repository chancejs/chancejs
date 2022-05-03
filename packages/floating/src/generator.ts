import { Generator, GeneratorOptions } from "@chancejs/generator";
import { IntegerGenerator } from "@chancejs/integer";
import {
  FloatingInvalidMaxException,
  FloatingInvalidMinException,
  FloatingOptionsException,
} from "./exceptions";
import { FloatingOptions, IFloatingGenerator } from "./interfaces";

export class FloatingGenerator extends Generator implements IFloatingGenerator {
  private integerGenerator: IntegerGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.integerGenerator = new IntegerGenerator(options);
  }

  floating(options?: FloatingOptions): number {
    if (
      typeof options?.fixed !== "undefined" &&
      typeof options?.precision !== "undefined"
    ) {
      throw new FloatingOptionsException(
        "Chance: Cannot specify both fixed and precision."
      );
    }

    const fixed = Math.pow(10, options?.fixed || 4);

    const max = Number.MAX_SAFE_INTEGER / fixed;
    const min = -max;

    if (options?.min && options?.fixed && options?.min < min) {
      throw new FloatingInvalidMinException(min);
    }

    if (options?.max && options?.fixed && options?.max > max) {
      throw new FloatingInvalidMaxException(max);
    }

    // Todo - Make this work!
    // options.precision = (typeof options.precision !== "undefined") ? options.precision : false;

    const num = this.integerGenerator.integer({
      min: (options?.min || min) * fixed,
      max: (options?.max || max) * fixed,
    });
    const num_fixed = (num / fixed).toFixed(options?.fixed);

    return parseFloat(num_fixed);
  }
}
