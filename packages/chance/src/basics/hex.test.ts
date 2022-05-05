import { times } from "@chancejs/generator";
import Chance from "..";

describe("hex method", () => {
  let chance: Chance;
  beforeEach(() => {
    chance = new Chance();
  });

  it("works as expected", () => {
    for (let i = 0; i < 1000; i++) {
      expect(chance.hex()).toMatch(/[0-9a-f]/);
    }
  });

  it("can take Upper and obey it", () => {
    times(1000, () => {
      expect(chance.hex({ casing: "upper" })).toMatch(/[0-9A-F]/);
    });
  });
});
