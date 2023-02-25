import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { Vector2 } from "../Vector2/Vector2";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import { TileLayer, Tilemap } from "../../GridTilemap/Tilemap";
export declare const LOWER_CHAR_LAYER = "lowerCharLayer";
export declare const HIGHER_CHAR_LAYER = "testCharLayer";
export declare const COLLISION_GROUP = "testCollisionGroup";
export declare function createSpriteMock(): any;
export declare function createMockLayer(layerData: any): TileLayer;
export declare function layerPos(vec: Vector2, layer?: string): LayerVecPos;
export declare function mockCharMap(gridTilemap: GridTilemap, blockMaps: Array<{
    layer: string | undefined;
    blockMap: string[];
}>): void;
export declare function mockRandomMap(layer: string | undefined, width: number, height: number, density?: number, seed?: number): Tilemap;
export declare function getBlockingProps(char: string): Record<string, string>;
export declare function mockBlockMap(blockMap: string[], charLayer?: string, isometric?: boolean): Tilemap;
export declare function mockLayeredBlockMap(blockMaps: Array<{
    layer: string | undefined;
    blockMap: string[];
    isCharLayer?: boolean;
}>, isometric?: boolean): Tilemap;
export declare function createAllowedFn(map: string[]): ({ x, y }: {
    x: any;
    y: any;
}, _charLayer: any) => boolean;
