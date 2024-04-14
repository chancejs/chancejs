import { Picker } from "./generator";
import { IPickOne } from "./interfaces";

export const pickOne: IPickOne = <T>(array: T[], seed?: number): T => {
  const picker = new Picker({ seed });
  return picker.pickOne(array);
};
