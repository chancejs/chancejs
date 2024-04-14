import { PrimeGenerator } from "./generator";
import { PrimeGeneratorFunction, PrimeOptions } from "./interfaces";

export const prime: PrimeGeneratorFunction = (
  options?: PrimeOptions,
  seed?: number
): number => {
  const primeGenerator = new PrimeGenerator({ seed });
  return primeGenerator.prime(options);
};
