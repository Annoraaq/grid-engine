import { ShortestPathAlgorithm } from "./../../Algorithms/ShortestPath/ShortestPathAlgorithm";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { VectorUtils } from "../../Utils/VectorUtils";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import * as Phaser from "phaser";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { Bfs } from "../../Algorithms/ShortestPath/Bfs/Bfs";
import { Movement } from "../Movement";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

export class TargetMovement implements Movement {
  private character: GridCharacter;
  private numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR;
  private shortestPath: Vector2[];
  private distOffset: number;

  constructor(
    private tilemap: GridTilemap,
    private targetPos: Vector2,
    private distance = 0,
    private closestPointIfBlocked = false
  ) {}

  setNumberOfDirections(numberOfDirections: NumberOfDirections): void {
    this.numberOfDirections = numberOfDirections;
  }

  setCharacter(character: GridCharacter): void {
    this.character = character;
  }

  private getTileInDir(dir: Direction): Vector2 {
    switch (dir) {
      case Direction.UP:
        return this.character.getTilePos().clone().add(new Vector2(0, -1));
      case Direction.UP_RIGHT:
        return this.character.getTilePos().clone().add(new Vector2(1, -1));
      case Direction.RIGHT:
        return this.character.getTilePos().clone().add(new Vector2(1, 0));
      case Direction.DOWN_RIGHT:
        return this.character.getTilePos().clone().add(new Vector2(1, 1));
      case Direction.DOWN:
        return this.character.getTilePos().clone().add(new Vector2(0, 1));
      case Direction.DOWN_LEFT:
        return this.character.getTilePos().clone().add(new Vector2(-1, 1));
      case Direction.LEFT:
        return this.character.getTilePos().clone().add(new Vector2(-1, 0));
      case Direction.UP_LEFT:
        return this.character.getTilePos().clone().add(new Vector2(-1, -1));
    }
  }

  update(): void {
    if (!this.shortestPath) {
      ({
        path: this.shortestPath,
        distOffset: this.distOffset,
      } = this.getShortestPath());
    }

    // no path found
    if (this.shortestPath.length == 0) {
      this.character.move(Direction.NONE);
      return;
    }

    // shorten path
    const nextField = this.shortestPath[0];
    if (
      this.character.getTilePos().x === nextField.x &&
      this.character.getTilePos().y === nextField.y
    ) {
      this.shortestPath.shift();
    }
    let { dir, dist } = this.getDirOnShortestPath();

    const tileInDir = this.getTileInDir(dir);
    if (dir !== Direction.NONE && this.isBlocking(tileInDir)) {
      ({
        path: this.shortestPath,
        distOffset: this.distOffset,
      } = this.getShortestPath());

      // no path found
      if (this.shortestPath.length == 0) {
        this.character.move(Direction.NONE);
        return;
      }

      // shorten path
      const nextField = this.shortestPath[0];
      if (
        this.character.getTilePos().x === nextField.x &&
        this.character.getTilePos().y === nextField.y
      ) {
        this.shortestPath.shift();
      }

      ({ dir, dist } = this.getDirOnShortestPath());
    }

    if (
      dist <= this.distance ||
      (this.character.isMoving() && dist <= this.distance + 1)
    ) {
      this.character.turnTowards(dir);
    } else {
      this.character.move(dir);
    }
  }

  getNeighbours = (pos: Vector2): Vector2[] => {
    const neighbours = this._getNeighbours(pos);
    return neighbours.filter((pos) => !this.isBlocking(pos));
  };

  private isBlocking = (pos: Vector2): boolean => {
    if (VectorUtils.equal(pos, this.targetPos)) return false;
    return this.tilemap.isBlocking(pos);
  };

  private _getNeighbours = (pos: Vector2): Vector2[] => {
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

    if (this.numberOfDirections === NumberOfDirections.EIGHT) {
      return [...orthogonalNeighbours, ...diagonalNeighbours];
    }
    return orthogonalNeighbours;
  };

  private noPathExists(distance: number): boolean {
    return distance == -1;
  }

  private getShortestPath(): { path: Vector2[]; distOffset: number } {
    const shortestPathAlgo: ShortestPathAlgorithm = new Bfs();
    const {
      path: shortestPath,
      closestToTarget,
    } = shortestPathAlgo.getShortestPath(
      this.character.getTilePos(),
      this.targetPos,
      this.getNeighbours
    );

    const noPathFound = shortestPath.length == 0;

    if (noPathFound && this.closestPointIfBlocked) {
      const shortestPathToClosestPoint = shortestPathAlgo.getShortestPath(
        this.character.getTilePos(),
        closestToTarget,
        this.getNeighbours
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
    if (this.shortestPath.length == 0) return { dir: Direction.NONE, dist: 0 };

    const nextField = this.shortestPath[0];
    const result = {
      dir: undefined,
      dist: this.shortestPath.length + this.distOffset,
    };

    const charPos = this.character.getTilePos();

    if (nextField.x > charPos.x) {
      if (nextField.y > charPos.y) {
        result.dir = Direction.DOWN_RIGHT;
      } else if (nextField.y < charPos.y) {
        result.dir = Direction.UP_RIGHT;
      } else {
        result.dir = Direction.RIGHT;
      }
    } else if (nextField.x < charPos.x) {
      if (nextField.y > charPos.y) {
        result.dir = Direction.DOWN_LEFT;
      } else if (nextField.y < charPos.y) {
        result.dir = Direction.UP_LEFT;
      } else {
        result.dir = Direction.LEFT;
      }
    } else if (nextField.y < charPos.y) {
      result.dir = Direction.UP;
    } else if (nextField.y > charPos.y) {
      result.dir = Direction.DOWN;
    }

    return result;
  }
}
