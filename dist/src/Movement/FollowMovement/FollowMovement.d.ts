import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement, MovementInfo } from "../Movement";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
export declare class FollowMovement implements Movement {
    private character;
    private gridTilemap;
    private charToFollow;
    private distance;
    private noPathFoundStrategy;
    private targetMovement?;
    constructor(character: GridCharacter, gridTilemap: GridTilemap, charToFollow: GridCharacter, distance?: number, noPathFoundStrategy?: NoPathFoundStrategy);
    update(delta: number): void;
    getInfo(): MovementInfo;
    private updateTarget;
}
