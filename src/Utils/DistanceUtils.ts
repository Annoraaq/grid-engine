import { VectorUtils } from "./VectorUtils";
import { NumberOfDirections } from "./../Direction/Direction";
import * as Phaser from "phaser";
type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

export class DistanceUtils {
  static distance(
    pos1: Vector2,
    pos2: Vector2,
    numberOfDirections: NumberOfDirections
  ): number {
    if (numberOfDirections === NumberOfDirections.EIGHT) {
      return VectorUtils.chebyshevDistance(pos1, pos2);
    }
    return VectorUtils.manhattanDistance(pos1, pos2);
  }
}
