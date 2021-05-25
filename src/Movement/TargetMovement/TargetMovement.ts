import { NoPathFoundStrategy } from "./../../Algorithms/ShortestPath/NoPathFoundStrategy";
import { PathBlockedStrategy } from "./../../Algorithms/ShortestPath/PathBlockedStrategy";
import { DistanceUtils } from "./../../Utils/DistanceUtils";
import { ShortestPathAlgorithm } from "./../../Algorithms/ShortestPath/ShortestPathAlgorithm";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { VectorUtils } from "../../Utils/VectorUtils";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { Bfs } from "../../Algorithms/ShortestPath/Bfs/Bfs";
import { Movement } from "../Movement";
import { Vector2 } from "../../Utils/Vector2/Vector2";

export interface MoveToConfig {
  noPathFoundStrategy?: NoPathFoundStrategy;
  pathBlockedStrategy?: PathBlockedStrategy;
  noPathFoundRetryBackoffMs?: number;
  noPathFoundMaxRetries?: number;
}

export class TargetMovement implements Movement {
  private character: GridCharacter;
  private numberOfDirections: NumberOfDirections = NumberOfDirections.FOUR;
  private shortestPath: Vector2[];
  private distOffset: number;
  private posOnPath = 0;
  private noPathFoundStrategy: NoPathFoundStrategy;
  private pathBlockedStrategy: PathBlockedStrategy;
  private noPathFoundRetryBackoffMs: number;
  private noPathFoundMaxRetries: number;
  private noPathFoundRetries = 0;
  private noPathFoundRetryElapsed: number;
  private stopped = false;

  constructor(
    private tilemap: GridTilemap,
    private targetPos: Vector2,
    private distance = 0,
    config?: MoveToConfig
  ) {
    this.noPathFoundStrategy =
      config?.noPathFoundStrategy || NoPathFoundStrategy.STOP;
    this.pathBlockedStrategy =
      config?.pathBlockedStrategy || PathBlockedStrategy.WAIT;
    this.noPathFoundRetryBackoffMs = config?.noPathFoundRetryBackoffMs || 200;
    this.noPathFoundMaxRetries = config?.noPathFoundMaxRetries || -1;
  }

  setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void {
    this.pathBlockedStrategy = pathBlockedStrategy;
  }

  getPathBlockedStrategy(): PathBlockedStrategy {
    return this.pathBlockedStrategy;
  }

  setNumberOfDirections(numberOfDirections: NumberOfDirections): void {
    this.numberOfDirections = numberOfDirections;
  }

  setCharacter(character: GridCharacter): void {
    this.character = character;
    this.noPathFoundRetryElapsed = 0;
    this.calcShortestPath();
  }

  update(delta: number): void {
    if (this.stopped) return;
    if (this.noPathFound() && !this.shouldRetryCalculatePath()) return;

    if (this.noPathFound() && this.shouldRetryCalculatePath()) {
      this.retryCalculatePath(delta);
    }

    this.updatePosOnPath();

    if (this.hasArrived() && this.existsDistToTarget()) {
      this.turnTowardsTarget();
    }

    if (this.hasArrived()) return;

    if (this.isBlocking(this.nextTileOnPath())) {
      this.applyPathBlockedStrategy();
    } else {
      this.moveCharOnPath();
    }
  }

  getNeighbours = (pos: Vector2): Vector2[] => {
    const neighbours = this._getNeighbours(pos);
    return neighbours.filter((pos) => !this.isBlocking(pos));
  };

  private moveCharOnPath(): void {
    const dir = this.getDir(
      this.character.getNextTilePos(),
      this.nextTileOnPath()
    );
    this.character.move(dir);
  }

  private nextTileOnPath(): Vector2 {
    return this.shortestPath[this.posOnPath + 1];
  }

  private applyPathBlockedStrategy(): void {
    if (this.pathBlockedStrategy === PathBlockedStrategy.RETRY) {
      this.calcShortestPath();
    } else if (this.pathBlockedStrategy === PathBlockedStrategy.STOP) {
      this.stop();
    }
  }

  private stop(): void {
    this.stopped = true;
  }

  private turnTowardsTarget(): void {
    const nextTile = this.shortestPath[this.posOnPath + 1];
    const dir = this.getDir(this.character.getNextTilePos(), nextTile);
    this.character.turnTowards(dir);
  }

  private existsDistToTarget(): boolean {
    return this.posOnPath < this.shortestPath.length - 1;
  }

  private hasArrived(): boolean {
    return (
      this.posOnPath + Math.max(0, this.distance - this.distOffset) >=
      this.shortestPath.length - 1
    );
  }

  private retryCalculatePath(delta: number) {
    this.noPathFoundRetryElapsed += delta;
    if (this.noPathFoundRetryElapsed >= this.noPathFoundRetryBackoffMs) {
      this.noPathFoundRetryElapsed = 0;
      this.calcShortestPath();
      this.noPathFoundRetries++;
    }
  }

  private shouldRetryCalculatePath(): boolean {
    return (
      this.noPathFoundStrategy === NoPathFoundStrategy.RETRY &&
      (this.noPathFoundMaxRetries === -1 ||
        this.noPathFoundRetries < this.noPathFoundMaxRetries)
    );
  }

  private updatePosOnPath(): void {
    let currentTile = this.shortestPath[this.posOnPath];
    while (
      this.posOnPath < this.shortestPath.length - 1 &&
      (this.character.getNextTilePos().x != currentTile.x ||
        this.character.getNextTilePos().y != currentTile.y)
    ) {
      this.posOnPath++;
      currentTile = this.shortestPath[this.posOnPath];
    }
  }

  private noPathFound(): boolean {
    return this.shortestPath.length === 0;
  }

  private calcShortestPath(): void {
    const shortestPath = this.getShortestPath();
    this.posOnPath = 0;
    this.shortestPath = shortestPath.path;
    this.distOffset = shortestPath.distOffset;
  }

  private isBlocking = (pos: Vector2): boolean => {
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

  private getShortestPath(): { path: Vector2[]; distOffset: number } {
    const shortestPathAlgo: ShortestPathAlgorithm = new Bfs();
    const {
      path: shortestPath,
      closestToTarget,
    } = shortestPathAlgo.getShortestPath(
      this.character.getNextTilePos(),
      this.targetPos,
      this.getNeighbours
    );

    const noPathFound = shortestPath.length == 0;

    if (
      noPathFound &&
      this.noPathFoundStrategy === NoPathFoundStrategy.CLOSEST_REACHABLE
    ) {
      const shortestPathToClosestPoint = shortestPathAlgo.getShortestPath(
        this.character.getNextTilePos(),
        closestToTarget,
        this.getNeighbours
      ).path;
      const distOffset = DistanceUtils.distance(
        closestToTarget,
        this.targetPos,
        this.numberOfDirections
      );
      return { path: shortestPathToClosestPoint, distOffset };
    }

    return { path: shortestPath, distOffset: 0 };
  }

  private getDir(from: Vector2, to: Vector2): Direction {
    if (this.numberOfDirections === NumberOfDirections.EIGHT) {
      return this.getDir8Directions(from, to);
    }
    return this.getDir4Directions(from, to);
  }

  private getDir8Directions(from: Vector2, to: Vector2): Direction {
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

  private getDir4Directions(from: Vector2, to: Vector2): Direction {
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
}
