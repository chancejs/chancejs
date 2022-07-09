import {
  Generator,
  GeneratorOptions,
  validateRange,
} from "@chancejs/generator";
import { PrimeOptions, IPrimeGenerator } from "./interfaces";
import { primes } from "./data";
import { Picker } from "@chancejs/pick";

export class PrimeGenerator extends Generator implements IPrimeGenerator {
  private picker: Picker;
  constructor(options: GeneratorOptions) {
    super(options);
    this.picker = new Picker(options);
  }

  public prime(options?: PrimeOptions): number {
    const { min, max } = validateRange(
      { min: 0, max: 10000, ...options },
      { min: 0 }
    );
    const lastPrime = primes[primes.length - 1];
    if (max > lastPrime) {
      for (let i = lastPrime + 2; i <= max; ++i) {
        if (this.isPrime(i)) {
          primes.push(i);
        }
      }
    }
    const targetPrimes = primes.filter((p: number) => {
      return p >= min && p <= max;
    });
    return this.picker.pickOne(targetPrimes);
  }

  private isPrime(n: number): boolean {
    if (n % 1 || n < 2) {
      return false;
    }
    if (n % 2 === 0) {
      return n === 2;
    }
    if (n % 3 === 0) {
      return n === 3;
    }
    var m = Math.sqrt(n);
    for (var i = 5; i <= m; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) {
        return false;
      }
    }
    return true;
  }
}
