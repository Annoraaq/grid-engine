import { NoPathFoundStrategy } from "./../../Pathfinding/NoPathFoundStrategy";
import { NumberOfDirections } from "./../../Direction/Direction";
import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { Position } from "../../GridEngine";
import { Subject } from "rxjs";
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
export declare enum MoveToResult {
    SUCCESS = "SUCCESS",
    NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED",
    PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED",
    PATH_BLOCKED = "PATH_BLOCKED",
    NO_PATH_FOUND = "NO_PATH_FOUND",
    PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT",
    MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED"
}
export interface Finished {
    position: Position;
    result?: MoveToResult;
    description?: string;
    layer: string;
}
export declare class TargetMovement implements Movement {
    private character;
    private tilemap;
    private targetPos;
    private distance;
    private shortestPath;
    private distOffset;
    private posOnPath;
    private pathBlockedStrategy;
    private noPathFoundStrategy;
    private stopped;
    private noPathFoundRetryable;
    private pathBlockedRetryable;
    private pathBlockedWaitTimeoutMs;
    private pathBlockedWaitElapsed;
    private distanceUtils;
    private finished$;
    constructor(character: GridCharacter, tilemap: GridTilemap, targetPos: LayerPosition, numberOfDirections?: NumberOfDirections, distance?: number, config?: MoveToConfig);
    setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void;
    getPathBlockedStrategy(): PathBlockedStrategy;
    private setCharacter;
    update(delta: number): void;
    getNeighbours: (pos: LayerPosition) => LayerPosition[];
    finishedObs(): Subject<Finished>;
    private resultToReason;
    private applyPathBlockedStrategy;
    private moveCharOnPath;
    private nextTileOnPath;
    private stop;
    private turnTowardsTarget;
    private existsDistToTarget;
    private hasArrived;
    private updatePosOnPath;
    private noPathFound;
    private calcShortestPath;
    private isBlocking;
    private getShortestPath;
    private getDir;
}
