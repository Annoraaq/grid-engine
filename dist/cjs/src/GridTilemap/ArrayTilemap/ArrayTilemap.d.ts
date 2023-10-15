import { Orientation, Tile, TileLayer, Tilemap } from "../Tilemap.js";
/**
 * Represents a layer for a simple array tilemap.
 */
export interface ArrayTilemapInputLayer {
    /**
     * Actual tilemap data.
     * 0 => unblocked
     * 1 => blocked
     */
    data: number[][];
    isCharLayer?: boolean;
}
type LayerName = string;
/**
 * Very simple tilemap implementation. Can be used as a base for creating your
 * own customized tilemap or for simple use cases or testing.
 */
export declare class ArrayTilemap implements Tilemap {
    private map;
    private orientation;
    private layerMap;
    private layers;
    constructor(map: Record<LayerName, ArrayTilemapInputLayer>, orientation?: Orientation, collisionPropertyName?: string);
    getWidth(): number;
    getHeight(): number;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    hasTileAt(x: number, y: number, layer?: string): boolean;
    getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
export {};
