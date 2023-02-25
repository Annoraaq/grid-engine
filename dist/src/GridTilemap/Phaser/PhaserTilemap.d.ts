import { TileLayer, Orientation, Tile, Tilemap } from "../Tilemap";
export declare class PhaserTilemap implements Tilemap {
    private phaserTilemap;
    constructor(phaserTilemap: Phaser.Tilemaps.Tilemap);
    getTileWidth(): number;
    getTileHeight(): number;
    getWidth(): number;
    getHeight(): number;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    hasTileAt(x: number, y: number, layer?: string): boolean;
    getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
