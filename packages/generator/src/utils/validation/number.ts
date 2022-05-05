import { isWithin, Range, validateRange } from "..";
import { InvalidNumberException } from "./exceptions";

interface NumberValidationOptions {
  /**
   * Whether or not the number should be an integer.
   */
  isInteger?: boolean;
  /**
   * @description
   */
  range?: Partial<Range>;
}

export const validateNumber = (
  number: number,
  options?: NumberValidationOptions
): number => {
  const isInteger = options?.isInteger;
  const range = options?.range;
  if (isInteger) {
    if (!Number.isInteger(number))
      throw new InvalidNumberException(`Chance: ${number} is not an integer.`);
  }
  if (range) {
    const validatedRange = validateRange(range);
    if (!isWithin(number, validatedRange))
      throw new InvalidNumberException(
        `Chance: ${number} is not between ${validatedRange.min} and ${validatedRange.max}.`
      );
  }
  return number;
};
