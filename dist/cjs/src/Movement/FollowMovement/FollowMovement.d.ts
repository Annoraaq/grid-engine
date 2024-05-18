import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { CharId, GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { Movement, MovementInfo } from "../Movement.js";
import { Direction, IsPositionAllowedFn, ShortestPathAlgorithmType } from "../../GridEngine.js";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy.js";
export interface Options {
    distance?: number;
    noPathFoundStrategy?: NoPathFoundStrategy;
    maxPathLength?: number;
    shortestPathAlgorithm?: ShortestPathAlgorithmType;
    ignoreLayers?: boolean;
    considerCosts?: boolean;
    facingDirection?: Direction;
    isPositionAllowedFn?: IsPositionAllowedFn;
    ignoredChars?: CharId[];
}
export declare class FollowMovement implements Movement {
    private character;
    private gridTilemap;
    private charToFollow;
    private targetMovement?;
    private options;
    constructor(character: GridCharacter, gridTilemap: GridTilemap, charToFollow: GridCharacter, options?: Options);
    update(delta: number): void;
    getInfo(): MovementInfo;
    private getFacingPos;
    private updateTarget;
}
