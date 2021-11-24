import { NumberOfDirections } from "./../../Direction/Direction";
import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { Position } from "../../GridEngine";
import { Subject } from "rxjs";
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
