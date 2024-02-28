import { GridCharacter } from "../../GridCharacter/GridCharacter.js";
import { NumberOfDirections } from "../../GridEngine.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import { Vector2 } from "../Vector2/Vector2.js";
import { Random, MersenneTwister19937 } from "random-js";
import { TileLayer, Tile, Tilemap } from "../../GridTilemap/Tilemap.js";
import { MockTile, MockTileLayer, MockTilemap } from "./MockTilemap.js";
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

export const LOWER_CHAR_LAYER = "lowerCharLayer";
export const HIGHER_CHAR_LAYER = "testCharLayer";
export const COLLISION_GROUP = "testCollisionGroup";

export type CostMap = Array<Array<TileCost | number>>;

export interface CostMapLayer {
  layer: string | undefined;
  costMap: CostMap;
}

export function createSpriteMock(): Phaser.GameObjects.Sprite {
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
  } as unknown as Phaser.GameObjects.Sprite;
}

export function createContainerMock(
  x = 0,
  y = 0,
  height = 0,
): Phaser.GameObjects.Container {
  return {
    x,
    y,
    displayHeight: 0,
    setDepth: jest.fn(),
    getBounds: jest.fn(() => ({ height })),
  } as unknown as Phaser.GameObjects.Container;
}

export function createMockLayer(layerData: LayerData): TileLayer {
  return new MockTileLayer(
    layerData.name,
    layerData.properties,
    layerData.height,
    layerData.width,
    layerData.scale,
    layerData.tilesets,
    layerData.data,
  );
}

export function layerPos(vec: Vector2, layer?: string): LayerVecPos {
  return {
    position: vec,
    layer: layer ?? LOWER_CHAR_LAYER,
  };
}

export function mockCharMap(
  gridTilemap: GridTilemap,
  blockMaps: Array<{ layer: string | undefined; blockMap: string[] }>,
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
  seed = 12345,
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
  return mockLayeredBlockMap([{ layer, blockMap: map }]);
}

export function getBlockingProps(char: string): Record<string, boolean> {
  switch (char) {
    case "_":
      return {};
    case "#":
      return {
        ge_collide: true,
      };
    case "→":
      return {
        ge_collide_up: true,
        ge_collide_right: true,
        ge_collide_down: true,
        "ge_collide_up-right": true,
        "ge_collide_up-left": true,
        "ge_collide_down-right": true,
        "ge_collide_down-left": true,
      };
    case "←":
      return {
        ge_collide_up: true,
        ge_collide_down: true,
        ge_collide_left: true,
        "ge_collide_up-right": true,
        "ge_collide_up-left": true,
        "ge_collide_down-right": true,
        "ge_collide_down-left": true,
      };
    case "↑":
      return {
        ge_collide_up: true,
        ge_collide_right: true,
        ge_collide_left: true,
        "ge_collide_up-right": true,
        "ge_collide_up-left": true,
        "ge_collide_down-right": true,
        "ge_collide_down-left": true,
      };
    case "↓":
      return {
        ge_collide_right: true,
        ge_collide_down: true,
        ge_collide_left: true,
        "ge_collide_up-right": true,
        "ge_collide_up-left": true,
        "ge_collide_down-right": true,
        "ge_collide_down-left": true,
      };
    case "↖":
      return {
        ge_collide_right: true,
        ge_collide_down: true,
        ge_collide_up: true,
        ge_collide_left: true,
        "ge_collide_up-right": true,
        "ge_collide_up-left": true,
        "ge_collide_down-left": true,
      };
    case "↗":
      return {
        ge_collide_right: true,
        ge_collide_down: true,
        ge_collide_up: true,
        ge_collide_left: true,
        "ge_collide_up-right": true,
        "ge_collide_up-left": true,
        "ge_collide_down-right": true,
      };
    case "↘":
      return {
        ge_collide_right: true,
        ge_collide_down: true,
        ge_collide_up: true,
        ge_collide_left: true,
        "ge_collide_up-right": true,
        "ge_collide_down-right": true,
        "ge_collide_down-left": true,
      };
    case "↙":
      return {
        ge_collide_right: true,
        ge_collide_down: true,
        ge_collide_up: true,
        ge_collide_left: true,
        "ge_collide_up-left": true,
        "ge_collide_down-right": true,
        "ge_collide_down-left": true,
      };
  }
  return {};
}

export function mockBlockMap(
  blockMap: string[],
  charLayer?: string,
  isometric?: boolean,
  costMap?: Array<Array<number | TileCost>>,
): Tilemap {
  return mockLayeredBlockMap(
    [{ layer: charLayer, blockMap }],
    isometric,
    costMap ? [{ layer: charLayer, costMap }] : undefined,
  );
}

export function mockLayeredBlockMap(
  blockMaps: Array<{
    layer: string | undefined;
    blockMap: string[];
    isCharLayer?: boolean;
    charLayerName?: string;
  }>,
  isometric?: boolean,
  costMaps?: CostMapLayer[],
): Tilemap {
  const layers: MockTileLayer[] = [];
  for (const bm of blockMaps) {
    const data: Array<Array<Tile | undefined>> = [];
    for (let r = 0; r < bm.blockMap.length; r++) {
      const row: Array<Tile | undefined> = [];
      for (let c = 0; c < bm.blockMap[r].length; c++) {
        const costMap = costMaps?.find((cm) => cm.layer === bm.layer);
        if (bm.blockMap[r][c] == "_") {
          if (costMap?.costMap?.[r]?.[c]) {
            row.push(new MockTile(tileCostProps(costMap, r, c)));
          } else {
            row.push(undefined);
          }
        } else {
          if (costMap?.costMap?.[r]?.[c]) {
            row.push(
              new MockTile({
                ...getBlockingProps(bm.blockMap[r][c]),
                ...tileCostProps(costMap, r, c),
              }),
            );
          } else {
            row.push(new MockTile(getBlockingProps(bm.blockMap[r][c])));
          }
        }
      }
      data.push(row);
    }
    if (bm.isCharLayer === undefined) {
      bm.isCharLayer = true;
    }
    const layer = new MockTileLayer(
      bm.layer,
      bm.layer && bm.isCharLayer
        ? { ge_charLayer: bm.charLayerName ?? bm.layer }
        : {},
      bm.blockMap.length,
      bm.blockMap[0].length,
      1,
      [],
      data,
    );
    layers.push(layer);
  }
  return new MockTilemap(layers, isometric ? "isometric" : "orthogonal");
}

export function tileCostProps(
  costMap: CostMapLayer,
  r: number,
  c: number,
): Record<string, number> {
  if (!costMap.costMap?.[r]?.[c]) return {};
  const cost = costMap.costMap[r][c];
  return typeof cost === "number" ? { ge_cost: cost } : { ...cost };
}

export function createAllowedFn(map: string[], ignoreBounds = false) {
  return ({ x, y }, _charLayer) => {
    if (x < 0 || x >= map[0].length) return ignoreBounds;
    if (y < 0 || y >= map.length) return ignoreBounds;
    return map[y][x] != "#";
  };
}

export function updateLayer(tilemapMock, blockMap: string[], layer?: string) {
  for (let r = 0; r < blockMap.length; r++) {
    for (let c = 0; c < blockMap[r].length; c++) {
      if (blockMap[r][c] == "#") {
        tilemapMock
          .getLayers()
          .find((l) => l.getName() == layer)
          .getData()[r][c].properties["ge_collide"] = "true";
      } else {
        tilemapMock
          .getLayers()
          .find((l) => l.getName() == layer)
          .getData()[r][c].properties["ge_collide"] = undefined;
      }
    }
  }
}
