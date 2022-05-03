import { FloatingGenerator } from "./generator";
import { FloatingGeneratorFunction, FloatingOptions } from "./interfaces";

export const floating: FloatingGeneratorFunction = (
  options?: FloatingOptions,
  seed?: number
): number => {
  const floatingGenerator = new FloatingGenerator({ seed });
  return floatingGenerator.floating(options);
};
