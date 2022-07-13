import { TokenCharacterException } from "./errors";
import { IToken } from "./interface";

export class CopyToken implements IToken {
  private character: string;
  constructor(char: string) {
    if (!char || char.length !== 1) throw new TokenCharacterException();
    this.character = char;
  }

  public substitute(): string {
    return this.character;
  }
}
