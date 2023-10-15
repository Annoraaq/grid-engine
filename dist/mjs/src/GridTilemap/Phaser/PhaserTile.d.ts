import { Tile } from "../Tilemap.js";
import { TiledProject } from "./PhaserTilemap.js";
export declare class PhaserTile implements Tile {
    private phaserTile;
    private tiledProject?;
    constructor(phaserTile: Phaser.Tilemaps.Tile, tiledProject?: TiledProject | undefined);
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
    private getType;
}
