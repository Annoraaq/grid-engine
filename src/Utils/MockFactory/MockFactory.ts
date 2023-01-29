import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { NumberOfDirections } from "../../GridEngine";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { Vector2 } from "../Vector2/Vector2";
import { Random, MersenneTwister19937 } from "random-js";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import {
  Orientation,
  Tile,
  TileLayer,
  Tilemap,
} from "../../GridTilemap/Tilemap";

export const LOWER_CHAR_LAYER = "lowerCharLayer";
export const HIGHER_CHAR_LAYER = "testCharLayer";
export const COLLISION_GROUP = "testCollisionGroup";

export class MockTile implements Tile {
  constructor(private properties: Record<string, string> = {}) {}
  getProperties(): Record<string, string> {
    return this.properties;
  }
}

export class MockTilemap implements Tilemap {
  constructor(
    private layers: TileLayer[] = [],
    private orientation: Orientation = "orthogonal"
  ) {}

  getTileWidth(): number {
    return 10;
  }
  getTileHeight(): number {
    return 10;
  }
  getWidth(): number {
    return 20;
  }
  getHeight(): number {
    return 20;
  }
  getOrientation(): Orientation {
    return this.orientation;
  }
  getLayers(): TileLayer[] {
    return this.layers;
  }
  hasTileAt(x: number, y: number, layer?: string): boolean {
    const l = this.layers.find((l) => l.getName() === layer);
    return !!l?.getData()[y]?.[x];
  }
  getTileAt(x: number, y: number, layer?: string): Tile | undefined {
    const l = this.layers.find((l) => l.getName() === layer);
    return l?.getData()[y]?.[x];
  }
  copyLayer(layer: TileLayer, newName: string, row: number): TileLayer {
    return new MockTileLayer();
  }
}

class MockTileLayer implements TileLayer {
  private depth = 0;
  constructor(
    private name: string = "tileLayerName",
    private properties: Record<string, string> = {},
    private height: number = 5,
    private width: number = 5,
    private scale: number = 1,
    private tilesets: string[] = [],
    private data: Tile[][] = [[]]
  ) {}
  getProperties(): Record<string, string> {
    return this.properties;
  }
  getName(): string {
    return this.name;
  }
  getHeight(): number {
    return this.height;
  }
  getWidth(): number {
    return this.width;
  }
  getScale(): number {
    return this.scale;
  }

  setScale(scale: number): void {
    this.scale = scale;
  }
  setDepth(depth: number): void {
    this.depth = depth;
  }
  getDepth(): number {
    return this.depth;
  }
  destroy(): void {}
  getTilesets(): string[] {
    return this.tilesets;
  }
  putTileAt(tile: number, x: number, y: number): void {}
  getData(): Tile[][] {
    return this.data;
  }
}

export function createSpriteMock() {
  return {
    x: 10,
    y: 12,
    displayWidth: 20,
    displayHeight: 40,
    width: 20,
    height: 20,
    setOrigin: jest.fn(),
    texture: {
      source: [{ width: 240 }],
    },
    setFrame: jest.fn(function (name) {
      this.frame.name = name;
    }),
    setDepth: jest.fn(),
    scale: 2,
    frame: {
      name: "1",
    },
  } as any;
}

export function createBlankLayerMock() {
  return {
    scale: 0,
    putTileAt: jest.fn(),
    setDepth: jest.fn(),
  };
}

export function createTilemapMock(blankLayerMock?) {
  if (!blankLayerMock) {
    blankLayerMock = createBlankLayerMock();
  }
  const layerData1 = createMockLayerData({
    name: "Layer 1",
    tilemapLayer: {
      setDepth: jest.fn(),
      scale: 3,
      tileset: "Cloud City",
    },
    properties: [
      {
        name: "ge_charLayer",
        value: LOWER_CHAR_LAYER,
      },
    ],
  });
  const layerData2 = createMockLayerData({
    name: "Layer 2",
    tilemapLayer: {
      setDepth: jest.fn(),
      scale: 3,
      tileset: "Cloud City",
    },
    properties: [
      {
        name: "ge_charLayer",
        value: HIGHER_CHAR_LAYER,
      },
    ],
  });
  return {
    layers: [layerData1, layerData2],
    tileWidth: 16,
    tileHeight: 16,
    width: 20,
    height: 30,
    getTileAt: jest.fn().mockReturnValue({}),
    hasTileAt: jest.fn().mockReturnValue(true),
    createBlankLayer: jest
      .fn()
      .mockReturnValue(createMockLayerData(blankLayerMock)),
  };
}

