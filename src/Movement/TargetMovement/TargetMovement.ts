import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
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
  targetLayer?: string;
}

export enum MoveToResult {
  SUCCESS = "SUCCESS",
  NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED",
  PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED",
  PATH_BLOCKED = "PATH_BLOCKED",
  NO_PATH_FOUND = "NO_PATH_FOUND",
  PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT",
  MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED",
}

export interface Finished {
  position: Position;
  result?: MoveToResult;
  description?: string;
}

export class TargetMovement implements Movement {
  private character: GridCharacter;
  private shortestPath: LayerPosition[];
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
    private targetPos: LayerPosition,
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
        this.stop(MoveToResult.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED);
      }
    );
    this.pathBlockedRetryable = new Retryable(
      config?.pathBlockedRetryBackoffMs || 200,
      config?.pathBlockedMaxRetries || -1,
      () => {
        this.stop(MoveToResult.PATH_BLOCKED_MAX_RETRIES_EXCEEDED);
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
        this.stop(MoveToResult.MOVEMENT_TERMINATED);
      });
  }

  update(delta: number): void {
    if (this.stopped) return;

    if (this.noPathFound()) {
      if (this.noPathFoundStrategy === NoPathFoundStrategy.RETRY) {
        this.noPathFoundRetryable.retry(delta, () => this.calcShortestPath());
      } else if (this.noPathFoundStrategy === NoPathFoundStrategy.STOP) {
        this.stop(MoveToResult.NO_PATH_FOUND);
      }
    }

    this.updatePosOnPath();
    if (
      this.isBlocking(
        this.nextTileOnPath()?.position,
        this.character?.getCharLayer()
      )
    ) {
      this.applyPathBlockedStrategy(delta);
    } else {
      this.pathBlockedWaitElapsed = 0;
    }

    if (this.hasArrived()) {
      this.stop(MoveToResult.SUCCESS);
      if (this.existsDistToTarget()) {
        this.turnTowardsTarget();
      }
    } else if (
      !this.isBlocking(
        this.nextTileOnPath()?.position,
        this.character?.getCharLayer()
      )
    ) {
      this.moveCharOnPath();
    }
  }

  getNeighbours = (pos: LayerPosition): LayerPosition[] => {
    const neighbours = this.distanceUtils.neighbours(pos.position);
    const unblockedNeighbours = neighbours.filter(
      (neighbour) => !this.isBlocking(neighbour, pos.layer)
    );

    return unblockedNeighbours.map((unblockedNeighbour) => {
      const transition = this.tilemap.getTransition(
        unblockedNeighbour,
        pos.layer
      );
      return {
        position: unblockedNeighbour,
        layer: transition || pos.layer,
      };
    });
  };

  finishedObs(): Subject<Finished> {
    return this.finished$;
  }

  private resultToReason(result?: MoveToResult): string | undefined {
    switch (result) {
      case MoveToResult.SUCCESS:
        return "Successfully arrived.";
      case MoveToResult.MOVEMENT_TERMINATED:
        return "Movement of character has been replaced before destination was reached.";
      case MoveToResult.PATH_BLOCKED:
        return "PathBlockedStrategy STOP: Path blocked.";
      case MoveToResult.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED:
        return `NoPathFoundStrategy RETRY: Maximum retries of ${this.noPathFoundRetryable.getMaxRetries()} exceeded.`;
      case MoveToResult.NO_PATH_FOUND:
        return "NoPathFoundStrategy STOP: No path found.";
      case MoveToResult.PATH_BLOCKED_MAX_RETRIES_EXCEEDED:
        return `PathBlockedStrategy RETRY: Maximum retries of ${this.pathBlockedRetryable.getMaxRetries()} exceeded.`;
      case MoveToResult.PATH_BLOCKED_WAIT_TIMEOUT:
        return `PathBlockedStrategy WAIT: Wait timeout of ${this.pathBlockedWaitTimeoutMs}ms exceeded.`;
    }
  }

  private applyPathBlockedStrategy(delta: number): void {
    if (this.pathBlockedStrategy === PathBlockedStrategy.RETRY) {
      this.pathBlockedRetryable.retry(delta, () => this.calcShortestPath());
    } else if (this.pathBlockedStrategy === PathBlockedStrategy.STOP) {
      this.stop(MoveToResult.PATH_BLOCKED);
    } else if (this.pathBlockedStrategy === PathBlockedStrategy.WAIT) {
      if (this.pathBlockedWaitTimeoutMs > -1) {
        this.pathBlockedWaitElapsed += delta;
        if (this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs) {
          this.stop(MoveToResult.PATH_BLOCKED_WAIT_TIMEOUT);
        }
      }
    }
  }

  private moveCharOnPath(): void {
    const dir = this.getDir(
      this.character.getNextTilePos(),
      this.nextTileOnPath().position
    );
    this.character.move(dir);
  }

  private nextTileOnPath(): LayerPosition | undefined {
    return this.shortestPath[this.posOnPath + 1];
  }

  private stop(result?: MoveToResult): void {
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
    const dir = this.getDir(this.character.getNextTilePos(), nextTile.position);
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
      (this.character.getNextTilePos().x != currentTile.position.x ||
        this.character.getNextTilePos().y != currentTile.position.y)
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

  private isBlocking = (pos?: Vector2, charLayer?: string): boolean => {
    return !pos || this.tilemap.isBlocking(charLayer, pos);
  };

  private getShortestPath(): { path: LayerPosition[]; distOffset: number } {
    const shortestPathAlgo: ShortestPathAlgorithm = new Bfs();
    const { path: shortestPath, closestToTarget } =
      shortestPathAlgo.getShortestPath(
        {
          position: this.character.getNextTilePos(),
          layer: this.character.getCharLayer(),
        },
        this.targetPos,
        this.getNeighbours
      );

    // console.log(this.character.getCharLayer());
    // console.log(this.targetPos);

    const noPathFound = shortestPath.length == 0;

    if (
      noPathFound &&
      this.noPathFoundStrategy === NoPathFoundStrategy.CLOSEST_REACHABLE
    ) {
      const shortestPathToClosestPoint = shortestPathAlgo.getShortestPath(
        {
          position: this.character.getNextTilePos(),
          layer: this.character.getCharLayer(),
        },
        closestToTarget,
        this.getNeighbours
      ).path;
      const distOffset = this.distanceUtils.distance(
        closestToTarget.position,
        this.targetPos.position
      );
      return { path: shortestPathToClosestPoint, distOffset };
    }

    return { path: shortestPath, distOffset: 0 };
  }

  private getDir(from: Vector2, to: Vector2): Direction {
    return this.distanceUtils.direction(from, to);
  }
}
