import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharId, GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { Movement, MovementInfo } from "../Movement.js";
import { IsPositionAllowedFn } from "../../Pathfinding/PathfindingOptions.js";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy.js";
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
export declare class FleeMovement implements Movement {
    private character;
    private gridTilemap;
    private charToAvoid;
    private options;
    private escapePath;
    private posOnPath;
    private avoidPos;
    private pathBlockedRetryable;
    private distanceUtils;
    constructor(character: GridCharacter, gridTilemap: GridTilemap, charToAvoid: GridCharacter, options: Options);
    init(): void;
    update(delta: number): void;
    getInfo(): MovementInfo;
    private getPathfindingOptions;
    private isWithinFleeDistance;
    private updateEscapePath;
    private hasSafeActivePath;
    private calcEscapePath;
    private applyPathBlockedStrategy;
    private moveCharOnPath;
    private nextTileOnPath;
    private hasArrived;
    private updatePosOnPath;
    private clearPath;
    private isBlocking;
    private getDir;
}
