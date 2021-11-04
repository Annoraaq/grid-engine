import { VectorUtils } from "../VectorUtils";
import { Direction } from "../../Direction/Direction";
import { Vector2 } from "../Vector2/Vector2";
import { DistanceUtils } from "../DistanceUtils";

export class DistanceUtils8 implements DistanceUtils {
  distance(pos1: Vector2, pos2: Vector2): number {
    return VectorUtils.chebyshevDistance(pos1, pos2);
  }

  neighbours(pos: Vector2): Vector2[] {
    const orthogonalNeighbours = [
      new Vector2(pos.x, pos.y + 1),
      new Vector2(pos.x + 1, pos.y),
      new Vector2(pos.x - 1, pos.y),
      new Vector2(pos.x, pos.y - 1),
    ];
    const diagonalNeighbours = [
      new Vector2(pos.x + 1, pos.y + 1),
      new Vector2(pos.x + 1, pos.y - 1),
      new Vector2(pos.x - 1, pos.y + 1),
      new Vector2(pos.x - 1, pos.y - 1),
    ];

    return [...orthogonalNeighbours, ...diagonalNeighbours];
  }

  direction(from: Vector2, to: Vector2): Direction {
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

  getDirections(): Direction[] {
    return [
      Direction.UP,
      Direction.RIGHT,
      Direction.DOWN,
      Direction.LEFT,
      Direction.DOWN_LEFT,
      Direction.DOWN_RIGHT,
      Direction.UP_RIGHT,
      Direction.UP_LEFT,
    ];
  }
}
