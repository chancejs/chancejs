export class BooleanLiklihoodRangeException extends RangeError {
  constructor() {
    super("Chance: Likelihood accepts values from 0 to 100.");
  }
}
