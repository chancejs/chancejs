import { Generator, GeneratorOptions, times } from "@chancejs/generator";
import { NaturalGenerator } from "@chancejs/natural";
import { IPicker } from "./interfaces";

export class Picker extends Generator implements IPicker {
  private naturalGenerator: NaturalGenerator;
  constructor(options: GeneratorOptions) {
    super(options);
    this.naturalGenerator = new NaturalGenerator(options);
  }

  public pickOne<T>(array: T[]): T {
    if (array.length === 0) {
      throw new RangeError("Chance: Cannot pickOne() from an empty array");
    }
    return array[this.naturalGenerator.natural({ max: array.length - 1 })];
  }

  public pickSet<T>(array: T[], count: number): T[] {
    if (count === 0) {
      return [];
    }
    if (array.length === 0) {
      throw new RangeError("Chance: Cannot pickSet() from an empty array");
    }
    if (count < 0) {
      throw new RangeError("Chance: Count must be a positive number");
    }
    if (!count || count === 1) {
      return [this.pickOne(array)];
    } else {
      let arr = array.slice(0);
      let end = arr.length;

      return times(Math.min(end, count), () => {
        const index = this.naturalGenerator.natural({ max: --end });
        const value = arr[index];
        arr[index] = arr[end];
        return value;
      });
    }
  }
}
