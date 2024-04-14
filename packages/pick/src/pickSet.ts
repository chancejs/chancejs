import { Picker } from "./generator";
import { IPickSet } from "./interfaces";

export const pickSet: IPickSet = <T>(
  array: T[],
  count: number,
  seed?: number
): T[] => {
  const picker = new Picker({ seed });
  return picker.pickSet(array, count);
};