export function createMockLayerData(layerData: any): any {
  const tilemapLayer = {
    ...layerData.tilemapLayer,
    layer: {},
  };
  const newLayerData = {
    ...layerData,
    tilemapLayer,
  };
  tilemapLayer.layer = newLayerData;
  return newLayerData;
}

export function createMockLayer(layerData: any): TileLayer {
  return new MockTileLayer(
    layerData.name,
    layerData.properties,
    layerData.height,
    layerData.width,
    layerData.scale,
    layerData.tilesets,
    layerData.data
  );
}

export function layerPos(vec: Vector2, layer?: string): LayerVecPos {
  return {
    position: vec,
    layer: layer ?? LOWER_CHAR_LAYER,
  };
}

export function mockCharMap(
  tilemapMock: any, // TODO: replace when we have a Tilemap interface
  gridTilemap: GridTilemap,
  blockMap: string[]
) {
  tilemapMock.height = blockMap.length;
  tilemapMock.width = blockMap[0].length;
  let charCounter = 0;
  for (let row = 0; row < blockMap.length; row++) {
    for (let col = 0; col < blockMap[row].length; col++) {
      if (blockMap[row][col] === "c") {
        const gridCharacter = new GridCharacter(`mock_char_${charCounter}`, {
          tilemap: gridTilemap,
          speed: 3,
          collidesWithTiles: true,
          numberOfDirections: NumberOfDirections.FOUR,
          collisionGroups: [COLLISION_GROUP],
        });
        gridCharacter.setTilePosition({
          position: new Vector2(col, row),
          layer: LOWER_CHAR_LAYER,
        });
        gridTilemap.addCharacter(gridCharacter);
        charCounter++;
      }
    }
  }

  mockBlockMap(tilemapMock, blockMap);
}

export function mockRandomMap(
  tilemapMock: any,
  width: number,
  height: number,
  density = 0.1,
  seed = 12345
) {
  tilemapMock.width = width;
  tilemapMock.height = height;
  const random = new Random(MersenneTwister19937.seedWithArray([seed]));

  const map: string[] = [];
  for (let row = 0; row < height; row++) {
    const rowStr: string[] = [];
    for (let col = 0; col < height; col++) {
      const c = random.integer(0, 100) / 100 <= density ? "#" : ".";
      rowStr.push(c);
    }
    map[row] = rowStr.join("");
  }
  mockBlockMap(tilemapMock, map);
}

function getBlockingProps(char: string): Record<string, string> {
  switch (char) {
    case "#":
      return {
        ge_collide: "true",
      };
    case "→":
      return {
        ge_collide_up: "true",
        ge_collide_right: "true",
        ge_collide_down: "true",
      };
    case "←":
      return {
        ge_collide_up: "true",
        ge_collide_down: "true",
        ge_collide_left: "true",
      };
    case "↑":
      return {
        ge_collide_up: "true",
        ge_collide_right: "true",
        ge_collide_left: "true",
      };
    case "↓":
      return {
        ge_collide_right: "true",
        ge_collide_down: "true",
        ge_collide_left: "true",
      };
  }
  return {};
}

export function mockBlockMapNew(
  blockMap: string[],
  charLayer?: string,
  isometric?: boolean
): Tilemap {
  const data: Tile[][] = [];
  for (let r = 0; r < blockMap.length; r++) {
    const row: Tile[] = [];
    for (let c = 0; c < blockMap[r].length; c++) {
      row.push(new MockTile(getBlockingProps(blockMap[r][c])));
    }
    data.push(row);
  }
  const layer = new MockTileLayer(
    "default",
    charLayer ? { ge_charLayer: charLayer } : {},
    blockMap.length,
    blockMap[0].length,
    1,
    [],
    data
  );
  return new MockTilemap([layer], isometric ? "isometric" : "orthogonal");
}

