export class FloatingOptionsException extends Error {
  constructor(message?: string) {
    super(
      message || "Chance: Invalid options provided to the floating generator."
    );
  }
}
