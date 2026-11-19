import { filter, take, takeUntil } from "rxjs/operators";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharId, GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { Movement, MovementInfo } from "../Movement.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { Direction } from "../../Direction/Direction.js";
import {
  IsPositionAllowedFn,
  PathfindingOptions,
} from "../../Pathfinding/PathfindingOptions.js";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy.js";
import { Bfs } from "../../Pathfinding/Bfs/Bfs.js";
import { Retryable } from "../TargetMovement/Retryable/Retryable.js";
import { DistanceUtils } from "../../Utils/DistanceUtils.js";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { Concrete } from "../../Utils/TypeUtils.js";

export interface Options {
  distance: number;
  farthestPointIfBlocked?: boolean;
  maxPathLength?: number;
  ignoreLayers?: boolean;
  isPositionAllowedFn?: IsPositionAllowedFn;
  ignoredChars?: CharId[];
  pathBlockedStrategy?: PathBlockedStrategy;
  pathBlockedRetryBackoffMs?: number;
}

export class FleeMovement implements Movement {
  private options: Concrete<Options>;
  private escapePath: LayerVecPos[] = [];
  private posOnPath = 0;
  private avoidPos: LayerVecPos;
  private pathBlockedRetryable: Retryable;
  private distanceUtils: DistanceUtils;

  constructor(
    private character: GridCharacter,
    private gridTilemap: GridTilemap,
    private charToAvoid: GridCharacter,
    options: Options,
  ) {
    const defaultOptions: Omit<Concrete<Options>, "distance"> = {
      farthestPointIfBlocked: true,
      maxPathLength: Infinity,
      ignoreLayers: false,
      isPositionAllowedFn: () => true,
      ignoredChars: [],
      pathBlockedStrategy: PathBlockedStrategy.RETRY,
      pathBlockedRetryBackoffMs: 200,
    };
    this.options = { ...defaultOptions, ...options };
    this.avoidPos = this.charToAvoid.getNextTilePos();
    this.distanceUtils = DistanceUtilsFactory.create(
      this.character.getNumberOfDirections(),
    );
    this.pathBlockedRetryable = new Retryable(
      this.options.pathBlockedRetryBackoffMs,
      -1,
      () => {
        // Infinite retries while avoiding
      },
    );
  }

  init(): void {
    this.avoidPos = this.charToAvoid.getNextTilePos();
    this.pathBlockedRetryable.reset();
    this.updateEscapePath();

    this.charToAvoid
      .positionChangeStarted()
      .pipe(
        takeUntil(
          this.character.autoMovementSet().pipe(
            filter((movement) => movement !== this),
            take(1),
          ),
        ),
      )
      .subscribe(({ enterTile, enterLayer }) => {
        this.avoidPos = {
          position: new Vector2(enterTile),
          layer: enterLayer,
        };
        this.updateEscapePath();
      });
  }

  update(delta: number): void {
    if (this.escapePath.length === 0) {
      if (
        this.isWithinFleeDistance() &&
        this.options.pathBlockedStrategy === PathBlockedStrategy.RETRY
      ) {
        this.pathBlockedRetryable.retry(delta, () => this.calcEscapePath());
      }
      return;
    }

    this.updatePosOnPath();

    if (this.hasArrived()) {
      this.clearPath();
      this.pathBlockedRetryable.reset();
      return;
    }

    const nextTile = this.nextTileOnPath();
    if (this.isBlocking(nextTile)) {
      this.applyPathBlockedStrategy(delta);
    } else {
      this.pathBlockedRetryable.reset();
      this.moveCharOnPath();
    }
  }

  getInfo(): MovementInfo {
    return {
      type: "Flee",
      config: {
        charToAvoid: this.charToAvoid.getId(),
        distance: this.options.distance,
        farthestPointIfBlocked: this.options.farthestPointIfBlocked,
        maxPathLength: this.options.maxPathLength,
        ignoreLayers: this.options.ignoreLayers,
        isPositionAllowedFn: this.options.isPositionAllowedFn,
        ignoredChars: this.options.ignoredChars,
        pathBlockedStrategy: this.options.pathBlockedStrategy,
        pathBlockedRetryBackoffMs: this.options.pathBlockedRetryBackoffMs,
      },
      state: {
        pathAhead: this.escapePath
          .slice(this.posOnPath)
          .map((pos) => LayerPositionUtils.fromInternal(pos)),
      },
    };
  }

