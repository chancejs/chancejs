/**
 * Utility function to wait a given amount of time.
 * Defaults to 5 millisecond wait time.
 * @param ms The number of milliseconds to wait.
 */
export const wait = (ms: number = 5): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};
