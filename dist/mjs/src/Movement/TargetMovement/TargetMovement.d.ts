import { NoPathFoundStrategy } from "./../../Pathfinding/NoPathFoundStrategy.js";
import { IsPositionAllowedFn } from "./../../Pathfinding/PathfindingOptions.js";
import { ShortestPathAlgorithmType } from "./../../Pathfinding/ShortestPathAlgorithm.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharId, GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { Movement, MovementInfo } from "../Movement.js";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy.js";
import { CharLayer, LayerPosition, Position } from "../../GridEngine.js";
import { Subject } from "rxjs";
import { LayerVecPos } from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";
/**
 * @category Pathfinding
 */
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
     * Only relevant if {@link noPathFoundStrategy} is set to {@link NoPathFoundStrategy.RETRY}.
     *
     * It sets the time in milliseconds that the pathfinding algorithm will wait
     * until the next retry.
     */
    noPathFoundRetryBackoffMs?: number;
    /**
     * Only relevant if {@link noPathFoundStrategy} is set to {@link NoPathFoundStrategy.RETRY}.
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
    /**
     * If this is set, the algorithm will stop once it reaches a path length of
     * this value. This is useful to avoid running out of memory on large or
     * infinite maps.
     */
    maxPathLength?: number | undefined;
    /**
     * If set to `true`, pathfinding will only be performed on the char layer of
     * the start position. If you don't use char layers, activating this setting
     * can improve pathfinding performance.
     *
     * @default false
     */
    ignoreLayers?: boolean;
    /**
     * Only considered by A* algorithm.
     * If set to `true`, pathfinding will consider costs. Costs are set via tile
     * properties.
     *
     * @default false
     */
    considerCosts?: boolean;
    /**
     * Only relevant if {@link MoveToConfig.noPathFoundStrategy} is set to {@link
     * NoPathFoundStrategy.ALTERNATIVE_TARGETS}.
     *
     * It provides a list of alternative targets that are considered if the main
     * target is not reachable. That list is processed in order.
     */
    alternativeTargets?: LayerPosition[];
    /**
     * Only relevant if {@link MoveToConfig.noPathFoundStrategy} is set to {@link
     * NoPathFoundStrategy.ALTERNATIVE_TARGETS}.
     *
     * In case all these targets are blocked this is the fallback strategy.
     */
    noPathFoundAlternativeTargetsFallbackStrategy?: NoPathFoundStrategy;
    /**
     * Set of characters to ignore at collision checking.
     */
    ignoredChars?: CharId[];
}
/**
 * @category Pathfinding
 */
export declare enum MoveToResult {
    SUCCESS = "SUCCESS",
    NO_PATH_FOUND_MAX_RETRIES_EXCEEDED = "NO_PATH_FOUND_MAX_RETRIES_EXCEEDED",
    PATH_BLOCKED_MAX_RETRIES_EXCEEDED = "PATH_BLOCKED_MAX_RETRIES_EXCEEDED",
    PATH_BLOCKED = "PATH_BLOCKED",
    NO_PATH_FOUND = "NO_PATH_FOUND",
    PATH_BLOCKED_WAIT_TIMEOUT = "PATH_BLOCKED_WAIT_TIMEOUT",
    MOVEMENT_TERMINATED = "MOVEMENT_TERMINATED",
    MAX_PATH_LENGTH_REACHED = "MAX_PATH_LENGTH_REACHED"
}
/**
 * @category Pathfinding
 */
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
export interface MoveToInfo extends MovementInfo {
    state: {
        pathAhead: LayerPosition[];
    };
    config: {
        algorithm: ShortestPathAlgorithmType;
        ignoreBlockedTarget: boolean;
        distance: number;
        targetPos: LayerPosition;
        noPathFoundStrategy: NoPathFoundStrategy;
        pathBlockedStrategy: PathBlockedStrategy;
        noPathFoundRetryBackoffMs: number;
        noPathFoundMaxRetries: number;
    };
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
    private alternativeTargets?;
    private noPathFoundAlternativeTargetsFallbackStrategy?;
    private pathBlockedRetryable;
    private pathBlockedWaitTimeoutMs;
    private pathBlockedWaitElapsed;
    private distanceUtils;
    private finished$;
    private ignoreBlockedTarget;
    private ignoreLayers;
    private distance;
    private isPositionAllowed;
    private shortestPathAlgorithm;
    private maxPathLength;
    private considerCosts;
    private ignoredChars;
    constructor(character: GridCharacter, tilemap: GridTilemap, targetPos: LayerVecPos, { config, ignoreBlockedTarget, distance }?: Options);
    setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void;
    getPathBlockedStrategy(): PathBlockedStrategy;
    private setCharacter;
    private getPathfindingOptions;
    update(delta: number): void;
    finishedObs(): Subject<Finished>;
    getInfo(): MoveToInfo;
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
    private pathToAlternativeTarget;
    private getDir;
}
