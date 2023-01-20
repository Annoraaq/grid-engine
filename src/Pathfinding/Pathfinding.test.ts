const emptyAlgo: ShortestPathAlgorithm = {
  getShortestPath: (startPos, _targetPos, _getNeighbors) => ({
    path: [],
    closestToTarget: startPos,
    steps: 0,
  }),
};
const shortestPathAlgorithmFactoryMock = {
  shortestPathAlgorithmFactory: jest.fn((type) => {
    switch (type) {
      case "BIDIRECTIONAL_SEARCH":
        return new BidirectionalSearch();
      case "TEST":
        return emptyAlgo;
    }
    return new Bfs();
  }),
};
jest.mock("./ShortestPathAlgorithm", function () {
  return shortestPathAlgorithmFactoryMock;
});

import { GlobalConfig } from "../GlobalConfig/GlobalConfig";
import {
  CollisionStrategy,
  GridEngineConfig,
  NumberOfDirections,
} from "../GridEngine";
import { GridTilemap } from "../GridTilemap/GridTilemap";
import { PhaserTilemap } from "../GridTilemap/Phaser/PhaserTilemap";
import {
  createBlankLayerMock,
  createTilemapMock,
  mockBlockMap,
  mockCharMap,
  COLLISION_GROUP,
  mockLayeredMap,
  layerPos,
  createAllowedFn,
  mockRandomMap,
} from "../Utils/MockFactory/MockFactory";
import { Concrete } from "../Utils/TypeUtils";
import { Vector2 } from "../Utils/Vector2/Vector2";
import { Bfs } from "./Bfs/Bfs";
import { BidirectionalSearch } from "./BidirectionalSearch/BidirectionalSearch";
import {
  isBlocking,
  createGetNeighbors,
  createReverseNeighbors,
  Pathfinding,
  PathfindingOptions,
} from "./Pathfinding";
import {
  ShortestPathAlgorithm,
  ShortestPathAlgorithmType,
} from "./ShortestPathAlgorithm";

