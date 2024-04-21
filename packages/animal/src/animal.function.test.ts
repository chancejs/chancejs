import { animal } from "./animal.function";
import { AnimalOptionTypeException } from "./exceptions";
import { AnimalTypes } from "./interfaces";
import { animals } from "./constants";

describe("animal", () => {
  it("returns a random animal", () => {
    const randomAnimal = animal();
    expect(typeof randomAnimal).toEqual("string");
  });

  it("takes and obeys type", () => {
    const zooAnimal = animal({type:AnimalTypes.ZOO})
    // check that the animal returned is returned from the correct subType
    expect(animals.zoo.includes(zooAnimal)).toBeTruthy();
  });

  it("throws an error if type is not correct enum", () => {
    expect(() => animal({ type: "NotAnAnimalType" as AnimalTypes })).toThrow(
      AnimalOptionTypeException
    );
  });
});
