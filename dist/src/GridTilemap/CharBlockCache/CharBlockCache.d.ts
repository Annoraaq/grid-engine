import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { LayerName } from "../GridTilemap";
export declare class CharBlockCache {
    private tilePosToCharacters;
    private positionChangeStartedSubs;
    private tilePosSetSubs;
    private positionChangeFinishedSubs;
    isCharBlockingAt(pos: Vector2, layer: LayerName, collisionGroups: string[]): boolean;
    getCharactersAt(pos: Vector2, layer: string): Set<GridCharacter>;
    addCharacter(character: GridCharacter): void;
    removeCharacter(character: GridCharacter): void;
    private add;
    private addTilePosSetSub;
    private addPositionChangeSub;
    private addPositionChangeFinishedSub;
    private posToString;
}
