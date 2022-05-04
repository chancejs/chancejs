import { validateNumber } from "..";

/**
 * Utility function to wait a given amount of time.
 * Defaults to 5 millisecond wait time.
 * @param {number} ms The number of milliseconds to wait.
 * @example
 * // waits 2 seconds
 * // wait(2000)
 */
export const wait = (ms: number = 5): Promise<void> => {
  validateNumber(ms);
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};
