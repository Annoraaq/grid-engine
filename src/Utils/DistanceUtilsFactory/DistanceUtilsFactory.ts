import { DistanceUtils4 } from "./../DistanceUtils4/DistanceUtils4.js";
import { NumberOfDirections } from "./../../Direction/Direction.js";
import { DistanceUtils8 } from "../DistanceUtils8/DistanceUtils8.js";
import { DistanceUtils } from "../DistanceUtils.js";
export class DistanceUtilsFactory {
  static create(numberOfDirections: NumberOfDirections): DistanceUtils {
    switch (numberOfDirections) {
      case NumberOfDirections.FOUR:
        return new DistanceUtils4();
      case NumberOfDirections.EIGHT:
        return new DistanceUtils8();
    }
  }
}
