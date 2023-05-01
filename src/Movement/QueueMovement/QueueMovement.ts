import { Queue } from "../../Datastructures/Queue/Queue";
import {
  Direction,
  directionFromPos,
  isDirection,
} from "../../Direction/Direction";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { Movement, MovementInfo } from "../Movement";
import { Subject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { CharLayer, Position } from "../../IGridEngine";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory";
import { DistanceUtils } from "../../Utils/DistanceUtils";
import { LayerPositionUtils } from "../../Utils/LayerPositionUtils/LayerPositionUtils";

export interface QueueMovementConfig {
  /**
   * Determines what happens if the next position on the enqueued path is blocked.
   * For the different strategies see {@link QueuedPathBlockedStrategy}.
   */
  pathBlockedStrategy?: QueuedPathBlockedStrategy;

  /**
   * Only relevant if {@link QueueMovementConfig.pathBlockedStrategy} is set to {@link QueuedPathBlockedStrategy.WAIT}.
   *
   * It sets the number of milliseconds that Grid Engine will wait
   * for the path to become unblocked again before stopping the movement.
   *
   * If not set, Grid Engine will wait forever.
   */
  pathBlockedWaitTimeoutMs?: number;

  /**
   * If `true`, it will not enqueue a tile position that is invalid, meaning not
   * adjacent to the last position in the queue. It does *not* ignore blocked
   * positions or positions that do not have a valid layer transition. The
   * reason for this is that blocked positions or missing layer transitions
   * might not be missing/blocked anymore when the character actually tries to
   * move.
   *
   * @default `false`
   */
  ignoreInvalidPositions?: boolean;
}

/**
 * Determines what happens if the next position on the enqueued path is blocked.
 */
export enum QueuedPathBlockedStrategy {
  /**
   * Makes the character wait (forever or until given
   * {@link QueueMovementConfig.pathBlockedWaitTimeoutMs}) until the path will
   * be free again.
   */
  WAIT = "WAIT",

  /**
   * Makes the character stop the movement.
   */
  STOP = "STOP",
}

export type QueueMovementResult =
  | "SUCCESS"
  | "INVALID_NEXT_POS"
  | "MOVEMENT_TERMINATED"
  | "PATH_BLOCKED"
  | "PATH_BLOCKED_WAIT_TIMEOUT";

export interface Finished {
  position: Position;
  result?: QueueMovementResult;
  description?: string;
  layer: CharLayer;
}

export class QueueMovement implements Movement {
  private queue = new Queue<LayerVecPos>();
  private finished$ = new Subject<Finished>();
  private distanceUtils: DistanceUtils;
  private pathBlockedStrategy: QueuedPathBlockedStrategy;
  private pathBlockedWaitTimeoutMs: number;
  private pathBlockedWaitElapsed = 0;
  private ignoreInvalidPositions: boolean;

  constructor(
    private character: GridCharacter,
    private tilemap: GridTilemap,
    config: QueueMovementConfig = {}
  ) {
    this.pathBlockedStrategy =
      config.pathBlockedStrategy ?? QueuedPathBlockedStrategy.STOP;
    this.pathBlockedWaitTimeoutMs = config?.pathBlockedWaitTimeoutMs || -1;
    this.ignoreInvalidPositions = config.ignoreInvalidPositions ?? false;
    this.distanceUtils = DistanceUtilsFactory.create(
      character.getNumberOfDirections()
    );
    this.character
      .autoMovementSet()
      .pipe(
        filter((movement) => movement !== this),
        take(1)
      )
      .subscribe(() => {
        if (this.queue.size() > 0) {
          this.finishMovementTerminated();
        }
        this.finished$.complete();
      });
  }
  setConfig(config: QueueMovementConfig = {}) {
    this.pathBlockedStrategy =
      config.pathBlockedStrategy ?? QueuedPathBlockedStrategy.STOP;
    this.pathBlockedWaitTimeoutMs = config?.pathBlockedWaitTimeoutMs || -1;
    this.ignoreInvalidPositions = config.ignoreInvalidPositions ?? false;
  }

  update(delta: number): void {
    if (!this.character.isMoving() && this.queue.size() > 0) {
      this.moveCharOnPath(delta);
    }
  }

  getInfo(): MovementInfo {
    return {
      type: "Queue",
    };
  }

  enqueue(positions: Array<LayerVecPos | Direction>): void {
    for (let pos of positions) {
      let end = this.queue.peekEnd();
      if (!end) {
        end = this.character.getNextTilePos();
      }
      if (isDirection(pos)) {
        pos = this.tilemap.getTilePosInDirection(end, pos);
      }
      const isNeighborPos =
        this.distanceUtils.distance(end.position, pos.position) === 1;
      if (!this.ignoreInvalidPositions || isNeighborPos) {
        this.queue.enqueue(pos);
      }
    }
  }

  peekAll(): LayerVecPos[] {
    return this.queue.peekAll();
  }

  size(): number {
    return this.queue.size();
  }

  finished(): Subject<Finished> {
    return this.finished$;
  }

  private moveCharOnPath(delta: number): void {
    const nextPos = this.queue.peek();
    if (!nextPos) return;

    if (!this.isNeighborPos(nextPos)) {
      this.finishInvalidNextPos(nextPos);
      return;
    }

    if (
      this.character.isBlockingDirection(
        directionFromPos(this.character.getTilePos().position, nextPos.position)
      )
    ) {
      if (this.pathBlockedStrategy === QueuedPathBlockedStrategy.STOP) {
        this.finishPathBlocked(nextPos);
      } else if (
        this.pathBlockedStrategy === QueuedPathBlockedStrategy.WAIT &&
        this.pathBlockedWaitTimeoutMs > -1
      ) {
        this.pathBlockedWaitElapsed += delta;
        if (this.pathBlockedWaitElapsed >= this.pathBlockedWaitTimeoutMs) {
          this.finishBlockedWaitTimeout(nextPos);
        }
      }
      return;
    }
    this.pathBlockedWaitElapsed = 0;
    this.queue.dequeue();
    this.character.move(
      this.getDir(this.character.getTilePos().position, nextPos.position)
    );

    if (this.isLastMovement(nextPos)) {
      this.finish("SUCCESS");
    }
  }

  private isLastMovement(nextPos: LayerVecPos): boolean {
    return (
      this.queue.size() === 0 &&
      LayerPositionUtils.equal(this.character.getNextTilePos(), nextPos)
    );
  }

  private isNeighborPos(position: LayerVecPos): boolean {
    const isNeighborPos =
      this.distanceUtils.distance(
        this.character.getTilePos().position,
        position.position
      ) === 1;

    const trans = this.tilemap.getTransition(
      position.position,
      this.character.getTilePos().layer
    );

    if (this.character.getTilePos().layer !== position.layer) {
      return isNeighborPos && trans === position.layer;
    }

    const hasTransition = trans !== undefined && trans !== position.layer;
    return isNeighborPos && !hasTransition;
  }

  private finishMovementTerminated(): void {
    this.finish(
      "MOVEMENT_TERMINATED",
      "New automatic movement has been set to character."
    );
  }

  private finishInvalidNextPos(nextPos: LayerVecPos): void {
    this.finish(
      "INVALID_NEXT_POS",
      `Position ${this.posToStr(nextPos)} is not reachable from ${this.posToStr(
        this.character.getTilePos()
      )}.`
    );
  }

  private finishPathBlocked(nextPos: LayerVecPos): void {
    this.finish(
      "PATH_BLOCKED",
      `Position ${this.posToStr(nextPos)} is blocked.`
    );
  }

  private finishBlockedWaitTimeout(nextPos: LayerVecPos): void {
    this.finish(
      "PATH_BLOCKED_WAIT_TIMEOUT",
      `Position ${this.posToStr(nextPos)} is blocked and the wait timeout of ${
        this.pathBlockedWaitTimeoutMs
      } ms has been exceeded.`
    );
  }

  private finish(result: QueueMovementResult, description = ""): void {
    this.queue = new Queue<LayerVecPos>();
    this.finished$.next({
      position: this.character.getNextTilePos().position,
      result,
      description,
      layer: this.character.getNextTilePos().layer,
    });
  }

  private getDir(from: Vector2, to: Vector2): Direction {
    return this.tilemap.fromMapDirection(directionFromPos(from, to));
  }

  private posToStr(pos: LayerVecPos): string {
    return `(${pos.position.x}, ${pos.position.y}, ${pos.layer})`;
  }
}
