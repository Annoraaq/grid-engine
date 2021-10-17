import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { Direction, turnCounterClockwise } from "../../Direction/Direction";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { VectorUtils } from "../../Utils/VectorUtils";
import { GridCharacter } from "../GridCharacter";

export class IsometricGridCharacter extends GridCharacter {
  protected tilePosToPixelPos(tilePosition: Vector2): Vector2 {
    return this.getTileDistance(Direction.UP_LEFT).multiply(
      new Vector2(
        tilePosition.x - tilePosition.y,
        tilePosition.x + tilePosition.y
      )
    );
  }

  protected getTileDistance(direction: Direction): Vector2 {
    switch (direction) {
      case Direction.DOWN_LEFT:
      case Direction.DOWN_RIGHT:
      case Direction.UP_LEFT:
      case Direction.UP_RIGHT:
        return VectorUtils.scalarMult(this.tilemap.getTileSize(), 0.5);
      default:
        return super.getTileDistance(direction);
    }
  }

  protected toMapDirection(direction: Direction): Direction {
    return turnCounterClockwise(direction);
  }

  protected mapDepth(nextTilePos: LayerPosition): number {
    return nextTilePos.position.x + nextTilePos.position.y;
  }
}
