import { CharacterGenerator } from "./character.generator";
import { CharacterGeneratorFunction, CharacterOptions } from "./interfaces";

export const character: CharacterGeneratorFunction = (
  options?: CharacterOptions,
  seed?: number
): string => {
  const cg = new CharacterGenerator({ seed });
  return cg.character(options);
};
