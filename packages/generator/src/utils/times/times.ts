import { validateNumber } from "..";

/**
 * Call a function repeatedly a set number of times.
 * @param {number} n The number of times to run the function.
 * @param fn The function to call repeatedly.
 * @example
 * // prints "foo" three times to the console
 * // times(3, console.log("foo"))
 */
export const times = <T>(n: number, fn: () => T): T[] => {
  validateNumber(n);
  let results: T[] = [];
  for (let i = 0; i < n; i++) {
    results[i] = fn();
  }
  return results;
};
