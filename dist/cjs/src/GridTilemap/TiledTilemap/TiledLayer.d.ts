import { Tile, TileLayer } from "../Tilemap.js";
import { RawTiledLayer, RawTiledTileset } from "./TiledMap.js";
export declare class TiledLayer implements TileLayer {
    private layer;
    private data;
    constructor(tilesets: RawTiledTileset[], layer: RawTiledLayer);
    getName(): string | undefined;
    getProperty(name: string): string | undefined;
    hasProperty(name: string): boolean;
    getData(): Array<Array<Tile | undefined>>;
    isCharLayer(): boolean;
}
