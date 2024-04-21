import { AnimalGenerator } from "./animal.generator";
import { AnimalGeneratorFunction, AnimalOptions } from "./interfaces";

export const animal: AnimalGeneratorFunction = (
  options?: AnimalOptions,
  seed?: number
): string => {
  const generator = new AnimalGenerator({ seed });
  return generator.animal(options);
};
