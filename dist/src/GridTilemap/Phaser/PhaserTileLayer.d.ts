import { TileLayer, Tile } from "../Tilemap";
import { TiledProject } from "./PhaserTilemap";
export declare class PhaserTileLayer implements TileLayer {
    private phaserTilemapLayer;
    private tiledProject?;
    constructor(phaserTilemapLayer: Phaser.Tilemaps.TilemapLayer, tiledProject?: TiledProject | undefined);
    getName(): string;
    getProperty(name: string): string | undefined;
    hasProperty(name: string): boolean;
    isCharLayer(): boolean;
    getData(): Tile[][];
}
