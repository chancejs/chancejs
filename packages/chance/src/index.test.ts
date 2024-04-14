import { Chance } from ".";

/**
 * Utility function to wait a given amount of time.
 * Defaults to 5 millisecond wait time.
 * @param ms The number of milliseconds to wait.
 */
const wait = (ms: number = 5): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

describe("Chance class", () => {
  describe("random method", () => {
    it("two instances of the class instantiated at different times return different numbers", async () => {
      const chance1 = new Chance();
      // Wait 5 ms before creating chance2 else sometimes they happen on the same
      // tick and end up with the same seed!
      await wait();
      const chance2 = new Chance();
      expect(chance1.random()).not.toEqual(chance2.random());
    });

    it("returns differing results if differing seeds provided", () => {
      const chance1 = new Chance({ seed: 12345 });
      const chance2 = new Chance({ seed: 54321 });
      expect(chance1.random()).not.toEqual(chance2.random());
    });

    it("does not return repeatable results if no seed provided", async () => {
      const chance1 = new Chance();
      await wait();
      const chance2 = new Chance();
      for (let i = 0; i < 1000; i++) {
        expect(chance1.random()).not.toEqual(chance2.random());
      }
    });

    it("returns repeatable results if seed provided on the Chance object", () => {
      const seed = new Date().getTime();
      const chance1 = new Chance({ seed });
      const chance2 = new Chance({ seed });

      for (let i = 0; i < 1000; i++) {
        expect(chance1.random()).toEqual(chance2.random());
      }
    });

    it("returns repeatable results if a string is provided as a seed", () => {
      let seed = "foo";
      let chance1 = new Chance({ seed });
      let chance2 = new Chance({ seed });

      for (let i = 0; i < 1000; i++) {
        expect(chance1.random()).toEqual(chance2.random());
      }
    });

    it("returns different results if two different strings are provided", () => {
      let chance1 = new Chance({ seed: "foo" });
      let chance2 = new Chance({ seed: "baz" });

      for (let i = 0; i < 1000; i++) {
        expect(chance1.random()).not.toEqual(chance2.random());
      }
    });

    it("returns different results if two different strings are provided", () => {
      // Credit to @dan-tilley for noticing this flaw in the old seed
      let chance1 = new Chance({ seed: "abe" });
      let chance2 = new Chance({ seed: "acc" });

      for (let i = 0; i < 1000; i++) {
        expect(chance1.random()).not.toEqual(chance2.random());
      }
    });

    it("returns different results if multiple arguments are provided", () => {
      let seed = new Date().getTime();
      let chance1 = new Chance({ seed: [seed, "foo"] });
      let chance2 = new Chance({ seed: [seed, "bar"] });

      for (let i = 0; i < 1000; i++) {
        expect(chance1.random()).not.toEqual(chance2.random());
      }
    });

    it("will take an arbitrary function for the seed and use it", () => {
      let chance = new Chance({ generator: () => 123 });
      for (let i = 0; i < 1000; i++) {
        expect(chance.random()).toEqual(123);
      }
    });
  });
});
