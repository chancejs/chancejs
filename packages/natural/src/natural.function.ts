import { NaturalGenerator } from "./natural.generator";
import { NaturalGeneratorFunction, NaturalOptions } from "./interfaces";

export const natural: NaturalGeneratorFunction = (
  options?: NaturalOptions,
  seed?: number
): number => {
  const ng = new NaturalGenerator({ seed });
  return ng.natural(options);
};
