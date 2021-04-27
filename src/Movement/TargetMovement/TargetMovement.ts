import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { VectorUtils } from "../../Utils/VectorUtils";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { Direction } from "../../Direction/Direction";
import { Bfs } from "../../Algorithms/ShortestPath/Bfs/Bfs";
import { Movement } from "../Movement";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

export class TargetMovement implements Movement {
  private character: GridCharacter;
  constructor(
    private tilemap: GridTilemap,
    private targetPos: Vector2,
    private distance = 0,
    private closestPointIfBlocked = false
  ) {}

  setCharacter(character: GridCharacter): void {
    this.character = character;
  }

  update(): void {
    const { dir, dist } = this.getDirOnShortestPath();
    if (this.noPathExists(dist)) {
      this.character.move(Direction.NONE);
    } else if (
      dist <= this.distance ||
      (this.character.isMoving() && dist <= this.distance + 1)
    ) {
      this.character.turnTowards(dir);
    } else {
      this.character.move(dir);
    }
  }

  isBlocking = (targetPos: Vector2): ((pos: Vector2) => boolean) => {
    return (pos: Vector2) => {
      if (VectorUtils.equal(pos, targetPos)) return false;
      return this.tilemap.isBlocking(pos);
    };
  };

  private noPathExists(distance: number): boolean {
    return distance == -1;
  }

  private getShortestPath(): { path: Vector2[]; distOffset: number } {
    const { path: shortestPath, closestToTarget } = Bfs.getShortestPath(
      this.character.getTilePos(),
      this.targetPos,
      this.isBlocking(this.targetPos)
    );

    const noPathFound = shortestPath.length == 0;

    if (noPathFound && this.closestPointIfBlocked) {
      const shortestPathToClosestPoint = Bfs.getShortestPath(
        this.character.getTilePos(),
        closestToTarget,
        this.isBlocking(this.targetPos)
      ).path;
      const distOffset = VectorUtils.manhattanDistance(
        closestToTarget,
        this.targetPos
      );
      return { path: shortestPathToClosestPoint, distOffset };
    }

    return { path: shortestPath, distOffset: 0 };
  }

  private getDirOnShortestPath(): { dir: Direction; dist: number } {
    const { path: shortestPath, distOffset } = this.getShortestPath();
    if (shortestPath.length == 0) return { dir: Direction.NONE, dist: -1 };
    if (shortestPath.length == 1) return { dir: Direction.NONE, dist: 0 };

    const nextField = shortestPath[1];
    const result = {
      dir: undefined,
      dist: shortestPath.length - 1 + distOffset,
    };
    if (nextField.x > this.character.getTilePos().x) {
      result.dir = Direction.RIGHT;
    } else if (nextField.x < this.character.getTilePos().x) {
      result.dir = Direction.LEFT;
    } else if (nextField.y < this.character.getTilePos().y) {
      result.dir = Direction.UP;
    } else if (nextField.y > this.character.getTilePos().y) {
      result.dir = Direction.DOWN;
    }
    return result;
  }
}
