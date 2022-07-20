/// <reference types="jest" />
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
