import { CoinGenerator } from "./generator";
import { CoinFlip, CoinGeneratorFunction, CoinOptions } from "./interfaces";

export const coin: CoinGeneratorFunction = (
  options?: CoinOptions,
  seed?: number
): CoinFlip => {
  const coinGenerator = new CoinGenerator({ seed });
  return coinGenerator.coin(options);
};
