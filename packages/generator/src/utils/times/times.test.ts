import { times } from "./times";

describe("times function", () => {
  it("runs the given function the given number of times", () => {
    const mockFn = jest.fn();
    times(99, mockFn);
    expect(mockFn).toHaveBeenCalledTimes(99);
  });

  it("gives an array of n terms for the given function", () => {
    const arr = times(25, () => "test");
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(25);
    arr.map((s) => {
      expect(s).toBe("test");
    });
  });

  it("gives an empty array when n is set to 0", () => {
    const arr = times(0, () => "123");
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBe(0);
  });
});
