import { bool } from "./bool";

describe("bool", () => {
  it("returns a random boolean", () => {
    const boolean = bool();
    expect(typeof boolean).toEqual("boolean");
  });

  it("is within the bounds of what we would call random", () => {
    let trueCount = 0;
    for (let i = 0; i < 1000; i++) {
      if (bool()) {
        trueCount++;
      }
    }

    // The probability of this test failing is approximately 4.09e-86.
    // So, in theory, it could give a false negative, but the sun will
    // probably die long before that happens.

    expect(trueCount).toBeGreaterThan(200);
    expect(trueCount).toBeLessThan(800);
  });

  it("takes and obeys likelihood", () => {
    let trueCount30 = 0;
    for (let n = 0; n < 1000; n++) {
      if (bool({ likelihood: 30 })) {
        trueCount30++;
      }
    }

    // Expect true count 30% likelihood to average around 300 for n = 1000
    expect(trueCount30).toBeGreaterThan(200);
    expect(trueCount30).toBeLessThan(400);

    let trueCount99 = 0;
    for (let n = 0; n < 1000; n++) {
      if (bool({ likelihood: 99 })) {
        trueCount99++;
      }
    }

    // Expect true count 99% likelihood to average around 990 for n = 1000
    expect(trueCount99).toBeGreaterThan(900);
  });

  it("throws an error if likelihood < 0", () => {
    expect(() => bool({ likelihood: -23 })).toThrow(RangeError);
  });

  it("throws an error if likelihood > 100", () => {
    expect(() => bool({ likelihood: 7933 })).toThrow(RangeError);
  });
});
