import { Direction } from "../../Direction/Direction.js";
import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { Movement, MovementInfo } from "../Movement.js";
import { Subject } from "rxjs";
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
export declare enum QueuedPathBlockedStrategy {
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
    STOP = "STOP"
}
/**
 * @category Queue Movement
 */
export type QueueMovementResult = "SUCCESS" | "INVALID_NEXT_POS" | "MOVEMENT_TERMINATED" | "PATH_BLOCKED" | "PATH_BLOCKED_WAIT_TIMEOUT";
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
export declare class QueueMovement implements Movement {
    private character;
    private tilemap;
    private queue;
    private finished$;
    private distanceUtils;
    private pathBlockedWaitElapsed;
    constructor(character: GridCharacter, tilemap: GridTilemap);
    update(delta: number): void;
    getInfo(): MovementInfo;
    enqueue(positions: Array<LayerVecPos | Direction>, config?: QueueMovementConfig): void;
    peekAll(): QueueEntry[];
    size(): number;
    finished(): Subject<Finished>;
    clear(): void;
    private moveCharOnPath;
    private getNextValidPosition;
    private isLastMovement;
    private isNeighborPos;
    private finishMovementTerminated;
    private finishInvalidNextPos;
    private finishPathBlocked;
    private finishBlockedWaitTimeout;
    private finish;
    private getDir;
    private posToStr;
}
export {};
