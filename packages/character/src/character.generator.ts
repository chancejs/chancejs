import { Generator, GeneratorOptions } from "@chancejs/generator";
import { NaturalGenerator } from "@chancejs/natural";
import { LETTERS, LETTERS_UPPERCASE, NUMBERS, SYMBOLS } from "./constants";
import { CharacterOptions, ICharacterGenerator } from "./interfaces";

export class CharacterGenerator
  extends Generator
  implements ICharacterGenerator
{
  private naturalGenerator: NaturalGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.naturalGenerator = new NaturalGenerator(options);
  }

  character(options?: CharacterOptions): string {
    let letters: string, pool: string;

    if (options?.casing === "lower") {
      letters = LETTERS;
    } else if (options?.casing === "upper") {
      letters = LETTERS_UPPERCASE;
    } else {
      letters = LETTERS + LETTERS_UPPERCASE;
    }

    if (options?.pool) {
      pool = options?.pool;
    } else {
      pool = "";
      if (options?.alpha) {
        pool += letters;
      }
      if (options?.numeric) {
        pool += NUMBERS;
      }
      if (options?.symbols) {
        pool += SYMBOLS;
      }
      if (!pool) {
        pool = letters + NUMBERS + SYMBOLS;
      }
    }

    const randomIndex = this.naturalGenerator.natural({ max: pool.length - 1 });
    return pool.charAt(randomIndex);
  }
}
