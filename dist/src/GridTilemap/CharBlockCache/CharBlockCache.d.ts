import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { CharLayer } from "../../GridEngine";
import { Vector2 } from "../../Utils/Vector2/Vector2";
export declare class CharBlockCache {
    private tilePosToCharacters;
    private charRemoved$;
    isCharBlockingAt(pos: Vector2, layer: CharLayer, collisionGroups: string[], exclude?: Set<string>): boolean;
    getCharactersAt(pos: Vector2, layer: string): Set<GridCharacter>;
    addCharacter(character: GridCharacter): void;
    removeCharacter(character: GridCharacter): void;
    private add;
    private addTilePosSetSub;
    private charRemoved;
    private addPositionChangeSub;
    private addPositionChangeFinishedSub;
    private addTilePositions;
    private deleteTilePositions;
    private forEachCharTile;
    private posChangeToLayerPos;
    private posToString;
}
