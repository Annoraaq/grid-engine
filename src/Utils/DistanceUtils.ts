import { VectorUtils } from "./VectorUtils";
import { Direction, NumberOfDirections } from "./../Direction/Direction";
import { Vector2 } from "./Vector2/Vector2";

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

  static direction4(from: Vector2, to: Vector2): Direction {
    if (VectorUtils.equal(from, to)) return Direction.NONE;

    const diff = from.clone().subtract(to);

    if (Math.abs(diff.x) > Math.abs(diff.y)) {
      if (diff.x > 0) {
        return Direction.LEFT;
      } else {
        return Direction.RIGHT;
      }
    } else {
      if (diff.y > 0) {
        return Direction.UP;
      } else {
        return Direction.DOWN;
      }
    }
  }

  static direction8(from: Vector2, to: Vector2): Direction {
    if (to.x > from.x) {
      if (to.y > from.y) {
        return Direction.DOWN_RIGHT;
      } else if (to.y < from.y) {
        return Direction.UP_RIGHT;
      } else {
        return Direction.RIGHT;
      }
    } else if (to.x < from.x) {
      if (to.y > from.y) {
        return Direction.DOWN_LEFT;
      } else if (to.y < from.y) {
        return Direction.UP_LEFT;
      } else {
        return Direction.LEFT;
      }
    } else if (to.y < from.y) {
      return Direction.UP;
    } else if (to.y > from.y) {
      return Direction.DOWN;
    }
    return Direction.NONE;
  }
}
