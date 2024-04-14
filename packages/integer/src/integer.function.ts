import { IntegerGenerator } from "./integer.generator";
import { IntegerGeneratorFunction, IntegerOptions } from "./interfaces";

export const integer: IntegerGeneratorFunction = (
  options?: IntegerOptions,
  seed?: number
): number => {
  const ig = new IntegerGenerator({ seed });
  return ig.integer(options);
};
