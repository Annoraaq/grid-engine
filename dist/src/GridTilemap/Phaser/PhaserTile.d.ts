import { Tile } from "../Tilemap";
import { TiledProject } from "./PhaserTilemap";
export declare class PhaserTile implements Tile {
    private phaserTile;
    private tiledProject?;
    constructor(phaserTile: Phaser.Tilemaps.Tile, tiledProject?: TiledProject | undefined);
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
    private getType;
}
