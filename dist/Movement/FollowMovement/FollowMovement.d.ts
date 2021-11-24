import { NumberOfDirections } from "./../../Direction/Direction";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
export declare class FollowMovement implements Movement {
    private character;
    private gridTilemap;
    private charToFollow;
    private numberOfDirections;
    private distance;
    private noPathFoundStrategy;
    private targetMovement;
    constructor(character: GridCharacter, gridTilemap: GridTilemap, charToFollow: GridCharacter, numberOfDirections?: NumberOfDirections, distance?: number, noPathFoundStrategy?: NoPathFoundStrategy);
    update(delta: number): void;
    private updateTarget;
}
