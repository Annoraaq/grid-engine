import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { Vector2 } from "../Vector2/Vector2.js";
import { TileLayer, Tile, Tilemap } from "../../GridTilemap/Tilemap.js";
import { LayerVecPos } from "../LayerPositionUtils/LayerPositionUtils.js";
export interface LayerData {
    name?: string;
    properties?: Record<string, string>;
    height?: number;
    width?: number;
    scale?: number;
    tilesets?: string[];
    data?: Array<Array<Tile | undefined>>;
}
export interface TileCost {
    ge_cost?: number;
    ge_cost_left?: number;
    ge_cost_right?: number;
    ge_cost_up?: number;
    ge_cost_down?: number;
    "ge_cost_down-left"?: number;
    "ge_cost_down-right"?: number;
    "ge_cost_up-left"?: number;
    "ge_cost_up-right"?: number;
}
export declare const LOWER_CHAR_LAYER = "lowerCharLayer";
export declare const HIGHER_CHAR_LAYER = "testCharLayer";
export declare const COLLISION_GROUP = "testCollisionGroup";
export type CostMap = Array<Array<TileCost | number>>;
export interface CostMapLayer {
    layer: string | undefined;
    costMap: CostMap;
}
export declare function createSpriteMock(): Phaser.GameObjects.Sprite;
export declare function createContainerMock(x?: number, y?: number, height?: number): Phaser.GameObjects.Container;
export declare function createMockLayer(layerData: LayerData): TileLayer;
export declare function layerPos(vec: Vector2, layer?: string): LayerVecPos;
export declare function mockCharMap(gridTilemap: GridTilemap, blockMaps: Array<{
    layer: string | undefined;
    blockMap: string[];
}>): void;
export declare function mockRandomMap(layer: string | undefined, width: number, height: number, density?: number, seed?: number): Tilemap;
export declare function getBlockingProps(char: string): Record<string, boolean>;
export declare function mockBlockMap(blockMap: string[], charLayer?: string, isometric?: boolean, costMap?: Array<Array<number | TileCost>>): Tilemap;
export declare function mockLayeredBlockMap(blockMaps: Array<{
    layer: string | undefined;
    blockMap: string[];
    isCharLayer?: boolean;
    charLayerName?: string;
}>, isometric?: boolean, costMaps?: CostMapLayer[]): Tilemap;
export declare function tileCostProps(costMap: CostMapLayer, r: number, c: number): Record<string, number>;
export declare function createAllowedFn(map: string[], ignoreBounds?: boolean): ({ x, y }: {
    x: any;
    y: any;
}, _charLayer: any) => boolean;
export declare function updateLayer(tilemapMock: any, blockMap: string[], layer?: string): void;
