import { MersenneTwister } from "./";

describe("random method", () => {
  let mt: MersenneTwister;

  beforeEach(() => {
    mt = new MersenneTwister();
  });

  it("generates a number between 0 and 1", () => {
    const n = mt.random();

    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThan(1);
  });

  it("averages to 0.5 over time", () => {
    const k = 1000;
    let results: number[] = [];
    for (let i = 0; i < 1000; i++) {
      results[i] = mt.random();
    }
    const average = results.reduce((acc, curr) => acc + curr, 0) / k;
    expect(average).toBeGreaterThan(0.4);
    expect(average).toBeLessThan(0.6);
  });
});
