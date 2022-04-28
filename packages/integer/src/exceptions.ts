export class IntegerRangeException extends RangeError {
  constructor(message?: string) {
    super(message || "Chance: Invalid range supplied to integer function.");
  }
}
