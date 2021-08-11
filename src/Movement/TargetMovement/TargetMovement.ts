import { DistanceUtils } from "./../../Utils/DistanceUtils";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { Bfs } from "../../Pathfinding/Bfs/Bfs";
import { Movement } from "../Movement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { Retryable } from "./Retryable/Retryable";
import { DistanceUtils8 } from "../../Utils/DistanceUtils8/DistanceUtils8";
import { DistanceUtils4 } from "../../Utils/DistanceUtils4/DistanceUtils4";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { ShortestPathAlgorithm } from "../../Pathfinding/ShortestPathAlgorithm";
import { Position } from "../../GridEngine";
import { Subject, take } from "rxjs";

export interface MoveToConfig {
  noPathFoundStrategy?: NoPathFoundStrategy;
  pathBlockedStrategy?: PathBlockedStrategy;
  noPathFoundRetryBackoffMs?: number;
  noPathFoundMaxRetries?: number;
  pathBlockedMaxRetries?: number;
  pathBlockedRetryBackoffMs?: number;
  pathBlockedWaitTimeoutMs?: number;
}

export enum Result {
  SUCCESS = "SUCCESS",
  NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED",
  PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED",
  NO_PATH_FOUND = "NO_PATH_FOUND",
  PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT",
  MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED",
}

export interface Finished {
  position: Position;
  result?: Result;
  description?: string;
}

export class TargetMovement implements Movement {
  private character: GridCharacter;
  private shortestPath: Vector2[];
  private distOffset: number;
  private posOnPath = 0;
  private pathBlockedStrategy: PathBlockedStrategy;
  private noPathFoundStrategy: NoPathFoundStrategy;
  private stopped = false;
  private noPathFoundRetryable: Retryable;
  private pathBlockedRetryable: Retryable;
  private pathBlockedWaitTimeoutMs: number;
  private pathBlockedWaitElapsed: number;
  private distanceUtils: DistanceUtils = new DistanceUtils4();
  private finished$: Subject<Finished>;

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
    this.noPathFoundRetryable = new Retryable(
      config?.noPathFoundRetryBackoffMs || 200,
      config?.noPathFoundMaxRetries || -1,
      () => {
        this.stop(Result.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED);
      }
    );
    this.pathBlockedRetryable = new Retryable(
      config?.pathBlockedRetryBackoffMs || 200,
      config?.pathBlockedMaxRetries || -1,
      () => {
        this.stop(Result.PATH_BLOCKED_MAX_RETRIES_EXCEEDED);
      }
    );
    this.pathBlockedWaitTimeoutMs = config?.pathBlockedWaitTimeoutMs || -1;
    this.finished$ = new Subject<Finished>();
  }

  setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void {
    this.pathBlockedStrategy = pathBlockedStrategy;
  }

  getPathBlockedStrategy(): PathBlockedStrategy {
    return this.pathBlockedStrategy;
  }

  setNumberOfDirections(numberOfDirections: NumberOfDirections): void {
    if (numberOfDirections === NumberOfDirections.EIGHT) {
      this.distanceUtils = new DistanceUtils8();
    } else {
      this.distanceUtils = new DistanceUtils4();
    }
  }

  setCharacter(character: GridCharacter): void {
    this.character = character;
    this.noPathFoundRetryable.reset();
    this.pathBlockedRetryable.reset();
    this.pathBlockedWaitElapsed = 0;
    this.calcShortestPath();
    this.character
      .autoMovementSet()
      .pipe(take(1))
      .subscribe(() => {
        this.stop(Result.MOVEMENT_TERMINATED);
      });
  }

  update(delta: number): void {
    if (this.stopped) return;

    if (this.noPathFound()) {
      if (this.noPathFoundStrategy === NoPathFoundStrategy.RETRY) {
        this.noPathFoundRetryable.retry(delta, () => this.calcShortestPath());
      }
    }
    if (this.isBlocking(this.nextTileOnPath())) {
      this.applyPathBlockedStrategy(delta);
    } else {
      this.pathBlockedWaitElapsed = 0;
    }

    this.updatePosOnPath();
    if (this.hasArrived()) {
      this.stop();
      if (this.existsDistToTarget()) {
        this.turnTowardsTarget();
      }
    } else if (!this.isBlocking(this.nextTileOnPath())) {
      this.moveCharOnPath();
    }
  }

  getNeighbours = (pos: Vector2): Vector2[] => {
    const neighbours = this.distanceUtils.neighbours(pos);
    return neighbours.filter((pos) => !this.isBlocking(pos));
  };

  finishedObs(): Subject<Finished> {
    return this.finished$;
  }

  private resultToReason(result?: Result): string | undefined {
    switch (result) {
      case Result.MOVEMENT_TERMINATED:
        return "Movement of character has been replaced before destination was reached.";
      case Result.NO_PATH_FOUND:
        return "PathBlockedStrategy STOP: No path found.";
      case Result.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED:
        return `NoPathFoundStrategy RETRY: Maximum retries of ${this.noPathFoundRetryable.getMaxRetries()} exceeded.`;
      case Result.PATH_BLOCKED_MAX_RETRIES_EXCEEDED:
        return `PathBlockedStrategy RETRY: Maximum retries of ${this.pathBlockedRetryable.getMaxRetries()} exceeded.`;
      case Result.PATH_BLOCKED_WAIT_TIMEOUT:
        return `PathBlockedStrategy WAIT: Wait timeout of ${this.pathBlockedWaitTimeoutMs}ms exceeded.`;
      default:
        return undefined;
    }
  }

  private applyPathBlockedStrategy(delta: number): void {
    if (this.pathBlockedStrategy === PathBlockedStrategy.RETRY) {
      this.pathBlockedRetryable.retry(delta, () => this.calcShortestPath());
    } else if (this.pathBlockedStrategy === PathBlockedStrategy.STOP) {
      this.stop(Result.NO_PATH_FOUND);
    } else if (this.pathBlockedStrategy === PathBlockedStrategy.WAIT) {
      if (this.pathBlockedWaitTimeoutMs > -1) {
        this.pathBlockedWaitElapsed += delta;
        if (this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs) {
          this.stop(Result.PATH_BLOCKED_WAIT_TIMEOUT);
        }
      }
    }
  }

  private moveCharOnPath(): void {
    const dir = this.getDir(
      this.character.getNextTilePos(),
      this.nextTileOnPath()
    );
    this.character.move(dir);
  }

  private nextTileOnPath(): Vector2 | undefined {
    return this.shortestPath[this.posOnPath + 1];
  }

  private stop(result?: Result): void {
    this.finished$.next({
      position: this.character.getTilePos(),
      result,
      description: this.resultToReason(result),
    });
    this.finished$.complete();
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
      !this.noPathFound() &&
      this.posOnPath + Math.max(0, this.distance - this.distOffset) >=
        this.shortestPath.length - 1
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

  private isBlocking = (pos?: Vector2): boolean => {
    return !pos || this.tilemap.isBlocking(pos);
  };

  private getShortestPath(): { path: Vector2[]; distOffset: number } {
    const shortestPathAlgo: ShortestPathAlgorithm = new Bfs();
    const { path: shortestPath, closestToTarget } =
      shortestPathAlgo.getShortestPath(
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
      const distOffset = this.distanceUtils.distance(
        closestToTarget,
        this.targetPos
      );
      return { path: shortestPathToClosestPoint, distOffset };
    }

    return { path: shortestPath, distOffset: 0 };
  }

  private getDir(from: Vector2, to: Vector2): Direction {
    return this.distanceUtils.direction(from, to);
  }
}
