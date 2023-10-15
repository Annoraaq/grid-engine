import { Tilemap, Orientation, TileLayer, Tile } from "../src/GridEngine";
export declare class RoomsTilemap implements Tilemap {
    private height;
    private width;
    private layers;
    private layersByName;
    constructor(path: string | string[]);
    private addLayer;
    getWidth(): number;
    getHeight(): number;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    hasTileAt(x: number, y: number, layer?: string): boolean;
    getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
