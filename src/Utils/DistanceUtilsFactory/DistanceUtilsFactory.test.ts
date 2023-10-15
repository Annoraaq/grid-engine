import { NumberOfDirections } from "../../Direction/Direction.js";
import { DistanceUtils4 } from "../DistanceUtils4/DistanceUtils4.js";
import { DistanceUtils8 } from "../DistanceUtils8/DistanceUtils8.js";
import { DistanceUtilsFactory } from "./DistanceUtilsFactory.js";
describe("DistanceUtilsFactory", () => {
  it("should create 4 dir utils", () => {
    expect(DistanceUtilsFactory.create(NumberOfDirections.FOUR)).toBeInstanceOf(
      DistanceUtils4,
    );
  });
  it("should create 8 dir utils", () => {
    expect(
      DistanceUtilsFactory.create(NumberOfDirections.EIGHT),
    ).toBeInstanceOf(DistanceUtils8);
  });
});
