import { TileLayer, Tile } from "../Tilemap";
export declare class PhaserTileLayer implements TileLayer {
    private phaserTilemapLayer;
    constructor(phaserTilemapLayer: Phaser.Tilemaps.TilemapLayer);
    getName(): string;
    getProperty(name: string): string | undefined;
    hasProperty(name: string): boolean;
    isCharLayer(): boolean;
    getData(): Tile[][];
}
