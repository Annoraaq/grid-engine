import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Movement } from "../Movement";
export declare class FollowMovement implements Movement {
    private gridTilemap;
    private charToFollow;
    private distance;
    private closestPointIfBlocked;
    private character;
    constructor(gridTilemap: GridTilemap, charToFollow: GridCharacter, distance?: number, closestPointIfBlocked?: boolean);
    setCharacter(character: GridCharacter): void;
    update(): void;
}
