import { Tile } from "../Tilemap.js";
import { RawTiledTileset } from "./TiledMap.js";
export declare class TiledTile implements Tile {
    private props;
    constructor(tilesets: RawTiledTileset[], tileId: number);
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
}
