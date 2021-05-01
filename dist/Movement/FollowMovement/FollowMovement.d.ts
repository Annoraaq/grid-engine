import { NumberOfDirections } from "./../../Direction/Direction";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
export declare class FollowMovement implements Movement {
    private gridTilemap;
    private charToFollow;
    private distance;
    private closestPointIfBlocked;
    private character;
    private numberOfDirections;
    constructor(gridTilemap: GridTilemap, charToFollow: GridCharacter, distance?: number, closestPointIfBlocked?: boolean);
    setNumberOfDirections(numberOfDirections: NumberOfDirections): void;
    setCharacter(character: GridCharacter): void;
    update(): void;
}
