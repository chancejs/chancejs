import { FalsyGenerator } from "./generator";
import { FalsyGeneratorFunction, FalsyOptions, Falsy } from "./interfaces";

export const falsy: FalsyGeneratorFunction = (
  options?: FalsyOptions,
  seed?: number
): Falsy => {
  const falsyGenerator = new FalsyGenerator({ seed });
  return falsyGenerator.falsy(options);
};
