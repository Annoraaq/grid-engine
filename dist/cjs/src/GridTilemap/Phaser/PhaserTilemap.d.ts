import { TileLayer, Orientation, Tile, Tilemap } from "../Tilemap.js";
export interface TiledProject {
    propertyTypes: Array<{
        name: string;
        type: string;
        members: Array<{
            name: string;
            type: string;
            propertyType?: string;
            value: any;
        }>;
    }>;
}
export declare class PhaserTilemap implements Tilemap {
    private phaserTilemap;
    private tiledProject?;
    constructor(phaserTilemap: Phaser.Tilemaps.Tilemap, tiledProject?: TiledProject | undefined);
    getTileWidth(): number;
    getTileHeight(): number;
    getWidth(): number;
    getHeight(): number;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    hasTileAt(x: number, y: number, layer?: string): boolean;
    getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
