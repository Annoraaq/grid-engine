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

  update(): void {
    const { dir, dist } = this.getDirOnShortestPath();
    if (this.noPathExists(dist)) {
      this.character.move(Direction.NONE);
    } else if (dist <= this.distance) {
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
    const { path: shortestPath, distOffset } = this.getShortestPath();
    if (shortestPath.length == 0) return { dir: Direction.NONE, dist: -1 };
    if (shortestPath.length == 1) return { dir: Direction.NONE, dist: 0 };

    const nextField = shortestPath[1];
    const result = {
      dir: undefined,
      dist: shortestPath.length - 1 + distOffset,
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
