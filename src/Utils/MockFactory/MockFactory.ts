import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { NumberOfDirections } from "../../GridEngine";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { Vector2 } from "../Vector2/Vector2";
import { Random, MersenneTwister19937 } from "random-js";
import { LayerVecPos } from "../../Pathfinding/ShortestPathAlgorithm";
import { CharTileLayer, Tile, Tilemap } from "../../GridTilemap/Tilemap";
import { MockTile, MockTileLayer, MockTilemap } from "./MockTilemap";

export const LOWER_CHAR_LAYER = "lowerCharLayer";
export const HIGHER_CHAR_LAYER = "testCharLayer";
export const COLLISION_GROUP = "testCollisionGroup";

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

export function createMockLayer(layerData: any): CharTileLayer {
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

export function mockCharMapNew(
  gridTilemap: GridTilemap,
  blockMaps: Array<{ layer: string | undefined; blockMap: string[] }>
): void {
  let charCounter = 0;
  for (const bm of blockMaps) {
    for (let row = 0; row < bm.blockMap.length; row++) {
      for (let col = 0; col < bm.blockMap[row].length; col++) {
        if (bm.blockMap[row][col] === "c") {
          const gridCharacter = new GridCharacter(`mock_char_${charCounter}`, {
            tilemap: gridTilemap,
            speed: 3,
            collidesWithTiles: true,
            numberOfDirections: NumberOfDirections.FOUR,
            collisionGroups: [COLLISION_GROUP],
          });
          gridCharacter.setTilePosition({
            position: new Vector2(col, row),
            layer: bm.layer,
          });
          gridTilemap.addCharacter(gridCharacter);
          charCounter++;
        }
      }
    }
  }
}

export function mockRandomMap(
  layer: string | undefined,
  width: number,
  height: number,
  density = 0.1,
  seed = 12345
) {
  const random = new Random(MersenneTwister19937.seedWithArray([seed]));

  const map: string[] = [];
  for (let row = 0; row < height; row++) {
    const rowStr: string[] = [];
    for (let col = 0; col < width; col++) {
      const c = random.integer(0, 100) / 100 <= density ? "#" : ".";
      rowStr.push(c);
    }
    map[row] = rowStr.join("");
  }
  return mockLayeredBlockMapNew([{ layer, blockMap: map }]);
}

export function getBlockingProps(char: string): Record<string, string> {
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
  return mockLayeredBlockMapNew([{ layer: charLayer, blockMap }], isometric);
}

export function mockLayeredBlockMapNew(
  blockMaps: Array<{ layer: string | undefined; blockMap: string[] }>,
  isometric?: boolean
): Tilemap {
  const layers: MockTileLayer[] = [];
  for (const bm of blockMaps) {
    const data: Array<Array<Tile | undefined>> = [];
    for (let r = 0; r < bm.blockMap.length; r++) {
      const row: Array<Tile | undefined> = [];
      for (let c = 0; c < bm.blockMap[r].length; c++) {
        if (bm.blockMap[r][c] == "_") {
          row.push(undefined);
        } else {
          row.push(new MockTile(getBlockingProps(bm.blockMap[r][c])));
        }
      }
      data.push(row);
    }
    const layer = new MockTileLayer(
      bm.layer,
      bm.layer ? { ge_charLayer: bm.layer } : {},
      bm.blockMap.length,
      bm.blockMap[0].length,
      1,
      [],
      data
    );
    layers.push(layer);
  }
  return new MockTilemap(layers, isometric ? "isometric" : "orthogonal");
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
    if (!layer) return false;
    if (x < 0 || x >= layer[0].length) return false;
    if (y < 0 || y >= layer.length) return false;
    return layer[y][x] != "#";
  });
}

export function createAllowedFn(map: string[]) {
  return ({ x, y }, _charLayer) => {
    if (x < 0 || x >= map[0].length) return false;
    if (y < 0 || y >= map.length) return false;
    return map[y][x] != "#";
  };
}
