import { DistanceUtils4 } from "./../DistanceUtils4/DistanceUtils4";
import { NumberOfDirections } from "./../../Direction/Direction";
import { DistanceUtils8 } from "../DistanceUtils8/DistanceUtils8";
import { DistanceUtils } from "../DistanceUtils";
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
