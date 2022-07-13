import { CharacterGenerator } from "@chancejs/character";

export interface IToken {
  substitute(generator: CharacterGenerator): string;
}
