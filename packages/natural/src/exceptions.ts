export class NaturalRangeException extends RangeError {
  constructor(message?: string) {
    super(message || "Chance: Invalid range supplied to natural function.");
  }
}

export class NaturalNumeralsRangeException extends RangeError {
  constructor(message?: string) {
    super(message || "Chance: Invalid numerals supplied to natural function.");
  }
}

export class NaturalExcludeException extends Error {
  constructor(message?: string) {
    super(message || "Chance: Invalid exclude supplied to natural function.");
  }
}
