import { Tile } from "../Tilemap";
import { RawTiledTileset } from "./TiledMap";
export declare class TiledTile implements Tile {
    private props;
    constructor(tilesets: RawTiledTileset[], tileId: number);
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
}
