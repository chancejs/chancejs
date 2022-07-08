import { StringGenerator } from "./generator";
import { StringGeneratorFunction, StringOptions } from "./interfaces";

export const string: StringGeneratorFunction = (
  options?: StringOptions,
  seed?: number
): string => {
  const stringGenerator = new StringGenerator({ seed });
  return stringGenerator.string(options);
};
