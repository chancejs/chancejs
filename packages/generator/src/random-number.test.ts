import { wait, times } from "./utils";
import { RandomNumberGenerator } from "./random-number.generator";

describe("RandomNumberGenerator", () => {
  it("two instances of the class instantiated at different times return different numbers", async () => {
    const prng1 = new RandomNumberGenerator();
    // Wait 5 ms before creating prng2 else sometimes they happen on the same
    // tick and end up with the same seed!
    await wait();
    const prng2 = new RandomNumberGenerator();
    expect(prng1.random()).not.toEqual(prng2.random());
  });

  it("returns differing results if differing seeds provided", () => {
    const prng1 = new RandomNumberGenerator({ seed: 12345 });
    const prng2 = new RandomNumberGenerator({ seed: 54321 });
    expect(prng1.random()).not.toEqual(prng2.random());
  });

  it("does not return repeatable results if no seed provided", async () => {
    const prng1 = new RandomNumberGenerator();
    await wait();
    const prng2 = new RandomNumberGenerator();
    times(1000, () => {
      expect(prng1.random()).not.toEqual(prng2.random());
    });
  });

  it("returns repeatable results if seed provided", () => {
    const seed = new Date().getTime();
    const prng1 = new RandomNumberGenerator({ seed });
    const prng2 = new RandomNumberGenerator({ seed });
    times(1000, () => {
      expect(prng1.random()).toEqual(prng2.random());
    });
  });

  it("will take an arbitrary function for the seed and use it", () => {
    let prng = new RandomNumberGenerator({ generator: () => 123 });
    times(1000, () => {
      expect(prng.random()).toEqual(123);
    });
  });
});
