import { NoPathFoundStrategy } from "./../../Pathfinding/NoPathFoundStrategy";
import { LayerVecPos, ShortestPathAlgorithmType } from "./../../Pathfinding/ShortestPathAlgorithm";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement, MovementInfo } from "../Movement";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { CharLayer, Position } from "../../GridEngine";
import { Subject } from "rxjs";
import { IsPositionAllowedFn } from "../../Pathfinding/Pathfinding";
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
    /**
     * Function to specify whether a certain position is allowed for pathfinding.
     * If the function returns false, the tile will be consindered as blocked.
     *
     * It can be used to restrict pathfinding to specific regions.
     *
     * Beware that this method can become a performance bottleneck easily. So be
     * careful and keep it as efficient as possible. An asymptotic runtime
     * complexity of O(1) is recommended.
     */
    isPositionAllowedFn?: IsPositionAllowedFn;
    /**
     * Algorithm to use for pathfinding.
     */
    algorithm?: ShortestPathAlgorithmType;
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
    layer: CharLayer;
}
export interface Options {
    distance?: number;
    config?: MoveToConfig;
    ignoreBlockedTarget?: boolean;
}
export declare class TargetMovement implements Movement {
    private character;
    private tilemap;
    private targetPos;
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
    private ignoreBlockedTarget;
    private distance;
    private isPositionAllowed;
    private shortestPathAlgorithm;
    constructor(character: GridCharacter, tilemap: GridTilemap, targetPos: LayerVecPos, { config, ignoreBlockedTarget, distance }?: Options);
    setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void;
    getPathBlockedStrategy(): PathBlockedStrategy;
    private setCharacter;
    private getPathfindingOptions;
    update(delta: number): void;
    finishedObs(): Subject<Finished>;
    getInfo(): MovementInfo;
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
