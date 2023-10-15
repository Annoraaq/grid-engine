import { Orientation, Tile, TileLayer, Tilemap } from "../Tilemap.js";
export declare const CHAR_LAYER_PROP_NAME = "ge_charLayer";
/**
 * Simple implementation of the Tilemap interface, using a parsed version of a
 * Tiled tilemap.
 *
 * Example usage:
 * `new TiledTilemap(JSON.parse(tiledTilemapAsString))`
 */
export declare class TiledTilemap implements Tilemap {
    private rawTilemap;
    private layers;
    constructor(rawTilemap: any);
    hasTileAt(x: number, y: number, layer: string): boolean;
    getTileAt(x: number, y: number, layer: string): Tile | undefined;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    getWidth(): number;
    getHeight(): number;
}
