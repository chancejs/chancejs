export class FloatingOptionsException extends RangeError {
  constructor(message?: string) {
    super(
      message || "Chance: Invalid options provided to the floating generator."
    );
  }
}

export class FloatingInvalidMinException extends RangeError {
  constructor(lowerBound: number) {
    super(
      `Chance: Min specified is out of range with fixed. Min should be, at least, ${lowerBound}.`
    );
  }
}

export class FloatingInvalidMaxException extends RangeError {
  constructor(upperBound: number) {
    super(
      `Chance: Max specified is out of range with fixed. Max should be, at most, ${upperBound}.`
    );
  }
}
