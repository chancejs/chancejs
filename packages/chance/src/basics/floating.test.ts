import { FloatingOptionsException } from "@chancejs/floating";
import Chance from "../../src/index";

describe("floating method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("returns a random floating", () => {
    expect(typeof chance.floating()).toBe("number");
  });

  it("can take both a max and min and obey them both", () => {
    for (let i = 0; i < 1000; i++) {
      let n = chance.floating({ min: 90, max: 100 });
      expect(n).toBeGreaterThan(89);
      expect(n).toBeLessThan(101);
    }
  });

  it("will not take fixed + min that would be out of range", () => {
    expect(() =>
      chance.floating({ fixed: 13, min: -9007199254740992 })
    ).toThrow(
      "Chance: Min specified is out of range with fixed. Min should be, at least, -900.7199254740991."
    );
  });

  it("will not take fixed + max that would be out of range", () => {
    expect(() => chance.floating({ fixed: 13, max: 9007199254740992 })).toThrow(
      "Chance: Max specified is out of range with fixed. Max should be, at most, 900.7199254740991."
    );
  });

  it("obeys the fixed parameter, when present", () => {
    for (let i = 0; i < 1000; i++) {
      let n = chance.floating({ fixed: 4 });
      let decimals = n.toString().split(".")[1] || "";
      expect(decimals.length).toBeLessThan(5);
    }
  });

  it("can take fixed and obey it", () => {
    for (let i = 0; i < 1000; i++) {
      let n = chance.floating({ fixed: 3 });
      let parsed = parseFloat(n.toFixed(3));
      expect(n).toBe(parsed);
    }
  });

  it("will not take both fixed and precision", () => {
    expect(() => chance.floating({ fixed: 2, precision: 8 })).toThrow(
      FloatingOptionsException
    );
  });
});
