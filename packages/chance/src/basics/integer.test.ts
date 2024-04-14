import Chance from "..";

describe("integer method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("returns a random integer", () => {
    expect(typeof chance.integer()).toBe("number");
  });

  it("is sometimes negative, sometimes positive", () => {
    let positiveCount = 0;
    for (let i = 0; i < 1000; i++) {
      if (chance.integer() > 0) {
        positiveCount++;
      }
    }

    // Note: In very extreme circumstances this test may fail as, by its
    // nature it's random. But it's a low enough percentage that I'm
    // willing to accept it.
    expect(positiveCount).toBeGreaterThan(200);
    expect(positiveCount).toBeLessThan(800);
  });

  it("can take a zero min and obey it", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.integer({ min: 0 })).toBeGreaterThan(-1);
    }
  });

  it("can take a negative min and obey it", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.integer({ min: -25 })).toBeGreaterThan(-26);
    }
  });

  it("can take a negative min and max and obey both", () => {
    for (let i = 0; i < 1000; i++) {
      const n = chance.integer({ min: -25, max: -2 });
      expect(n).toBeGreaterThan(-26);
      expect(n).toBeLessThan(-1);
    }
  });

  it("can take a min with absolute value less than max and return in range above", () => {
    let count = 0;
    for (let i = 0; i < 1000; i++) {
      const n = chance.integer({ min: -1, max: 1_000_000 });
      if (Math.abs(n) < 2) count++;
    }
    expect(count).toBeLessThan(900);
  });

  it("throws an error when min > max", () => {
    expect(() => chance.integer({ min: 1000, max: 500 })).toThrow(RangeError);
  });
});
