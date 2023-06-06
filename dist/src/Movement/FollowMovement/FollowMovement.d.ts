import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement, MovementInfo } from "../Movement";
import { ShortestPathAlgorithmType } from "../../GridEngine";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
export interface Options {
    distance?: number;
    noPathFoundStrategy?: NoPathFoundStrategy;
    maxPathLength?: number;
    shortestPathAlgorithm?: ShortestPathAlgorithmType;
    ignoreLayers?: boolean;
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
    private updateTarget;
}
