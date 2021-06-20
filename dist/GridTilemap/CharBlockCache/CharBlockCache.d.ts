import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Vector2 } from "../../Utils/Vector2/Vector2";
export declare class CharBlockCache {
    private tilePosToCharacters;
    private positionChangedSubs;
    private positionChangeFinishedSubs;
    isCharBlockingAt(pos: Vector2): boolean;
    addCharacter(character: GridCharacter): void;
    removeCharacter(character: GridCharacter): void;
    private add;
    private addPositionChangeSub;
    private addPositionChangeFinishedSub;
    private posToString;
}
