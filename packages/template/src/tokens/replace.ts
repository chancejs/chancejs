import {
  CharacterGenerator,
  LETTERS,
  LETTERS_UPPERCASE,
  NUMBERS,
} from "@chancejs/character";
import {
  InvalidReplacementCharacterException,
  TokenCharacterException,
} from "./errors";
import { IToken } from "./interface";

export class ReplaceToken implements IToken {
  private replacer: string;
  constructor(token: string) {
    if (!token) throw new TokenCharacterException();
    if (!["#", "A", "a"].includes(token))
      throw new InvalidReplacementCharacterException(token);
    this.replacer = token;
  }

  public substitute(chance: CharacterGenerator): string {
    switch (this.replacer) {
      case "#":
        return chance.character({ pool: NUMBERS });
      case "A":
        return chance.character({ pool: LETTERS_UPPERCASE });
      case "a":
        return chance.character({ pool: LETTERS });
      default:
        throw new InvalidReplacementCharacterException(this.replacer);
    }
  }
}
