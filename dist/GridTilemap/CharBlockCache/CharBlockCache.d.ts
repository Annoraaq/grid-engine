import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Vector2 } from "../../Utils/Vector2/Vector2";
export declare class CharBlockCache {
    private tilePosToCharacters;
    private positionChangeStartedSubs;
    private tilePosSetSubs;
    private positionChangeFinishedSubs;
    isCharBlockingAt(pos: Vector2, layer: string, collisionGroups: string[]): boolean;
    addCharacter(character: GridCharacter): void;
    removeCharacter(character: GridCharacter): void;
    private add;
    private addTilePosSetSub;
    private addPositionChangeSub;
    private addPositionChangeFinishedSub;
    private posToString;
}
