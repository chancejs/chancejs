import { Generator } from "@chancejs/generator";
import { AnimalOptionTypeException } from "./exceptions";
import { AnimalOptions,  AnimalTypes,  IAnimalGenerator } from "./interfaces";
import { animals } from "./constants";

export class AnimalGenerator extends Generator implements IAnimalGenerator {
  animal(options?: AnimalOptions): string {

    if (options?.type && !Object.values(AnimalTypes).includes(options?.type))
      throw new AnimalOptionTypeException();
    
    const type =  options?.type ?? Object.keys(animals)[this.generator()*Object.keys(animals).length - 1 << 0] as AnimalTypes
    return animals[type][this.generator()*animals[type].length << 0] 
  }
}
