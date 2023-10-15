import { TileLayer, Orientation, Tile, Tilemap } from "../../GridTilemap/Tilemap.js";
export declare class MockTile implements Tile {
    private properties;
    constructor(properties?: Record<string, any>);
    getProperty(name: string): any;
    hasProperty(name: string): boolean;
}
export declare class MockTilemap implements Tilemap {
    private layers;
    private orientation;
    constructor(layers?: TileLayer[], orientation?: Orientation);
    getTileWidth(): number;
    getTileHeight(): number;
    getWidth(): number;
    getHeight(): number;
    getOrientation(): Orientation;
    getLayers(): TileLayer[];
    hasTileAt(x: number, y: number, layer?: string): boolean;
    getTileAt(x: number, y: number, layer?: string): Tile | undefined;
}
export declare class MockTileLayer implements TileLayer {
    private name;
    private properties;
    private height;
    private width;
    private scale;
    private tilesets;
    private data;
    private depth;
    constructor(name: string | undefined, properties?: Record<string, string>, height?: number, width?: number, scale?: number, tilesets?: string[], data?: Array<Array<Tile | undefined>>);
    getProperty(name: string): string | undefined;
    hasProperty(name: string): boolean;
    getProperties(): Record<string, string>;
    isCharLayer(): boolean;
    getName(): string | undefined;
    getHeight(): number;
    getWidth(): number;
    getScale(): number;
    setScale(scale: number): void;
    setDepth(depth: number): void;
    getDepth(): number;
    destroy(): void;
    getTilesets(): string[];
    putTileAt(_tile: number, _x: number, _y: number): void;
    getData(): Array<Array<Tile | undefined>>;
}
