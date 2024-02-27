import { Queue } from "../../Datastructures/Queue/Queue.js";
import {
  Direction,
  directionFromPos,
  isDirection,
} from "../../Direction/Direction.js";
import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { Movement, MovementInfo } from "../Movement.js";
import { Subject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { DistanceUtilsFactory } from "../../Utils/DistanceUtilsFactory/DistanceUtilsFactory.js";
import { DistanceUtils } from "../../Utils/DistanceUtils.js";
import { Concrete } from "../../Utils/TypeUtils.js";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
import { CharLayer, LayerPosition, Position } from "../../Position.js";

/**
 * @category Queue Movement
 */
export interface QueueMovementConfig {
  /**
   * Determines what happens if the next position on the enqueued path is blocked.
   * For the different strategies see {@link QueuedPathBlockedStrategy}.
   * @default QueuePathBlockedStrategy.STOP
   */
  pathBlockedStrategy?: QueuedPathBlockedStrategy;

  /**
   * Only relevant if {@link QueueMovementConfig.pathBlockedStrategy} is set to {@link QueuedPathBlockedStrategy.WAIT}.
   *
   * It sets the number of milliseconds that Grid Engine will wait
   * for the path to become unblocked again before stopping the movement.
   *
   * If not set, Grid Engine will wait forever (equals a value of `-1`).
   * @default `-1`
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

  /**
   * If `true`, it will not stop when an invalid (not blocked) movement is to be
   * executed. Instead it will simply drop that movement and try the next one.
   * Please note that in contrast to
   * {@link QueueMovementConfig.ignoreInvalidPositions} this also includes
   * movements that cannot be performed due to missing transitions.
   *
   * To control what happens with blocked positions, use
   * {@link QueueMovementConfig.pathBlockedStrategy}
   *
   * @default `false`
   */
  skipInvalidPositions?: boolean;
}

/**
 * Determines what happens if the next position on the enqueued path is blocked.
 *
 * @category Queue Movement
 */
export enum QueuedPathBlockedStrategy {
  /**
   * Makes the character wait (forever or until given
   * {@link QueueMovementConfig.pathBlockedWaitTimeoutMs}) until the path will
   * be free again.
   */
  WAIT = "WAIT",

  /**
   * Makes the character skip the current movement and try the next in the
   * queue.
   */
  SKIP = "SKIP",

  /**
   * Makes the character stop the movement.
   */
  STOP = "STOP",
}

/**
 * @category Queue Movement
 */
export type QueueMovementResult =
  | "SUCCESS"
  | "INVALID_NEXT_POS"
  | "MOVEMENT_TERMINATED"
  | "PATH_BLOCKED"
  | "PATH_BLOCKED_WAIT_TIMEOUT";

/**
 * @category Queue Movement
 */
export interface Finished {
  position: Position;
  result?: QueueMovementResult;
  description?: string;
  layer: CharLayer;
}

interface QueueEntry {
  command: LayerVecPos | Direction;
  config: Concrete<QueueMovementConfig>;
}

/**
 * @category Queue Movement
 */
export interface QueueMovementEntry {
  command: LayerPosition | Direction;
  config: Concrete<QueueMovementConfig>;
}

export class QueueMovement implements Movement {
  private queue = new Queue<QueueEntry>();
  private finished$ = new Subject<Finished>();
  private distanceUtils: DistanceUtils;
  private pathBlockedWaitElapsed = 0;

  constructor(
    private character: GridCharacter,
    private tilemap: GridTilemap,
  ) {
    this.distanceUtils = DistanceUtilsFactory.create(
      character.getNumberOfDirections(),
    );
    this.character
      .autoMovementSet()
      .pipe(
        filter((movement) => movement !== this),
        take(1),
      )
      .subscribe(() => {
        if (this.queue.size() > 0) {
          this.finishMovementTerminated();
        }
        this.finished$.complete();
      });
  }

  update(delta: number): void {
    if (
      (!this.character.isMoving() ||
        this.character.willCrossTileBorderThisUpdate(delta)) &&
      this.queue.size() > 0
    ) {
      this.moveCharOnPath(delta);
    }
  }

  getInfo(): MovementInfo {
    return {
      type: "Queue",
    };
  }

  enqueue(
    positions: Array<LayerVecPos | Direction>,
    config: QueueMovementConfig = {},
  ): void {
    const concreteConfig: Concrete<QueueMovementConfig> = {
      pathBlockedStrategy:
        config.pathBlockedStrategy ?? QueuedPathBlockedStrategy.STOP,
      pathBlockedWaitTimeoutMs: config?.pathBlockedWaitTimeoutMs || -1,
      ignoreInvalidPositions: config.ignoreInvalidPositions ?? false,
      skipInvalidPositions: config.skipInvalidPositions ?? false,
    };

    for (const pos of positions) {
      const newEntry = { command: pos, config: concreteConfig };
      if (isDirection(pos)) {
        this.queue.enqueue(newEntry);
        continue;
      }

      const endEntry = this.queue.peekEnd();
      let endCommand = endEntry?.command;
      if (!endCommand) {
        endCommand = this.character.getNextTilePos();
      }
      if (isDirection(endCommand)) {
        this.queue.enqueue(newEntry);
        continue;
      }
      const isNeighborPos =
        this.distanceUtils.distance(endCommand.position, pos.position) === 1;
      if (!config.ignoreInvalidPositions || isNeighborPos) {
        this.queue.enqueue(newEntry);
      }
    }
  }

  peekAll(): QueueEntry[] {
    return this.queue.peekAll();
  }

  size(): number {
    return this.queue.size();
  }

  finished(): Subject<Finished> {
    return this.finished$;
  }

  clear(): void {
    this.queue.clear();
  }

  private moveCharOnPath(delta: number): void {
    const nextEntry = this.queue.peek();
    if (!nextEntry) return;
    let nextPos: LayerVecPos | Direction | undefined = nextEntry.command;
    const nextConfig = nextEntry.config;

    if (isDirection(nextPos)) {
      nextPos = this.tilemap.getTilePosInDirection(
        this.character.getNextTilePos(),
        nextPos,
      );
    }

    if (!nextConfig.skipInvalidPositions) {
      if (!this.isNeighborPos(nextPos)) {
        this.finishInvalidNextPos(nextPos);
        return;
      }
    } else {
      nextPos = this.getNextValidPosition();
      if (!nextPos) {
        this.finishInvalidNextPos(nextPos);
        return;
      }
    }

    if (
      this.character.isBlockingDirection(
        directionFromPos(
          this.character.getNextTilePos().position,
          nextPos.position,
        ),
      )
    ) {
      if (nextConfig.pathBlockedStrategy === QueuedPathBlockedStrategy.STOP) {
        this.finishPathBlocked(nextPos);
      } else if (
        nextConfig.pathBlockedStrategy === QueuedPathBlockedStrategy.SKIP
      ) {
        this.queue.dequeue();
        this.moveCharOnPath(delta);
        return;
      } else if (
        nextConfig.pathBlockedStrategy === QueuedPathBlockedStrategy.WAIT &&
        nextConfig.pathBlockedWaitTimeoutMs > -1
      ) {
        this.pathBlockedWaitElapsed += delta;
        if (
          this.pathBlockedWaitElapsed >= nextConfig.pathBlockedWaitTimeoutMs
        ) {
          this.finishBlockedWaitTimeout(
            nextPos,
            nextConfig.pathBlockedWaitTimeoutMs,
          );
        }
      }
      return;
    }
    this.pathBlockedWaitElapsed = 0;
    this.queue.dequeue();
    this.character.move(
      this.getDir(this.character.getNextTilePos().position, nextPos.position),
    );

    if (this.isLastMovement()) {
      this.finish("SUCCESS", "", nextPos);
    }
  }
  private getNextValidPosition(): LayerVecPos | undefined {
    while (this.queue.size() > 0) {
      let nextPos = this.queue.peek()?.command;
      if (isDirection(nextPos)) {
        nextPos = this.tilemap.getTilePosInDirection(
          this.character.getNextTilePos(),
          nextPos,
        );
      }

      if (nextPos && this.isNeighborPos(nextPos)) {
        return nextPos;
      }
      this.queue.dequeue();
    }
    return undefined;
  }

  private isLastMovement(): boolean {
    return this.queue.size() === 0;
  }

  private isNeighborPos(position: LayerVecPos): boolean {
    const isNeighborPos =
      this.distanceUtils.distance(
        this.character.getNextTilePos().position,
        position.position,
      ) === 1;

    const trans = this.tilemap.getTransition(
      position.position,
      this.character.getNextTilePos().layer,
    );

    if (this.character.getNextTilePos().layer !== position.layer) {
      return isNeighborPos && trans === position.layer;
    }

    const hasTransition = trans !== undefined && trans !== position.layer;
    return isNeighborPos && !hasTransition;
  }

  private finishMovementTerminated(): void {
    this.finish(
      "MOVEMENT_TERMINATED",
      "New automatic movement has been set to character.",
    );
  }

  private finishInvalidNextPos(nextPos: LayerVecPos | undefined): void {
    if (nextPos) {
      this.finish(
        "INVALID_NEXT_POS",
        `Position ${this.posToStr(
          nextPos,
        )} is not reachable from ${this.posToStr(
          this.character.getNextTilePos(),
        )}.`,
      );
    } else {
      this.finish(
        "INVALID_NEXT_POS",
        `No enqueued position is reachable from ${this.posToStr(
          this.character.getNextTilePos(),
        )}.`,
      );
    }
  }

  private finishPathBlocked(nextPos: LayerVecPos): void {
    this.finish(
      "PATH_BLOCKED",
      `Position ${this.posToStr(nextPos)} is blocked.`,
    );
  }

  private finishBlockedWaitTimeout(
    nextPos: LayerVecPos,
    pathBlockedWaitTimeoutMs: number,
  ): void {
    this.finish(
      "PATH_BLOCKED_WAIT_TIMEOUT",
      `Position ${this.posToStr(
        nextPos,
      )} is blocked and the wait timeout of ${pathBlockedWaitTimeoutMs} ms has been exceeded.`,
    );
  }

  private finish(
    result: QueueMovementResult,
    description = "",
    nextPos: LayerVecPos = this.character.getNextTilePos(),
  ): void {
    this.queue = new Queue<QueueEntry>();
    this.finished$.next({
      position: nextPos.position,
      result,
      description,
      layer: nextPos.layer,
    });
  }

  private getDir(from: Vector2, to: Vector2): Direction {
    return this.tilemap.fromMapDirection(directionFromPos(from, to));
  }

  private posToStr(pos: LayerVecPos): string {
    return `(${pos.position.x}, ${pos.position.y}, ${pos.layer})`;
  }
}
