import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "../GridCharacter/GridCharacter";
import { Vector2 } from "../Utils/Vector2/Vector2";
export declare class GridTilemap {
    private tilemap;
    private firstLayerAboveChar?;
    private static readonly MAX_PLAYER_LAYERS;
    static readonly FIRST_PLAYER_LAYER = 1000;
    private static readonly ALWAYS_TOP_PROP_NAME;
    private static readonly HEIGHT_SHIFT_PROP_NAME;
    private static readonly ONE_WAY_COLLIDE_PROP_PREFIX;
    private characters;
    private charBlockCache;
    constructor(tilemap: Phaser.Tilemaps.Tilemap, firstLayerAboveChar?: number);
    addCharacter(character: GridCharacter): void;
    removeCharacter(charId: string): void;
    getCharacters(): GridCharacter[];
    isBlocking(pos: Vector2, direction?: Direction): boolean;
    hasBlockingTile(pos: Vector2, direction?: Direction): boolean;
    hasNoTile(pos: Vector2): boolean;
    hasBlockingChar(pos: Vector2): boolean;
    getTileWidth(): number;
    getTileHeight(): number;
    private getLayerProp;
    private hasLayerProp;
    private isLayerAlwaysOnTop;
    private setLayerDepths;
    private createLayerForEachRow;
}
