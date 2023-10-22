import { CollisionStrategy, NumberOfDirections } from "../GridEngine.js";
import { GridTilemap } from "../GridTilemap/GridTilemap.js";
import {
  COLLISION_GROUP,
  layerPos,
  createAllowedFn,
  mockRandomMap,
  mockLayeredBlockMap,
  LOWER_CHAR_LAYER,
  mockCharMap,
} from "../Utils/MockFactory/MockFactory.js";
import { Vector2 } from "../Utils/Vector2/Vector2.js";
import { Pathfinding } from "./Pathfinding.js";
import { ShortestPathAlgorithmType } from "./ShortestPathAlgorithm.js";

describe("Pathfinding", () => {
  let pathfindingAlgo: ShortestPathAlgorithmType;

  beforeEach(() => {
    pathfindingAlgo = "BIDIRECTIONAL_SEARCH";
  });

  function createTilemap(
    layers: Array<{ blockMap: string[]; layer: string | undefined }>,
  ) {
    const tm = mockLayeredBlockMap(layers);
    const gridTilemap = new GridTilemap(
      tm,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    mockCharMap(gridTilemap, layers);
    return gridTilemap;
  }

  it("should find blocked path", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "####",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path).toEqual([]);
  });

  it("should find the shortest path", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "##.#",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 0)),
      layerPos(new Vector2(2, 1)),
      layerPos(new Vector2(2, 2)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should use manhattan distance for 4 directions", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          "#####",
          "#s..#",
          "#####",
          "#..t#",
          "#####",
        ],
      },
    ]);

    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(3, 3)),
      { shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.closestToTarget).toEqual(layerPos(new Vector2(3, 1)));
  });

  it("should use Chebyshev distance for 8 directions", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          "#####",
          "#s..#",
          "#####",
          "#..t#",
          "#####",
        ],
      },
    ]);

    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(3, 3)),
      {
        numberOfDirections: NumberOfDirections.EIGHT,
        shortestPathAlgorithm: pathfindingAlgo,
      },
    );

    expect(shortestPath.closestToTarget).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not find path for larger tile size", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".ss.",
          ".ss.",
          "#.##",
          ".t..",
          "....",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 3)),
      { pathWidth: 2, pathHeight: 2, shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path).toEqual([]);
  });

  it("should find path for larger tile size", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".ss.",
          ".ss.",
          "##..",
          ".t..",
          "....",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 3)),
      { pathWidth: 2, pathHeight: 2, shortestPathAlgorithm: pathfindingAlgo },
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
    const gridTilemap = createTilemap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s#.",
          "####",
          "....",
        ],
      },
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          "..*.",
          "##.#",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    gridTilemap.setTransition(
      new Vector2(2, 0),
      "lowerCharLayer",
      "testCharLayer",
    );

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2), "testCharLayer"),
      { shortestPathAlgorithm: pathfindingAlgo },
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
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          "↑s→→",
          "↑↑#↓",
          "←t←↓",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: pathfindingAlgo },
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
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "##.#",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: "JPS" },
    );

    expect(shortestPath.algorithmUsed).toEqual("JPS");
  });

  it("should use bidirectional search as default pathfinding algo", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "##.#",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.algorithmUsed).toEqual("BIDIRECTIONAL_SEARCH");
  });

  it("should find path with 8 directions", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "..t.",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(2, 1)),
      {
        numberOfDirections: NumberOfDirections.EIGHT,
        shortestPathAlgorithm: pathfindingAlgo,
      },
    );

    expect(shortestPath.path.length).toEqual(2);
  });

  it("should find the shortest path for allowed positions", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          "....",
          "....",
          "....",
          "....",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

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
        shortestPathAlgorithm: pathfindingAlgo,
      },
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
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        collisionGroups: [COLLISION_GROUP],
        shortestPathAlgorithm: pathfindingAlgo,
      },
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
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should not consider blocking chars of different collision groups", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        collisionGroups: ["someOtherCollisionGroup"],
        shortestPathAlgorithm: pathfindingAlgo,
      },
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should not consider chars in ignoreList", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        collisionGroups: [COLLISION_GROUP],
        ignoredChars: ["mock_char_1"],
        shortestPathAlgorithm: pathfindingAlgo,
      },
    );

    expect(shortestPath.path).toEqual([
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(1, 2)),
    ]);
  });

  it("should ignore tiles", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "###.",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { ignoreTiles: true, shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path.length).toEqual(3);
  });

  it("should ignore map bounds", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "####",
          ".t..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { ignoreMapBounds: true, shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path.length).toEqual(7);
  });

  it("should terminate on infinite maps", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "####",
          "#t#.",
          "###.",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      {
        ignoreMapBounds: true,
        maxPathLength: 10,
        shortestPathAlgorithm: pathfindingAlgo,
      },
    );

    expect(shortestPath.path.length).toEqual(0);
    expect(shortestPath.maxPathLengthReached).toBe(true);
  });

  it("should ignore blocked target", () => {
    const gridTilemap = createTilemap([
      {
        layer: LOWER_CHAR_LAYER,
        blockMap: [
          // prettier-ignore
          ".s..",
          "....",
          ".#..",
        ],
      },
    ]);
    const pathfinding = new Pathfinding(gridTilemap);

    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(1, 0)),
      layerPos(new Vector2(1, 2)),
      { ignoreBlockedTarget: true, shortestPathAlgorithm: pathfindingAlgo },
    );

    expect(shortestPath.path.length).toEqual(3);
  });

  it("should keep performance of BFS", () => {
    const strat = "BFS";
    const tilemap = mockRandomMap(LOWER_CHAR_LAYER, 500, 500, 0.3, 12323);

    const gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const pathfinding = new Pathfinding(gridTilemap);
    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(150, 150)),
      layerPos(new Vector2(250, 250)),
      { shortestPathAlgorithm: strat },
    );

    expect(shortestPath.steps).toEqual(42363);
    expect(shortestPath.path.length).toEqual(203);
  });

  it("should keep performance of bidirectional search", () => {
    const strat = "BIDIRECTIONAL_SEARCH";
    const tilemap = mockRandomMap(LOWER_CHAR_LAYER, 500, 500, 0.3, 12323);

    const gridTilemap = new GridTilemap(
      tilemap,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    const pathfinding = new Pathfinding(gridTilemap);
    const shortestPath = pathfinding.findShortestPath(
      layerPos(new Vector2(150, 150)),
      layerPos(new Vector2(250, 250)),
      { shortestPathAlgorithm: strat },
    );

    expect(shortestPath.steps).toEqual(24288);
    expect(shortestPath.path.length).toEqual(203);
  });
});
