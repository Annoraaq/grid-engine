import { Tile } from "../Tilemap";
export declare class PhaserTile implements Tile {
    private phaserTile;
    constructor(phaserTile: Phaser.Tilemaps.Tile);
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
}
