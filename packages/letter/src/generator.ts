import { Generator, GeneratorOptions } from "@chancejs/generator";
import { CharacterGenerator, LETTERS } from "@chancejs/character";
import { LetterOptions, ILetterGenerator } from "./interfaces";

export class LetterGenerator extends Generator implements ILetterGenerator {
  private characterGenerator: CharacterGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.characterGenerator = new CharacterGenerator(options);
  }

  public letter(options?: LetterOptions): string {
    const letter = this.characterGenerator.character({ pool: LETTERS });
    if (options?.casing === "upper") {
      return letter.toUpperCase();
    }
    return letter;
  }
}
