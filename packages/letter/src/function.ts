import { LetterGenerator } from "./generator";
import { LetterGeneratorFunction, LetterOptions } from "./interfaces";

export const letter: LetterGeneratorFunction = (
  options?: LetterOptions,
  seed?: number
): string => {
  const letterGenerator = new LetterGenerator({ seed });
  return letterGenerator.letter(options);
};
