export class InvalidNumberException extends Error {
  constructor(message?: string) {
    super(message || "Chance: Invalid number.");
  }
}
