import { VectorUtils } from "../VectorUtils";
import { Direction } from "../../Direction/Direction";
import { Vector2 } from "../Vector2/Vector2";
import { DistanceUtils } from "../DistanceUtils";

export class DistanceUtils4 implements DistanceUtils {
  distance(pos1: Vector2, pos2: Vector2): number {
    return VectorUtils.manhattanDistance(pos1, pos2);
  }

  direction(from: Vector2, to: Vector2): Direction {
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

  neighbours(pos: Vector2): Vector2[] {
    return [
      new Vector2(pos.x, pos.y + 1),
      new Vector2(pos.x + 1, pos.y),
      new Vector2(pos.x - 1, pos.y),
      new Vector2(pos.x, pos.y - 1),
    ];
  }

  getDirections(): Direction[] {
    return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
  }
}
