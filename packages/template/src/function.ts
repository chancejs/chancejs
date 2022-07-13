import { TemplateGenerator } from "./generator";
import { TemplateGeneratorFunction } from "./interfaces";

export const template: TemplateGeneratorFunction = (
  template: string,
  seed?: number
): string => {
  const templateGenerator = new TemplateGenerator({ seed });
  return templateGenerator.template(template);
};
