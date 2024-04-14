import { Generator } from "./generator";
import { IRandomNumberGenerator } from "./interfaces";

export class RandomNumberGenerator
  extends Generator
  implements IRandomNumberGenerator
{
  random(): number {
    return this.generator();
  }
}
