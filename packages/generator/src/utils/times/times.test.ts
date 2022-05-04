import { times } from "./times";

describe("times function", () => {
  it("runs the given function the given number of times", () => {
    const mockFn = jest.fn();
    times(99, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(99);
  });
});