export function mockBlockMap(
  tilemapMock: any, // TODO: replace when we have a Tilemap interface
  blockMap: string[]
) {
  tilemapMock.hasTileAt.mockImplementation((x, y, _layerName) => {
    if (x < 0 || x >= blockMap[0].length) return false;
    if (y < 0 || y >= blockMap.length) return false;
    return true;
  });

  tilemapMock.getTileAt.mockImplementation((x, y, _layerName) => {
    if (x < 0 || x >= blockMap[0].length) return undefined;
    if (y < 0 || y >= blockMap.length) return undefined;
    switch (blockMap[y][x]) {
      case "#":
        return {
          properties: {
            ge_collides: true,
          },
        };
      case "→":
        return {
          properties: {
            ge_collide_up: true,
            ge_collide_right: true,
            ge_collide_down: true,
          },
        };
      case "←":
        return {
          properties: {
            ge_collide_up: true,
            ge_collide_down: true,
            ge_collide_left: true,
          },
        };
      case "↑":
        return {
          properties: {
            ge_collide_up: true,
            ge_collide_right: true,
            ge_collide_left: true,
          },
        };
      case "↓":
        return {
          properties: {
            ge_collide_right: true,
            ge_collide_down: true,
            ge_collide_left: true,
          },
        };
    }
    return {};
  });
}
export function mockLayeredMap(
  tilemapMock: any, // TODO: replace when we have a Tilemap interface
  blockMap: Map<string, string[]>
) {
  tilemapMock.hasTileAt.mockImplementation((x, y, layerName) => {
    const layer = blockMap.get(layerName);
    console.warn("habe layer", layer);
    if (!layer) return false;
    if (x < 0 || x >= layer[0].length) return false;
    if (y < 0 || y >= layer.length) return false;
    return layer[y][x] != "#";
  });
}

export function createPhaserTilemapLayerStub(
  name?: string
): Phaser.Tilemaps.TilemapLayer {
  const layer = {
    depth: 0,
    setDepth(d: number): Phaser.Tilemaps.TilemapLayer {
      this.depth = d;
      return this;
    },
    scale: 3,
    tileset: [createPhaserTilesetStub("Cloud City")],
  } as Phaser.Tilemaps.TilemapLayer;
  layer.layer = createPhaserTilemapLayerDataStub(layer, name, []);
  return layer;
}

function createPhaserTilemapLayerDataStub(
  tilemapLayer: Phaser.Tilemaps.TilemapLayer,
  name: string | undefined,
  properties: Array<{ name: string; value: string }>
): Phaser.Tilemaps.LayerData {
  return {
    name: name,
    tilemapLayer,
    properties: [
      ...properties,
      {
        name: "ge_charLayer",
        value: name,
      },
    ],
  } as Phaser.Tilemaps.LayerData;
}

function createPhaserTilesetStub(name: string): Phaser.Tilemaps.Tileset {
  return { name } as Phaser.Tilemaps.Tileset;
}

export function createPhaserTilemapStub(
  blockMap: Map<string | undefined, string[]>
): Phaser.Tilemaps.Tilemap {
  const layers: Phaser.Tilemaps.TilemapLayer[] = [];
  for (const [layerName, allRows] of blockMap.entries()) {
    const layer = createPhaserTilemapLayerStub(layerName);
    layer.layer.data = allRows.map((r) => {
      return [...r].map((c) => {
        if (c === "#") {
          return {
            properties: {
              ge_collide: "true",
            },
          } as Phaser.Tilemaps.Tile;
        }

        return {} as Phaser.Tilemaps.Tile;
      });
    });
    layers.push(layer);
  }

  const tilemap: Phaser.Tilemaps.Tilemap = {
    orientation: Phaser.Tilemaps.Orientation.ORTHOGONAL.toString(),
    layers: layers.map((l) => l.layer),
    hasTileAt(tileX: number, tileY: number, layer?: string) {
      const l = layers.find((l) => l.layer.name === layer);
      if (!l) return false;
      const row = l.layer.data[tileY];
      if (!row) return false;
      return !!l.layer.data[tileY][tileX];
    },
    getTileAt(tileX: number, tileY: number, nonNull?: boolean, layer?: string) {
      const l = layers.find((l) => l.layer.name === layer);
      if (!l) return undefined;
      const row = l.layer.data[tileY];
      if (!row) return undefined;
      return l.layer.data[tileY][tileX];
    },

    createBlankLayer(
      name,
      tileset,
      x,
      y,
      width,
      height,
      tileWidth,
      tileHeight
    ) {
      return {} as Phaser.Tilemaps.TilemapLayer;
    },

    getLayer(layer?: string | number | Phaser.Tilemaps.TilemapLayer) {
      return layers.find((l) => l.name == layer);
    },
  } as unknown as Phaser.Tilemaps.Tilemap;

  return tilemap;
}

export function createAllowedFn(map: string[]) {
  return ({ x, y }, _charLayer) => {
    if (x < 0 || x >= map[0].length) return false;
    if (y < 0 || y >= map.length) return false;
    return map[y][x] != "#";
  };
}
