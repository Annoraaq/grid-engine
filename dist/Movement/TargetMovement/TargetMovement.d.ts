import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { NumberOfDirections } from "../../Direction/Direction";
import { Movement } from "../Movement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
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
}
export declare class TargetMovement implements Movement {
    private tilemap;
    private targetPos;
    private distance;
    private character;
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
    constructor(tilemap: GridTilemap, targetPos: Vector2, distance?: number, config?: MoveToConfig);
    setPathBlockedStrategy(pathBlockedStrategy: PathBlockedStrategy): void;
    getPathBlockedStrategy(): PathBlockedStrategy;
    setNumberOfDirections(numberOfDirections: NumberOfDirections): void;
    setCharacter(character: GridCharacter): void;
    update(delta: number): void;
    getNeighbours: (pos: Vector2) => Vector2[];
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
