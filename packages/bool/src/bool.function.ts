import { BooleanGenerator } from "./boolean.generator";
import { BooleanGeneratorFunction, BooleanOptions } from "./interfaces";

export const bool: BooleanGeneratorFunction = (
  options?: BooleanOptions,
  seed?: number
): boolean => {
  const bg = new BooleanGenerator({ seed });
  return bg.bool(options);
};
