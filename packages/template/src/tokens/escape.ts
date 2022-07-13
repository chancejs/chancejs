import {
  InvalidEscapeSequenceException,
  TokenCharacterException,
} from "./errors";
import { IToken } from "./interface";

export class EscapeToken implements IToken {
  private character: string;
  constructor(char: string) {
    if (!char || char.length !== 1) throw new TokenCharacterException();
    if (!/[{}\\]/.test(char)) {
      throw new InvalidEscapeSequenceException(char);
    }
    this.character = char;
  }

  substitute(): string {
    return this.character;
  }
}
