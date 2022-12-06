/// <reference types="jest" />
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { Vector2 } from "../Vector2/Vector2";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
export declare const LOWER_CHAR_LAYER = "lowerCharLayer";
export declare const HIGHER_CHAR_LAYER = "testCharLayer";
export declare const COLLISION_GROUP = "testCollisionGroup";
export declare function createSpriteMock(): any;
export declare function createBlankLayerMock(): {
    scale: number;
    putTileAt: jest.Mock<any, any>;
    setDepth: jest.Mock<any, any>;
};
export declare function createTilemapMock(blankLayerMock?: any): {
    layers: {
        name: string;
        tilemapLayer: {
            setDepth: jest.Mock<any, any>;
            scale: number;
            tileset: string;
        };
        properties: {
            name: string;
            value: string;
        }[];
    }[];
    tileWidth: number;
    tileHeight: number;
    width: number;
    height: number;
    getTileAt: jest.Mock<any, any>;
    hasTileAt: jest.Mock<any, any>;
    createBlankLayer: jest.Mock<any, any>;
};
export declare function layerPos(vec: Vector2, layer?: string): LayerVecPos;
export declare function mockCharMap(tilemapMock: any, // TODO: replace when we have a Tilemap interface
gridTilemap: GridTilemap, blockMap: string[]): void;
export declare function mockRandomMap(tilemapMock: any, width: number, height: number, density?: number, seed?: number): void;
export declare function mockBlockMap(tilemapMock: any, // TODO: replace when we have a Tilemap interface
blockMap: string[]): void;
export declare function mockLayeredMap(tilemapMock: any, // TODO: replace when we have a Tilemap interface
blockMap: Map<string, string[]>): void;
export declare function createAllowedFn(map: string[]): ({ x, y }: {
    x: any;
    y: any;
}, _charLayer: any) => boolean;
