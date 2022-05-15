import { BidirectionalSearch } from "./../../Pathfinding/BidirectionalSearch/BidirectionalSearch";
import { NoPathFoundStrategy } from "./../../Pathfinding/NoPathFoundStrategy";
import { DistanceUtilsFactory } from "./../../Utils/DistanceUtilsFactory/DistanceUtilsFactory";
import { NumberOfDirections } from "./../../Direction/Direction";
import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { DistanceUtils } from "./../../Utils/DistanceUtils";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Direction } from "../../Direction/Direction";
import { Movement } from "../Movement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { Retryable } from "./Retryable/Retryable";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { ShortestPathAlgorithm } from "../../Pathfinding/ShortestPathAlgorithm";
import { Position } from "../../GridEngine";
import { filter, Subject, take } from "rxjs";
import { LayerPositionUtils } from "../../Utils/LayerPositionUtils/LayerPositionUtils";

export interface MoveToConfig {
  /**
   * Determines what happens if no path could be found. For the different
   * strategies see {@link NoPathFoundStrategy}.
   */
  noPathFoundStrategy?: NoPathFoundStrategy;

  /**
   * Determines what happens if a previously calculated path is suddenly
   * blocked. This can happen if a path existed and while the character was
   * moving along that path, it got suddenly blocked.
   *
   * For the different strategies see {@link PathBlockedStrategy}.
   */
  pathBlockedStrategy?: PathBlockedStrategy;

  /**
   * Only relevant if {@link MoveToConfig.noPathFoundStrategy} is set to {@link NoPathFoundStrategy.RETRY}.
   *
   * It sets the time in milliseconds that the pathfinding algorithm will wait
   * until the next retry.
   */
  noPathFoundRetryBackoffMs?: number;

  /**
   * Only relevant if {@link MoveToConfig.noPathFoundStrategy} is set to {@link NoPathFoundStrategy.RETRY}.
   *
   * It sets the maximum amount of retries before giving up.
   */
  noPathFoundMaxRetries?: number;

  /**
   * Only relevant if {@link MoveToConfig.pathBlockedStrategy} is set to {@link PathBlockedStrategy.RETRY}.
   *
   * It sets the maximum amount of retries before giving up.
   */
  pathBlockedMaxRetries?: number;

  /**
   * Only relevant if {@link MoveToConfig.pathBlockedStrategy} is set to {@link PathBlockedStrategy.RETRY}.
   *
   * It sets the time in milliseconds that the pathfinding algorithm will wait
   * until the next retry.
   */
  pathBlockedRetryBackoffMs?: number;

  /**
   * Only relevant if {@link MoveToConfig.pathBlockedStrategy} is set to {@link PathBlockedStrategy.WAIT}.
   *
   * It sets the number of milliseconds that the pathfinding algorithm will wait
   * for the path to become unblocked again before stopping the movement.
   */
  pathBlockedWaitTimeoutMs?: number;

  /**
   * Char layer of the movement target. If there is no `targetLayer` provided,
   * the current char layer of the moving character is used.
   */
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
  layer: string;
}

export interface Options {
  numberOfDirections?: NumberOfDirections;
  distance?: number;
  config?: MoveToConfig;
  ignoreBlockedTarget?: boolean;
}

export class TargetMovement implements Movement {
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
  private distanceUtils: DistanceUtils;
  private finished$: Subject<Finished>;
  private ignoreBlockedTarget: boolean;
  private distance: number;

  constructor(
    private character: GridCharacter,
    private tilemap: GridTilemap,
    private targetPos: LayerPosition,
    {
      numberOfDirections = NumberOfDirections.FOUR,
      config,
      ignoreBlockedTarget = false,
      distance = 0,
    }: Options = {}
  ) {
    this.ignoreBlockedTarget = ignoreBlockedTarget;
    this.distance = distance;
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
    this.distanceUtils = DistanceUtilsFactory.create(numberOfDirections);
    this.pathBlockedWaitTimeoutMs = config?.pathBlockedWaitTimeoutMs || -1;
    this.finished$ = new Subject<Finished>();
    this.setCharacter(character);
  }

  setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void {
    this.pathBlockedStrategy = pathBlockedStrategy;
  }

  getPathBlockedStrategy(): PathBlockedStrategy {
    return this.pathBlockedStrategy;
  }

  private setCharacter(character: GridCharacter): void {
    this.character = character;
    this.noPathFoundRetryable.reset();
    this.pathBlockedRetryable.reset();
    this.pathBlockedWaitElapsed = 0;
    this.calcShortestPath();
    this.character
      .autoMovementSet()
      .pipe(
        take(1),
        filter((movement) => movement !== this)
      )
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
        this.character?.getNextTilePos().layer
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
        this.character?.getNextTilePos().layer
      )
    ) {
      this.moveCharOnPath();
    }
  }

  getNeighbours = (pos: LayerPosition): LayerPosition[] => {
    const neighbours = this.distanceUtils.neighbours(pos.position);
    const transitionMappedNeighbours = neighbours.map((unblockedNeighbour) => {
      const transition = this.tilemap.getTransition(
        unblockedNeighbour,
        pos.layer
      );
      return {
        position: unblockedNeighbour,
        layer: transition || pos.layer,
      };
    });

    return transitionMappedNeighbours.filter(
      (neighbour) =>
        !this.isBlocking(neighbour.position, neighbour.layer) ||
        (this.ignoreBlockedTarget &&
          LayerPositionUtils.equal(neighbour, this.targetPos))
    );
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
      this.character.getNextTilePos().position,
      this.nextTileOnPath().position
    );
    this.character.move(dir);
  }

  private nextTileOnPath(): LayerPosition | undefined {
    return this.shortestPath[this.posOnPath + 1];
  }

  private stop(result?: MoveToResult): void {
    this.finished$.next({
      position: this.character.getTilePos().position,
      result,
      description: this.resultToReason(result),
      layer: this.character.getTilePos().layer,
    });
    this.finished$.complete();
    this.stopped = true;
  }

  private turnTowardsTarget(): void {
    const nextTile = this.shortestPath[this.posOnPath + 1];
    const dir = this.getDir(
      this.character.getNextTilePos().position,
      nextTile.position
    );
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
      (this.character.getNextTilePos().position.x != currentTile.position.x ||
        this.character.getNextTilePos().position.y != currentTile.position.y)
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
    if (!pos || !this.tilemap.isInRange(pos)) return true;

    if (!this.character?.collidesWithTiles()) {
      return this.tilemap.hasBlockingChar(
        pos,
        charLayer,
        this.character.getCollisionGroups()
      );
    }

    return this.tilemap.isBlocking(
      charLayer,
      pos,
      this.character.getCollisionGroups()
    );
  };

  private getShortestPath(): { path: LayerPosition[]; distOffset: number } {
    const shortestPathAlgo: ShortestPathAlgorithm = new BidirectionalSearch();
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
