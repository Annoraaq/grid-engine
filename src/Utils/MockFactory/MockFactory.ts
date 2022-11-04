import { GridCharacter } from "../../GridCharacter/GridCharacter";
import { NumberOfDirections } from "../../GridEngine";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import { LayerPosition } from "../../Pathfinding/ShortestPathAlgorithm";
import { Vector2 } from "../Vector2/Vector2";

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

export function createTilemapMock(blankLayerMock?) {
  if (!blankLayerMock) {
    blankLayerMock = createBlankLayerMock();
  }
  return {
    layers: [
      {
        name: "layer1",
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
      },
      {
        name: "layer2",
        tilemapLayer: {
          setDepth: jest.fn(),
          tileset: "Cloud City",
          scale: 3,
        },
        properties: [
          {
            name: "ge_charLayer",
            value: HIGHER_CHAR_LAYER,
          },
        ],
      },
    ],
    tileWidth: 16,
    tileHeight: 16,
    width: 20,
    height: 30,
    getTileAt: jest.fn().mockReturnValue({}),
    hasTileAt: jest.fn().mockReturnValue(true),
    createBlankLayer: jest.fn().mockReturnValue(blankLayerMock),
  };
}

export function layerPos(vec: Vector2, layer?: string): LayerPosition {
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

export function mockBlockMap(
  tilemapMock: any, // TODO: replace when we have a Tilemap interface
  blockMap: string[]
) {
  tilemapMock.hasTileAt.mockImplementation((x, y, _layerName) => {
    if (x < 0 || x >= blockMap[0].length) return false;
    if (y < 0 || y >= blockMap.length) return false;
    return blockMap[y][x] != "#";
  });

  tilemapMock.getTileAt.mockImplementation((x, y, _layerName) => {
    if (x < 0 || x >= blockMap[0].length) return undefined;
    if (y < 0 || y >= blockMap.length) return undefined;
    switch (blockMap[y][x]) {
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
