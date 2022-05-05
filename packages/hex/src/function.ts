import { HexGenerator } from "./generator";
import { HexGeneratorFunction, HexOptions } from "./interfaces";

export const hex: HexGeneratorFunction = (
  options?: HexOptions,
  seed?: number
): string => {
  const hexGenerator = new HexGenerator({ seed });
  return hexGenerator.hex(options);
};
