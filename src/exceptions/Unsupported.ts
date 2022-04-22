/**
 * An exception thrown when a requested feature is not supported.
 */
export class UnsupportedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsupportedError";
    this.message = message || "This feature is not supported on this platform";
  }
}