  private getPathfindingOptions(): Concrete<PathfindingOptions> {
    return {
      shortestPathAlgorithm: "BFS",
      pathWidth: this.character.getTileWidth(),
      pathHeight: this.character.getTileHeight(),
      numberOfDirections: this.character.getNumberOfDirections(),
      isPositionAllowed: this.options.isPositionAllowedFn,
      collisionGroups: this.character.getCollisionGroups(),
      ignoredChars: [this.character.getId(), ...this.options.ignoredChars],
      ignoreTiles: !this.character.collidesWithTiles(),
      ignoreMapBounds: this.character.getIgnoreMissingTiles(),
      ignoreBlockedTarget: false,
      maxPathLength: this.options.maxPathLength,
      ignoreLayers: this.options.ignoreLayers,
      considerCosts: false,
      calculateClosestToTarget: false,
    };
  }

  private isWithinFleeDistance(): boolean {
    const charPos = this.character.getNextTilePos();
    if (!this.options.ignoreLayers && charPos.layer !== this.avoidPos.layer) {
      return false;
    }
    return (
      this.distanceUtils.distance(charPos.position, this.avoidPos.position) <
      this.options.distance
    );
  }

  private updateEscapePath(): void {
    if (!this.isWithinFleeDistance()) {
      this.clearPath();
      return;
    }

    if (this.hasSafeActivePath()) {
      return;
    }

    this.calcEscapePath();
  }

  private hasSafeActivePath(): boolean {
    if (this.escapePath.length <= 1) return false;
    this.updatePosOnPath();
    if (this.hasArrived()) return false;

    const destination = this.escapePath[this.escapePath.length - 1];
    const destSafe =
      this.distanceUtils.distance(
        destination.position,
        this.avoidPos.position,
      ) >= this.options.distance;
    if (!destSafe) return false;

    const nextTile = this.nextTileOnPath();
    if (!nextTile || this.isBlocking(nextTile)) return false;

    return true;
  }

  private calcEscapePath(): void {
    const bfs = new Bfs(this.gridTilemap, this.getPathfindingOptions());
    const result = bfs.findFleePath(
      this.character.getNextTilePos(),
      this.avoidPos,
      this.options.distance,
    );

    if (result.path.length > 1) {
      this.escapePath = result.path;
      this.posOnPath = 0;
    } else if (
      result.path.length === 0 &&
      this.options.farthestPointIfBlocked &&
      result.pathToFarthest.length > 1
    ) {
      this.escapePath = result.pathToFarthest;
      this.posOnPath = 0;
    } else {
      this.clearPath();
    }
  }

  private applyPathBlockedStrategy(delta: number): void {
    if (this.options.pathBlockedStrategy === PathBlockedStrategy.RETRY) {
      this.pathBlockedRetryable.retry(delta, () => this.calcEscapePath());
    } else if (this.options.pathBlockedStrategy === PathBlockedStrategy.STOP) {
      this.clearPath();
    }
  }

  private moveCharOnPath(): void {
    const nextTile = this.nextTileOnPath();
    if (!nextTile) return;
    const dir = this.getDir(
      this.character.getNextTilePos().position,
      nextTile.position,
    );
    this.character.move(dir);
  }

  private nextTileOnPath(): LayerVecPos | undefined {
    return this.escapePath[this.posOnPath + 1];
  }

  private hasArrived(): boolean {
    return (
      this.escapePath.length > 0 && this.posOnPath >= this.escapePath.length - 1
    );
  }

  private updatePosOnPath(): void {
    let currentTile = this.escapePath[this.posOnPath];
    while (
      this.posOnPath < this.escapePath.length - 1 &&
      (this.character.getNextTilePos().position.x !== currentTile.position.x ||
        this.character.getNextTilePos().position.y !== currentTile.position.y)
    ) {
      this.posOnPath++;
      currentTile = this.escapePath[this.posOnPath];
    }
  }

  private clearPath(): void {
    this.escapePath = [];
    this.posOnPath = 0;
  }

  private isBlocking(dest?: LayerVecPos): boolean {
    if (!dest) return true;
    const bfs = new Bfs(this.gridTilemap, this.getPathfindingOptions());
    return bfs.isBlocking(this.character.getNextTilePos(), dest);
  }

  private getDir(from: Vector2, to: Vector2): Direction {
    return this.gridTilemap.fromMapDirection(
      this.distanceUtils.direction(from, to),
    );
  }
}