describe("Pathfinding", () => {
  let blankLayerMock;
  let tilemapMock;
  let gridTilemap;
  let pathfindingAlgo: ShortestPathAlgorithmType;

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
    gridTilemap = new GridTilemap(
      new PhaserTilemap(tilemapMock as any),
      "ge_collides"
    );
    pathfindingAlgo = "BIDIRECTIONAL_SEARCH";
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
          "Layer 1",
          [
            // prettier-ignore
            ".s#.",
            "####",
            "....",
          ],
        ],
        [
          "Layer 2",
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
      { shortestPathAlgorithm: "TEST" as ShortestPathAlgorithmType }
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

  it("should consider blocking chars", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    // prettier-ignore
    mockCharMap(tilemapMock, gridTilemap, [
      ".s..",
      "ccc.",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        collisionGroups: [COLLISION_GROUP],
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

  it("should not consider blocking chars when no collision group is given", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    // prettier-ignore
    mockCharMap(tilemapMock, gridTilemap, [
      ".s..",
      "ccc.",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2))
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should not consider blocking chars of different collision groups", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    // prettier-ignore
    mockCharMap(tilemapMock, gridTilemap, [
      ".s..",
      "ccc.",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        collisionGroups: ["someOtherCollisionGroup"],
      }
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should not consider chars in ignoreList", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);

    // prettier-ignore
    mockCharMap(tilemapMock, gridTilemap, [
      ".s..",
      "ccc.",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        collisionGroups: [COLLISION_GROUP],
        ignoredChars: ["mock_char_1"],
      }
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should ignore tiles", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "###.",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { ignoreTiles: true }
    );

    expect(shortestPath.path.length).toEqual(3);
  });

  it("should ignore map bounds", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "####",
      ".t..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { ignoreMapBounds: true }
    );

    expect(shortestPath.path.length).toEqual(7);
  });

  it("should ignore blocked target", () => {
    const pathfinding = new Pathfinding(pathfindingAlgo, gridTilemap);
    // prettier-ignore
    mockBlockMap(tilemapMock, [
      ".s..",
      "....",
      ".#..",
    ]);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { ignoreBlockedTarget: true }
    );

    expect(shortestPath.path.length).toEqual(3);
  });

  it("should keep performance of BFS", () => {
    const strat = "BFS";
    const pathfinding = new Pathfinding(strat, gridTilemap);
    mockRandomMap(tilemapMock, 500, 500, 0.3, 12323);
    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(150, 150)),
      layerPos(new Vector2(250, 250))
    );

    expect(shortestPath.steps).toEqual(42363);
    expect(shortestPath.path.length).toEqual(203);
  });

  it("should keep performance of bidirectional search", () => {
    const strat = "BIDIRECTIONAL_SEARCH";
    const pathfinding = new Pathfinding(strat, gridTilemap);
    mockRandomMap(tilemapMock, 500, 500, 0.3, 12323);
    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(150, 150)),
      layerPos(new Vector2(250, 250))
    );

    expect(shortestPath.steps).toEqual(24620);
    expect(shortestPath.path.length).toEqual(203);
  });

  describe("getNeighbors", () => {
    let options: Concrete<PathfindingOptions>;

    beforeEach(() => {
      options = {
        shortestPathAlgorithm: "BFS",
        pathWidth: 1,
        pathHeight: 1,
        numberOfDirections: NumberOfDirections.FOUR,
        isPositionAllowed: (_pos, _charLayer) => true,
        collisionGroups: [],
        ignoredChars: [],
        ignoreTiles: false,
        ignoreMapBounds: false,
        ignoreBlockedTarget: false,
      };
    });

    it("should return all adjacent positions", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(options, dest, gridTilemap);

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should return all adjacent positions for 8 dirs", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(
        { ...options, numberOfDirections: NumberOfDirections.EIGHT },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
        layerPos(new Vector2(2, 2)),
        layerPos(new Vector2(2, 0)),
        layerPos(new Vector2(0, 2)),
        layerPos(new Vector2(0, 0)),
      ]);
    });

    it("should return all adjacent positions considering transitions", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(options, dest, gridTilemap);

      mockLayeredMap(
        tilemapMock,
        new Map([
          [
            "Layer 1",
            [
              // prettier-ignore
              "...",
              ".s.",
              "...",
            ],
          ],
          [
            "Layer 2",
            [
              // prettier-ignore
              "...",
              ".s.",
              "...",
            ],
          ],
        ])
      );

      gridTilemap.setTransition(
        new Vector2(2, 1),
        "lowerCharLayer",
        "testCharLayer"
      );

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        { position: new Vector2(2, 1), layer: "testCharLayer" },
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold unallowed positions", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      // prettier-ignore
      const allowedFn = createAllowedFn([
        "...",
        "#s.",
        "...",
      ]);
      const getNeighbors = createGetNeighbors(
        { ...options, isPositionAllowed: allowedFn },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold blocked tiles", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(options, dest, gridTilemap);

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "#s.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold blocked tiles unidirectionally", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(options, dest, gridTilemap);

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "→s→",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold tiles out of map", () => {
      const pos = layerPos(new Vector2(0, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(options, dest, gridTilemap);

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "s..",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(0, 2)),
        layerPos(new Vector2(1, 1)),
        layerPos(new Vector2(0, 0)),
      ]);
    });

    it("should not withhold tiles out of map", () => {
      const pos = layerPos(new Vector2(0, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(
        { ...options, ignoreMapBounds: true },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "s..",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(0, 2)),
        layerPos(new Vector2(1, 1)),
        layerPos(new Vector2(-1, 1)),
        layerPos(new Vector2(0, 0)),
      ]);
    });

    it("should not withhold blocked tiles", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(
        { ...options, ignoreTiles: true },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "#s.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should not withhold chars with other collision group", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(options, dest, gridTilemap);

      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        "cs.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold chars with other collision group", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(
        { ...options, collisionGroups: [COLLISION_GROUP] },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        "cs.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should not withhold ignored chars", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(
        {
          ...options,
          collisionGroups: [COLLISION_GROUP],
          ignoredChars: ["mock_char_0"],
        },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        "cs.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should not withhold blocked target", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(0, 1));
      const getNeighbors = createGetNeighbors(
        {
          ...options,
          ignoreBlockedTarget: true,
        },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "#s.",
        "...",
      ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold for larger tile size", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getNeighbors = createGetNeighbors(
        {
          ...options,
          pathWidth: 2,
          pathHeight: 2,
        },
        dest,
        gridTilemap
      );
      // prettier-ignore
      mockBlockMap(tilemapMock, [
      "....",
      ".ss#",
      ".ss.",
      "..#.",
    ]);

      expect(getNeighbors(pos)).toEqual([
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });
  });
  describe("getReverse Neighbors", () => {
    let options: Concrete<PathfindingOptions>;

    beforeEach(() => {
      options = {
        shortestPathAlgorithm: "BFS",
        pathWidth: 1,
        pathHeight: 1,
        numberOfDirections: NumberOfDirections.FOUR,
        isPositionAllowed: (_pos, _charLayer) => true,
        collisionGroups: [],
        ignoredChars: [],
        ignoreTiles: false,
        ignoreMapBounds: false,
        ignoreBlockedTarget: false,
      };
    });

    it("should return all adjacent positions", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getReverseNeighbors = createReverseNeighbors(
        {
          ...options,
          pathWidth: 2,
          pathHeight: 2,
        },
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should return all adjacent positions for 8 dirs", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = { ...options, numberOfDirections: NumberOfDirections.EIGHT };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
        layerPos(new Vector2(2, 2)),
        layerPos(new Vector2(2, 0)),
        layerPos(new Vector2(0, 2)),
        layerPos(new Vector2(0, 0)),
      ]);
    });

    it("should return all adjacent positions considering transitions", () => {
      const pos = { position: new Vector2(1, 1), layer: "testCharLayer" };
      const dest = pos;
      const getReverseNeighbors = createReverseNeighbors(
        options,
        dest,
        gridTilemap
      );

      mockLayeredMap(
        tilemapMock,
        new Map([
          [
            "Layer 1",
            [
              // prettier-ignore
              "...",
              ".s.",
              "...",
            ],
          ],
          [
            "Layer 2",
            [
              // prettier-ignore
              "...",
              ".s.",
              "...",
            ],
          ],
        ])
      );

      gridTilemap.setTransition(
        pos.position,
        "lowerCharLayer",
        "testCharLayer"
      );

      expect(getReverseNeighbors(pos)).toEqual([
        { position: new Vector2(1, 2), layer: "lowerCharLayer" },
        { position: new Vector2(1, 2), layer: "testCharLayer" },
        { position: new Vector2(2, 1), layer: "lowerCharLayer" },
        { position: new Vector2(2, 1), layer: "testCharLayer" },
        { position: new Vector2(0, 1), layer: "lowerCharLayer" },
        { position: new Vector2(0, 1), layer: "testCharLayer" },
        { position: new Vector2(1, 0), layer: "lowerCharLayer" },
        { position: new Vector2(1, 0), layer: "testCharLayer" },
      ]);

      expect(
        getReverseNeighbors({ position: pos.position, layer: "lowerCharLayer" })
      ).toEqual([]);
    });

    it("should withhold unallowed positions", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;

      // prettier-ignore
      const allowedFn = createAllowedFn([
        "...",
        ".#.",
        "...",
      ]);
      const opts = { ...options, isPositionAllowed: allowedFn };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([]);
    });

    it("should withhold all if tile is blocked", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getReverseNeighbors = createReverseNeighbors(
        options,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".#.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([]);
    });

    it("should withhold blocked tiles unidirectionally", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getReverseNeighbors = createReverseNeighbors(
        options,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".→.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([layerPos(new Vector2(0, 1))]);
    });

    it("should withhold tiles out of map", () => {
      const pos = layerPos(new Vector2(-1, 1));
      const dest = pos;
      const getReverseNeighbors = createReverseNeighbors(
        options,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "...",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([]);
    });

    it("should not withhold tiles out of map", () => {
      const pos = layerPos(new Vector2(-1, 1));
      const dest = pos;
      const opts = { ...options, ignoreMapBounds: true };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "...",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(-1, 2)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(-2, 1)),
        layerPos(new Vector2(-1, 0)),
      ]);
    });

    it("should not withhold blocked tiles", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = { ...options, ignoreTiles: true };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".#.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should not withhold chars with other collision group", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const getReverseNeighbors = createReverseNeighbors(
        options,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".c.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold chars with same collision group", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = { ...options, collisionGroups: [COLLISION_GROUP] };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".c.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([]);
    });

    it("should not withhold ignored chars", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = {
        ...options,
        collisionGroups: [COLLISION_GROUP],
        ignoredChars: ["mock_char_0"],
      };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".c.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should not withhold blocked target", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = {
        ...options,
        ignoreBlockedTarget: true,
      };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".#.",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([
        layerPos(new Vector2(1, 2)),
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);
    });

    it("should withhold for larger tile width", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = { ...options, pathWidth: 2 };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "..#",
        "...",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([]);
    });

    it("should withhold for larger tile height", () => {
      const pos = layerPos(new Vector2(1, 1));
      const dest = pos;
      const opts = { ...options, pathHeight: 2 };
      const getReverseNeighbors = createReverseNeighbors(
        opts,
        dest,
        gridTilemap
      );

      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "...",
        ".#.",
      ]);

      expect(getReverseNeighbors(pos)).toEqual([]);
    });
  });

  describe("isBlocking", () => {
    let options: Concrete<PathfindingOptions>;

    beforeEach(() => {
      options = {
        shortestPathAlgorithm: "BFS",
        pathWidth: 1,
        pathHeight: 1,
        numberOfDirections: NumberOfDirections.FOUR,
        isPositionAllowed: (_pos, _charLayer) => true,
        collisionGroups: [],
        ignoredChars: [],
        ignoreTiles: false,
        ignoreMapBounds: false,
        ignoreBlockedTarget: false,
      };
    });

    it("should not block", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        ".t.",
      ]);
      expect(isBlocking(src, dest, gridTilemap, options)).toBe(false);
    });

    it("should block disallowed positions", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      const allowedFn = () => false;
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
          isPositionAllowed: allowedFn,
        })
      ).toBe(true);
    });

    it("should block when tiles block", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        ".#.",
      ]);
      expect(isBlocking(src, dest, gridTilemap, options)).toBe(true);
    });

    it("should block when unidirectional tiles block", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "←s.",
        ".←.",
      ]);
      expect(isBlocking(src, dest, gridTilemap, options)).toBe(true);
      expect(
        isBlocking(src, layerPos(new Vector2(0, 1)), gridTilemap, options)
      ).toBe(false);
    });

    it("should not block when tiles ignored", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        ".#.",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, { ...options, ignoreTiles: true })
      ).toBe(false);
    });

    it("should consider path width", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".ss",
        "..#",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, { ...options, pathWidth: 2 })
      ).toBe(true);
    });

    it("should consider path height", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        ".s.",
        ".s#",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, { ...options, pathHeight: 2 })
      ).toBe(true);
    });

    it("should block on map bounds", () => {
      const src = layerPos(new Vector2(0, 1));
      const dest = layerPos(new Vector2(-1, 1));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "s..",
        "...",
      ]);
      expect(isBlocking(src, dest, gridTilemap, { ...options })).toBe(true);
    });

    it("should not block on map bounds", () => {
      const src = layerPos(new Vector2(0, 1));
      const dest = layerPos(new Vector2(-1, 1));
      // prettier-ignore
      mockBlockMap(tilemapMock, [
        "...",
        "s..",
        "...",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
          ignoreMapBounds: true,
        })
      ).toBe(false);
    });

    it("should not block on char with different collision group", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".s.",
        ".c.",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
        })
      ).toBe(false);
    });

    it("should block on char with same collision group", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".s.",
        ".c.",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
          collisionGroups: [COLLISION_GROUP],
        })
      ).toBe(true);
    });

    it("should consider pathWidth for chars", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".ss",
        "..c",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
          pathWidth: 2,
          collisionGroups: [COLLISION_GROUP],
        })
      ).toBe(true);
    });

    it("should consider pathHeight for chars", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".s.",
        ".sc",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
          pathHeight: 2,
          collisionGroups: [COLLISION_GROUP],
        })
      ).toBe(true);
    });

    it("should not block on ignored char", () => {
      const src = layerPos(new Vector2(1, 1));
      const dest = layerPos(new Vector2(1, 2));
      // prettier-ignore
      mockCharMap(tilemapMock, gridTilemap, [
        "...",
        ".s.",
        ".c.",
      ]);
      expect(
        isBlocking(src, dest, gridTilemap, {
          ...options,
          collisionGroups: [COLLISION_GROUP],
          ignoredChars: ["mock_char_0"],
        })
      ).toBe(false);
    });
  });
});
