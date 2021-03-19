import { GridTilemap } from "../GridTilemap/GridTilemap";
import { GridCharacter } from "../GridCharacter/GridCharacter";
export declare class FollowMovement {
    private targetMovement;
    private characters;
    constructor(gridTilemap: GridTilemap);
    addCharacter(character: GridCharacter, charToFollow: GridCharacter, distance?: number, closestPointIfBlocked?: boolean): void;
    removeCharacter(charId: string): void;
    update(): void;
}
