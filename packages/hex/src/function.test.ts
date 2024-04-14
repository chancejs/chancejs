import { times } from "@chancejs/generator";
import { hex } from "./function";

describe("hex function", () => {
  it("works as expected", () => {
    times(1000, () => {
      expect(hex()).toMatch(/[0-9a-f]/);
    });
  });

  it("can take Upper and obey it", () => {
    times(1000, () => {
      expect(hex({ casing: "upper" })).toMatch(/[0-9A-F]/);
    });
  });
});
