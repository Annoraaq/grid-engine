import { NumberOfDirections } from "./../../Direction/Direction";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
import { NoPathFoundStrategy } from "../../Algorithms/ShortestPath/NoPathFoundStrategy";
export declare class FollowMovement implements Movement {
    private gridTilemap;
    private charToFollow;
    private distance;
    private noPathFoundStrategy;
    private character;
    private numberOfDirections;
    private targetMovement;
    constructor(gridTilemap: GridTilemap, charToFollow: GridCharacter, distance?: number, noPathFoundStrategy?: NoPathFoundStrategy);
    setNumberOfDirections(numberOfDirections: NumberOfDirections): void;
    setCharacter(character: GridCharacter): void;
    update(elapsed: number): void;
    private updateTarget;
}
