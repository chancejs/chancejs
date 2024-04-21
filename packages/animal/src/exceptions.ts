import { AnimalTypes } from "./interfaces";

export class AnimalOptionTypeException extends TypeError {
  constructor() {
    super(`"Please pick from desert, ocean, grassland, forest, zoo, pets, farm."`);
  }
}
