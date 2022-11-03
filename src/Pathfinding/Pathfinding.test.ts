import { GlobalConfig } from "../GlobalConfig/GlobalConfig";
import {
  CollisionStrategy,
  GridEngineConfig,
  NumberOfDirections,
} from "../GridEngine";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import {
  createBlankLayerMock,
  createTilemapMock,
  mockBlockMap,
  mockLayeredMap,
  layerPos,
} from "../Utils/MockFactory/MockFactory";
import { Concrete } from "../Utils/TypeUtils";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Bfs } from "./Bfs/Bfs";
import { Pathfinding } from "./Pathfinding";
import { ShortestPathAlgorithm } from "./ShortestPathAlgorithm";

function createAllowedFn(map: string[]) {
  return ({ x, y }, _charLayer) => {
    if (x < 0 || x >= map[0].length) return false;
    if (y < 0 || y >= map.length) return false;
    return map[y][x] != "#";
  };
}

describe("Pathfinding", () => {
  let blankLayerMock;
  let tilemapMock;
  let gridTilemap;
  let pathfindingAlgo: ShortestPathAlgorithm;

  beforeEach(() => {
    const config: Concrete<GridEngineConfig> = {
      characters: [],
      collisionTilePropertyName: "ge_collides",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      layerOverlay: false,
    };
    GlobalConfig.set(config);
    blankLayerMock = createBlankLayerMock();
    tilemapMock = createTilemapMock(blankLayerMock);
    gridTilemap = new GridTilemap(tilemapMock as any);
    pathfindingAlgo = new Bfs();
  });

  it("should find blocked path", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "####",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2))
    );

    expect(shortestPath.path).toEqual([]);
  });

  it("should find the shortest path", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "##.#",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2))
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 0)),
      layerPos(new Vector2(2, 1)),
      layerPos(new Vector2(2, 2)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should not find path for larger tile size", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".ss.",
      ".ss.",
      "#.##",
      ".t..",
      "....",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 3)),
      { pathWidth: 2, pathHeight: 2 }
    );

    expect(shortestPath.path).toEqual([]);
  });

  it("should find path for larger tile size", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".ss.",
      ".ss.",
      "##..",
      ".t..",
      "....",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 3)),
      { pathWidth: 2, pathHeight: 2 }
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 0)),
      layerPos(new Vector2(2, 1)),
      layerPos(new Vector2(2, 2)),
      layerPos(new Vector2(2, 3)),
      layerPos(new Vector2(1, 3)),
    ]);
  });

  it("should find the shortest path for transition", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    mockLayeredMap(
      tilemapMock,
      new Map([
        [
          "layer1",
          [
            // prettier-ignore
            ".s#.",
            "####",
            "....",
          ],
        ],
        [
          "layer2",
          [
            // prettier-ignore
            "..*.",
            "##.#",
            ".t..",
          ],
        ],
      ])
    );

    gridTilemap.setTransition(
      new Vector2(2, 0),
      "lowerCharLayer",
      "testCharLayer"
    );

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2), "testCharLayer")
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 0), "testCharLayer"),
      layerPos(new Vector2(2, 1), "testCharLayer"),
      layerPos(new Vector2(2, 2), "testCharLayer"),
      layerPos(new Vector2(1, 2), "testCharLayer"),
    ]);
  });

  it("should find the shortest path for unidirectional blocking", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    // prettier-ignore
    mockBlockMap(tilemapMock, [
      "↑s→→",
      "↑↑#↓",
      "←t←↓",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2))
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 0)),
      layerPos(new Vector2(3, 0)),
      layerPos(new Vector2(3, 1)),
      layerPos(new Vector2(3, 2)),
      layerPos(new Vector2(2, 2)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should use pathfinding algo", () => {
    const mockAlgo: ShortestPathAlgorithm = {
      getShortestPath: (startPos, _targetPos, _getNeighbors) => ({
        path: [],
        closestToTarget: startPos,
      }),
    };

    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "##.#",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: mockAlgo }
    );

    expect(shortestPath.path).toEqual([]);
  });

  it("should find path with 8 directions", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "..t.",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 1)),
      { numberOfDirections: NumberOfDirections.EIGHT }
    );

    expect(shortestPath.path.length).toEqual(2);
  });

  it("should find the shortest path for allowed positions", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    // prettier-ignore
    const allowedFn = createAllowedFn([
      ".s..",
      "###.",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        isPositionAllowed: allowedFn,
      }
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 0)),
      layerPos(new Vector2(3, 0)),
      layerPos(new Vector2(3, 1)),
      layerPos(new Vector2(3, 2)),
      layerPos(new Vector2(2, 2)),
      layerPos(new Vector2(1, 2)),
    ]);
  });
});
