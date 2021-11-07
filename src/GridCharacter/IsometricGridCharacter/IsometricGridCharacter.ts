import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { Direction, turnCounterClockwise } from "../../Direction/Direction";
import { GridCharacter } from "../GridCharacter";

export class IsometricGridCharacter extends GridCharacter {
  protected toMapDirection(direction: Direction): Direction {
    return turnCounterClockwise(direction);
  }

  protected mapDepth(nextTilePos: LayerPosition): number {
    return nextTilePos.position.x + nextTilePos.position.y;
  }
}
