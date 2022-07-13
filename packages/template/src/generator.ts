import { CharacterGenerator } from "@chancejs/character";
import { Generator, GeneratorOptions } from "@chancejs/generator";
import { ITemplateGenerator } from "./interfaces";
import { CopyToken, EscapeToken, ReplaceToken } from "./tokens";
import { IToken } from "./tokens/interface";

const ParseModes = ["identity", "escape", "replace"] as const;
type ParseMode = typeof ParseModes[number];

export class TemplateGenerator extends Generator implements ITemplateGenerator {
  private characterGenerator: CharacterGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.characterGenerator = new CharacterGenerator(options);
  }

  public template(template: string): string {
    if (!template) {
      throw new Error("Template string is required");
    }
    return this.parseTemplate(template)
      .map((token) => token.substitute(this.characterGenerator))
      .join("");
  }

  private parseTemplate(template: string): IToken[] {
    let tokens: IToken[] = [];
    let mode: ParseMode = "identity";
    for (let i = 0; i < template.length; i++) {
      const c = template[i];
      switch (mode) {
        case "escape":
          tokens.push(new EscapeToken(c));
          mode = "identity";
          break;
        case "identity":
          if (c === "{") {
            mode = "replace";
          } else if (c === "\\") {
            mode = "escape";
          } else {
            tokens.push(new CopyToken(c));
          }
          break;
        case "replace":
          if (c === "}") {
            mode = "identity";
          } else {
            tokens.push(new ReplaceToken(c));
          }
          break;
      }
    }
    return tokens;
  }
}
