import { ShortestPathAlgorithmType } from "./../../Pathfinding/ShortestPathAlgorithm.js";
import { Direction, NumberOfDirections } from "../../Direction/Direction.js";
import {
  MoveToConfig,
  MoveToResult,
  TargetMovement,
} from "./TargetMovement.js";
import { Vector2 } from "../../Utils/Vector2/Vector2.js";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy.js";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy.js";
import { CollisionStrategy } from "../../GridEngine.js";
import {
  CharConfig,
  GridCharacter,
} from "../../GridCharacter/GridCharacter.js";
import { GridTilemap } from "../../GridTilemap/GridTilemap.js";
import {
  createAllowedFn,
  COLLISION_GROUP,
  mockLayeredBlockMap,
  mockCharMap,
  updateLayer,
} from "../../Utils/MockFactory/MockFactory.js";
import {
  LayerPositionUtils,
  LayerVecPos,
} from "../../Utils/LayerPositionUtils/LayerPositionUtils.js";

const TEST_CHAR_CONFIG = {
  speed: 1,
  collidesWithTiles: true,
  numberOfDirections: NumberOfDirections.FOUR,
};

const CHUNKS_PER_SECOND = 2;

describe("TargetMovement", () => {
  let targetMovement: TargetMovement;
  let tilemapMock;
  let gridTilemap;
  let shortestPathAlgo: ShortestPathAlgorithmType;

  function createMockChar(
    id: string,
    pos: LayerVecPos,
    charConfig: CharConfig = { ...TEST_CHAR_CONFIG, tilemap: gridTilemap },
  ): GridCharacter {
    const mockChar = new GridCharacter(id, charConfig);
    mockChar.setTilePosition(pos);
    return mockChar;
  }
  function layerPos(vec: Vector2): LayerVecPos {
    return {
      position: vec,
      layer: "lowerCharLayer",
    };
  }

  function createPath(path: [number, number][]): LayerVecPos[] {
    return path.map(([x, y]) => layerPos(new Vector2(x, y)));
  }

  /* Updates in chunks of 500ms. */
  function chunkUpdate(
    targetMovement: TargetMovement,
    mockChar: GridCharacter,
    numChunks: number,
  ) {
    const HALF_SECOND_MS = 500;
    for (let i = 0; i < numChunks; i++) {
      targetMovement.update(HALF_SECOND_MS);
      mockChar.update(HALF_SECOND_MS);
    }
  }

  function expectWalkedPath(
    targetMovement: TargetMovement,
    mockChar: GridCharacter,
    path: LayerVecPos[],
  ) {
    for (const pos of path) {
      chunkUpdate(targetMovement, mockChar, CHUNKS_PER_SECOND);
      expect(mockChar.getTilePos()).toEqual(pos);
    }
  }

  beforeEach(() => {
    console.warn = jest.fn();
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          "......",
          "......",
          "......",
          "......",
          "......",
          "......",
        ],
      },
      {
        layer: "testCharLayer",
        blockMap: [
          // prettier-ignore
          "......",
          "......",
          "......",
          "......",
          "......",
          "......",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    shortestPathAlgo = "BIDIRECTIONAL_SEARCH";
  });

  it("should move char in correct direction", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      {
        position: new Vector2(3, 1),
        layer: "lowerCharLayer",
      },
      { config: { algorithm: shortestPathAlgo } },
    );
    targetMovement.update(100);

    expect(mockChar.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should return info", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos);
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      {
        position: new Vector2(3, 1),
        layer: "lowerCharLayer",
      },
      {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundMaxRetries: 3,
          noPathFoundRetryBackoffMs: 200,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        },
        ignoreBlockedTarget: true,
        distance: 12,
      },
    );

    expect(targetMovement.getInfo()).toEqual({
      type: "Target",
      config: {
        algorithm: shortestPathAlgo,
        ignoreBlockedTarget: true,
        distance: 12,
        targetPos: {
          position: { x: 3, y: 1 },
          charLayer: "lowerCharLayer",
        },
        noPathFoundMaxRetries: 3,
        noPathFoundRetryBackoffMs: 200,
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        pathBlockedStrategy: PathBlockedStrategy.RETRY,
      },
      state: {
        pathAhead: [
          { position: { x: 1, y: 1 }, charLayer: "lowerCharLayer" },
          { position: { x: 2, y: 1 }, charLayer: "lowerCharLayer" },
          { position: { x: 3, y: 1 }, charLayer: "lowerCharLayer" },
        ],
      },
    });
  });

  it("should move char along path down right", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(3, 3)),
      { config: { algorithm: shortestPathAlgo } },
    );
    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 2)));

    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 3)));

    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(2, 3)));

    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(3, 3)));
  });

  it("should move char along path up left", () => {
    const charPos = layerPos(new Vector2(3, 3));
    const mockChar = createMockChar("char", charPos);
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 1)),
      { config: { algorithm: shortestPathAlgo } },
    );
    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(2, 3)));

    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 3)));

    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 2)));

    targetMovement.update(1000);
    mockChar.update(1000);
    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not move arrived char", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos);
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(3, 1)),
      { config: { algorithm: shortestPathAlgo } },
    );
    targetMovement.update(100);
    expect(mockChar.isMoving()).toBe(false);
  });

  it("should move towards closest reachable point if path is blocked", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "####",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      },
    );

    chunkUpdate(targetMovement, mockChar, 2 * CHUNKS_PER_SECOND);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not move towards closest reachable point if distance is reached", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 3));
    const mockChar = createMockChar("char", charPos);

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "####",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      distance: 3,
      config: {
        algorithm: shortestPathAlgo,
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      },
    });
    targetMovement.update(100);
    mockChar.update(100);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 0)));
  });

  it("should not move if distance reached", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "....",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      {
        distance: 2,
        config: {
          algorithm: shortestPathAlgo,
        },
      },
    );
    chunkUpdate(targetMovement, mockChar, CHUNKS_PER_SECOND);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));

    chunkUpdate(targetMovement, mockChar, CHUNKS_PER_SECOND);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should move if closestToTarget is further than distance", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "####",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      {
        distance: 2,
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      },
    );

    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not move if closestToTarget is closer than distance", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "....",
          "####",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 4)),
      {
        distance: 3,
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      },
    );

    chunkUpdate(targetMovement, mockChar, 2 * CHUNKS_PER_SECOND);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should consider costs", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    tilemapMock = mockLayeredBlockMap(
      [
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p.",
            "..#",
            ".t.",
          ],
        },
      ],
      false,
      [
        {
          layer: "lowerCharLayer",
          costMap: [
            [1, 1, 1],
            [1, 5, 1],
            [1, 1, 1],
          ],
        },
      ],
    );
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 2)),
      {
        config: {
          considerCosts: true,
          algorithm: "A_STAR",
        },
      },
    );

    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(0, 0)));
  });

  it("should not move if no path exists", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "####",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      { config: { algorithm: shortestPathAlgo } },
    );
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 0)));
  });

  it("should move outside of map", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      ignoreMissingTiles: true,
    });

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "....",
          "####",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      { config: { algorithm: shortestPathAlgo } },
    );

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [1, 1],
        [0, 1],
        [-1, 1],
        [-1, 2],
        [-1, 3],
        [0, 3],
        [1, 3],
      ]),
    );
  });

  describe("noPathFoundStrategy = RETRY", () => {
    it("should move if path exists after backoff", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          },
        },
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(false);
      expect(mockChar.getTilePos()).toEqual(charPos);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(99);
      mockChar.update(99);

      expect(mockChar.isMoving()).toBe(false);

      targetMovement.update(1);
      mockChar.update(1);

      expect(mockChar.isMoving()).toBe(true);
    });

    it("should move if path exists after custom backoff", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 150,
          },
        },
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(false);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(49);
      mockChar.update(49);
      expect(mockChar.isMoving()).toBe(false);

      targetMovement.update(1);
      mockChar.update(1);
      expect(mockChar.isMoving()).toBe(true);
    });

    it("should limit retry to maxRetries", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
            noPathFoundMaxRetries: 2,
          },
        },
      );
      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });

      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );
      targetMovement.update(1);
      mockChar.update(1);
      expect(mockChar.isMoving()).toBe(false);

      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: charPos.position,
        result: MoveToResult.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED,
        description:
          "NoPathFoundStrategy RETRY: Maximum retries of 2 exceeded.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });

    it("should not limit retry on default", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );

      // expect(mockChar.getMovementDirection()).not.toEqual(Direction.DOWN);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
          },
        },
      );
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(1);
      mockChar.update(1);

      expect(mockChar.isMoving()).toBe(true);
    });

    it("should not limit retry if maxRetries = -1", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
            noPathFoundMaxRetries: -1,
          },
        },
      );
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(1);
      mockChar.update(1);

      expect(mockChar.isMoving()).toBe(true);
    });
  });

  describe("noPathFoundStrategy = STOP", () => {
    it("should stop if no path found", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.STOP,
          },
        },
      );
      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });
      targetMovement.update(100);
      mockChar.update(100);
      expect(mockChar.isMoving()).toBe(false);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(200);
      mockChar.update(200);

      expect(mockChar.isMoving()).toBe(false);
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: charPos.position,
        result: MoveToResult.NO_PATH_FOUND,
        description: "NoPathFoundStrategy STOP: No path found.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });
  });

  function blockPath(charPos: LayerVecPos, targetPos: LayerVecPos) {
    if (charPos.position.x != 1 || charPos.position.y != 0) {
      throw "CharPos needs to be (1,0)";
    }
    if (targetPos.position.x != 1 || targetPos.position.y != 2) {
      throw "TargetPos needs to be (1,2)";
    }

    tilemapMock
      .getLayers()
      .find((l) => l.getName() == charPos.layer)
      .getData()[charPos.position.y + 1][charPos.position.x].properties[
      "ge_collide"
    ] = "true";
  }

  function unblockPath(charPos: LayerVecPos, targetPos: LayerVecPos) {
    if (charPos.position.x != 1 || charPos.position.y != 0) {
      throw "CharPos needs to be (1,0)";
    }
    if (targetPos.position.x != 1 || targetPos.position.y != 2) {
      throw "TargetPos needs to be (1,2)";
    }
    tilemapMock
      .getLayers()
      .find((l) => l.getName() == charPos.layer)
      .getData()[charPos.position.y + 1][charPos.position.x].properties[
      "ge_collide"
    ] = undefined;
  }

  it("should timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "#.##",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
        pathBlockedWaitTimeoutMs: 2000,
      },
    });

    blockPath(charPos, targetPos);

    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });
    targetMovement.update(2200);
    mockChar.update(2200);

    unblockPath(charPos, targetPos);
    targetMovement.update(100);
    mockChar.update(100);

    expect(mockChar.isMoving()).toBe(false);
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(1, 0),
      result: MoveToResult.PATH_BLOCKED_WAIT_TIMEOUT,
      description: "PathBlockedStrategy WAIT: Wait timeout of 2000ms exceeded.",
      layer: "lowerCharLayer",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should reset timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "#.##",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
        pathBlockedWaitTimeoutMs: 2000,
      },
    });

    blockPath(charPos, targetPos);

    targetMovement.update(500);
    mockChar.update(500);
    unblockPath(charPos, targetPos);
    targetMovement.update(100);
    mockChar.update(100);
    blockPath(charPos, targetPos);
    targetMovement.update(1600); // would stop char if timeout NOT reset
    mockChar.update(1600);
    unblockPath(charPos, targetPos);
    // should not have been stopped and therefore move
    targetMovement.update(100);
    mockChar.update(100);

    expect(mockChar.isMoving()).toBe(true);
  });

  describe("PathBlockedStrategy = RETRY", () => {
    it("should recalculate shortest path", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 3));
      const mockChar = createMockChar("char", charPos);

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "#.##",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        },
      });

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          "....",
          ".p..",
          "####",
          ".t..",
        ],
        "lowerCharLayer",
      );

      chunkUpdate(targetMovement, mockChar, CHUNKS_PER_SECOND);
      expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));

      chunkUpdate(targetMovement, mockChar, CHUNKS_PER_SECOND);

      expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          "....",
          ".p..",
          "##.#",
          ".t..",
        ],
        "lowerCharLayer",
      );
      targetMovement.update(1000);
      mockChar.update(1000);

      expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(2, 1)));
    });

    it("should recalculate shortest path after default backoff", () => {
      const defaultBackoff = 200;
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 2));
      const mockChar = createMockChar("char", charPos);

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "#.##",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        },
      });

      blockPath(charPos, targetPos);

      expect(mockChar.isMoving()).toBe(false);
      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "##.#",
          ".t..",
        ],
        "lowerCharLayer",
      );
      targetMovement.update(defaultBackoff - 1);
      mockChar.update(defaultBackoff - 1);
      expect(mockChar.isMoving()).toBe(false);
      targetMovement.update(1);
      mockChar.update(1);
      expect(mockChar.isMoving()).toBe(true);
    });

    it("should recalculate shortest path after custom backoff", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 2));
      const mockChar = createMockChar("char", charPos);
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "#.##",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
          pathBlockedRetryBackoffMs: 150,
        },
      });
      blockPath(charPos, targetPos);

      targetMovement.update(100);
      mockChar.update(100);
      expect(mockChar.isMoving()).toBe(false);
      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "##.#",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(49);
      mockChar.update(49);
      expect(mockChar.isMoving()).toBe(false);

      targetMovement.update(1);
      mockChar.update(1);
      expect(mockChar.isMoving()).toBe(true);
    });

    it("should recalculate shortest path with maxRetries", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 2));
      const mockChar = createMockChar("char", charPos);
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "#.##",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
          pathBlockedMaxRetries: 2,
        },
      });
      blockPath(charPos, targetPos);

      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });

      targetMovement.update(200); // retry 1
      mockChar.update(200);
      targetMovement.update(200); // retry 2
      mockChar.update(200);
      targetMovement.update(200); // retry 3 should not happen
      mockChar.update(200);

      expect(mockChar.isMoving()).toBe(false);
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: charPos.position,
        result: MoveToResult.PATH_BLOCKED_MAX_RETRIES_EXCEEDED,
        description:
          "PathBlockedStrategy RETRY: Maximum retries of 2 exceeded.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });
  });

  it("should stop on pathBlockedStrategy STOP", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".p..",
          "#.##",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: { algorithm: shortestPathAlgo },
    });
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);
    blockPath(charPos, targetPos);

    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });
    targetMovement.update(100);
    mockChar.update(100);

    targetMovement.update(100);
    mockChar.update(100);

    expect(mockChar.isMoving()).toBe(false);
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: charPos.position,
      result: MoveToResult.PATH_BLOCKED,
      description: `PathBlockedStrategy STOP: Path blocked.`,
      layer: "lowerCharLayer",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should not block itself for multi-tile chars", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
      tileHeight: 2,
    });
    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".pp.",
          ".pp.",
          ".t..",
          "....",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: { algorithm: shortestPathAlgo },
    });
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    expect(mockChar.isMoving()).toBe(false);
    targetMovement.update(1);
    mockChar.update(1);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should not block itself on tile", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);

    unblockPath(charPos, targetPos);
    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: { algorithm: shortestPathAlgo },
    });
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    expect(mockChar.isMoving()).toBe(false);
    targetMovement.update(1);
    mockChar.update(1);
    expect(mockChar.isMoving()).toBe(true);
  });

  describe("finished observable", () => {
    let mockChar;
    let charPos: LayerVecPos;

    beforeEach(() => {
      charPos = layerPos(new Vector2(1, 0));
      mockChar = createMockChar("char", charPos);
    });

    it("should fire when char gets new movement", () => {
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(0, 0)),
        { config: { algorithm: shortestPathAlgo } },
      );
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);

      mockChar.setMovement(undefined);
      expect(mockCall).toHaveBeenCalledWith({
        position: mockChar.getTilePos().position,
        result: MoveToResult.MOVEMENT_TERMINATED,
        description:
          "Movement of character has been replaced before destination was reached.",
        layer: "lowerCharLayer",
      });
    });

    it("should not fire when char gets same movement", () => {
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(0, 0)),
        { config: { algorithm: shortestPathAlgo } },
      );
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);

      mockChar.setMovement(targetMovement);
      expect(mockCall).not.toHaveBeenCalled();
    });

    it("should complete when char gets new movement", () => {
      const mockCall = jest.fn();
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(0, 0)),
        { config: { algorithm: shortestPathAlgo } },
      );
      targetMovement.finishedObs().subscribe({ complete: mockCall });
      mockChar.setMovement(undefined);
      expect(mockCall).toHaveBeenCalled();
    });

    it("should fire when char arrives", () => {
      const mockCall = jest.fn();
      const targetPos = charPos;
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: { algorithm: shortestPathAlgo },
      });
      targetMovement.finishedObs().subscribe(mockCall);

      targetMovement.update(100);
      mockChar.update(100);

      expect(mockCall).toHaveBeenCalledWith({
        position: mockChar.getTilePos().position,
        result: MoveToResult.SUCCESS,
        description: "Successfully arrived.",
        layer: "lowerCharLayer",
      });
    });

    it("should fire once when char arrives", () => {
      const targetPos = charPos;
      const mockCall = jest.fn();
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos);
      targetMovement.finishedObs().subscribe(mockCall);
      targetMovement.update(1000);
      mockChar.update(1000);
      targetMovement.update(1000);
      mockChar.update(1000);
      expect(mockCall).toHaveBeenCalledTimes(1);
    });
  });

  describe("8 directions", () => {
    it("should move up-left along path", () => {
      const charPos = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 1)),
        { config: { algorithm: shortestPathAlgo } },
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.UP_LEFT);
    });

    it("should move up-right along path", () => {
      const charPos = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(3, 1)),
        { config: { algorithm: shortestPathAlgo } },
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.UP_RIGHT);
    });

    it("should move down-left along path", () => {
      const charPos = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        { config: { algorithm: shortestPathAlgo } },
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN_LEFT);
    });

    it("should move down-right along path", () => {
      const charPos = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(3, 3)),
        { config: { algorithm: shortestPathAlgo } },
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN_RIGHT);
    });

    it("should not move towards closest reachable point if distance is reached", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 3));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      gridTilemap.addCharacter(mockChar);
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        distance: 3,
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(false);
    });
  });

  it("should ignore char layers", () => {
    const charPos = layerPos(new Vector2(0, 0));
    charPos.layer = "lowerCharLayer";
    const targetPos = layerPos(new Vector2(2, 1));
    targetPos.layer = "upperCharLayer";

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          "s*.",
          "...",
        ],
      },
      {
        layer: "upperCharLayer",
        blockMap: [
          // prettier-ignore
          ".*.",
          "..t",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.setTransition(
      new Vector2(1, 0),
      "lowerCharLayer",
      "upperCharLayer",
    );
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
    });
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
        ignoreLayers: true,
      },
    });

    targetMovement.update(1000);
    mockChar.update(1000);
    targetMovement.update(1000);
    mockChar.update(1000);
    targetMovement.update(1000);
    mockChar.update(1000);
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual({
      position: new Vector2(2, 1),
      layer: "lowerCharLayer",
    });
  });

  it("should find path for larger tile size", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 3));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
      tileHeight: 2,
    });

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
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
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
      },
    });

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [1, 3],
      ]),
    );
  });

  it("should find the shortest path for allowed positions", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
      tileHeight: 2,
    });

    // prettier-ignore
    const allowedFn = createAllowedFn([
      ".s..",
      "###.",
      ".t..",
    ]);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
        isPositionAllowedFn: allowedFn,
      },
    });

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [2, 0],
        [3, 0],
        [3, 1],
        [3, 2],
        [2, 2],
        [1, 2],
      ]),
    );
  });

  it("should consider blocking chars", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      collisionGroups: [COLLISION_GROUP],
    });
    const blockMap = [
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ];
    tilemapMock = mockLayeredBlockMap(blockMap);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    mockCharMap(gridTilemap, blockMap);
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
      },
    });

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [2, 0],
        [3, 0],
        [3, 1],
        [3, 2],
        [2, 2],
        [1, 2],
      ]),
    );
  });

  it("should not consider blocking chars of different collision groups", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      collisionGroups: ["someOtherCollisionGroup"],
    });

    const blockMap = [
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ];
    tilemapMock = mockLayeredBlockMap(blockMap);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    mockCharMap(gridTilemap, blockMap);
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
      },
    });

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [1, 1],
        [1, 2],
      ]),
    );
  });

  it("should not consider ignored blocking chars", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
    });

    const blockMap = [
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s..",
          "ccc.",
          ".t..",
        ],
      },
    ];
    tilemapMock = mockLayeredBlockMap(blockMap);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );
    mockCharMap(gridTilemap, blockMap);
    gridTilemap.addCharacter(mockChar);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
        ignoredChars: [mockChar.getId()],
      },
    });

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [1, 1],
        [1, 2],
      ]),
    );
  });

  it("should not collide with tiles", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      collidesWithTiles: false,
    });

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s..",
          "###.",
          ".t..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
      },
    });

    expectWalkedPath(
      targetMovement,
      mockChar,
      createPath([
        [1, 1],
        [1, 2],
      ]),
    );
  });

  it("should ignore a blocked target", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s..",
          "....",
          ".#..",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: shortestPathAlgo,
      },
      ignoreBlockedTarget: true,
    });

    expectWalkedPath(targetMovement, mockChar, createPath([[1, 1]]));
  });

  it("should not exceed maxPathLength", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 4));

    tilemapMock = mockLayeredBlockMap([
      {
        layer: "lowerCharLayer",
        blockMap: [
          // prettier-ignore
          ".s...",
          ".....",
          ".....",
          ".....",
          ".t...",
        ],
      },
    ]);
    gridTilemap = new GridTilemap(
      tilemapMock,
      "ge_collide",
      CollisionStrategy.BLOCK_TWO_TILES,
    );

    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      ignoreMissingTiles: true,
    });

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        algorithm: "BFS",
        maxPathLength: 3,
      },
    });

    targetMovement.update(1000);
    mockChar.update(1000);
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 0)));
  });

  describe("Closest reachable", () => {
    it("should move towards closest reachable point if path is blocked", () => {
      const charPos = layerPos(new Vector2(2, 5));
      const targetPos = layerPos(new Vector2(2, 0));
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            "..t.",
            "####",
            "....",
            "....",
            "...#",
            "..ss",
            "..ss",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        tileWidth: 2,
        tileHeight: 2,
      });

      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });

      expectWalkedPath(
        targetMovement,
        mockChar,
        createPath([
          [1, 5],
          [1, 4],
          [1, 3],
          [1, 2],
          [2, 2],
        ]),
      );
    });

    it("should use correct number of directions", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(3, 2));
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".s..",
            "....",
            "####",
            "...t",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });
      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });

      // This is only one possible shortest path. When the shortest path
      // algorithm changes, this test could break.
      expectWalkedPath(targetMovement, mockChar, createPath([[2, 1]]));
    });

    it("should find the shortest path for allowed positions", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 4));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
      });

      // prettier-ignore
      const allowedFn = createAllowedFn([
        ".s..",
        "##..",
        "....",
        "####",
        ".t..",
      ]);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          isPositionAllowedFn: allowedFn,
        },
      });

      expectWalkedPath(
        targetMovement,
        mockChar,
        createPath([
          [2, 0],
          [2, 1],
          [2, 2],
          [1, 2],
        ]),
      );
    });

    it("should consider blocking chars", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 4));
      const blockMap = [
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".s..",
            "ccc.",
            "....",
            "####",
            ".t..",
          ],
        },
      ];
      tilemapMock = mockLayeredBlockMap(blockMap);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collisionGroups: [COLLISION_GROUP],
      });
      gridTilemap.addCharacter(mockChar);
      mockCharMap(gridTilemap, blockMap);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });

      expectWalkedPath(
        targetMovement,
        mockChar,
        createPath([
          [2, 0],
          [3, 0],
          [3, 1],
          [3, 2],
          [2, 2],
          [1, 2],
        ]),
      );
    });

    it("should not consider blocking chars of different collision groups", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 4));
      const blockMap = [
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".s..",
            "ccc.",
            "....",
            "####",
            ".t..",
          ],
        },
      ];
      tilemapMock = mockLayeredBlockMap(blockMap);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collisionGroups: ["someOtherCollisionGroup"],
      });
      gridTilemap.addCharacter(mockChar);
      mockCharMap(gridTilemap, blockMap);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });

      expectWalkedPath(
        targetMovement,
        mockChar,
        createPath([
          [1, 1],
          [1, 2],
        ]),
      );
    });

    it("should not collide with tiles", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 3));
      const blockMap = [
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".s..",
            ".#..",
            "cccc",
            ".t..",
          ],
        },
      ];
      tilemapMock = mockLayeredBlockMap(blockMap);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collidesWithTiles: false,
        collisionGroups: [COLLISION_GROUP],
      });
      gridTilemap.addCharacter(mockChar);
      mockCharMap(gridTilemap, blockMap);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });

      expectWalkedPath(targetMovement, mockChar, createPath([[1, 1]]));
    });
  });

  describe("noPathFound: ALTERNATIVE_TARGETS", () => {
    it("should fall back to STOP if no targets or alternative strategy is provided", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);

      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            ".p..",
            "....",
            "####",
            ".t..",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );

      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            algorithm: shortestPathAlgo,
            noPathFoundStrategy: NoPathFoundStrategy.ALTERNATIVE_TARGETS,
          },
        },
      );

      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });
      targetMovement.update(100);
      mockChar.update(100);
      expect(mockChar.isMoving()).toBe(false);

      updateLayer(
        tilemapMock,
        [
          // prettier-ignore
          ".p..",
          "....",
          "#.##",
          ".t..",
        ],
        "lowerCharLayer",
      );

      targetMovement.update(200);
      mockChar.update(200);

      expect(mockChar.isMoving()).toBe(false);
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: charPos.position,
        result: MoveToResult.NO_PATH_FOUND,
        description: "NoPathFoundStrategy STOP: No path found.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });

    it("should move towards alternative target if path is blocked", () => {
      const charPos = layerPos(new Vector2(2, 5));
      const targetPos = layerPos(new Vector2(2, 0));
      const alternativeTargets = [
        LayerPositionUtils.fromInternal(layerPos(new Vector2(0, 0))),
        LayerPositionUtils.fromInternal(layerPos(new Vector2(0, 6))),
        LayerPositionUtils.fromInternal(layerPos(new Vector2(3, 6))),
      ];
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            "a.t.",
            "####",
            "....",
            "....",
            "...#",
            "..s.",
            "a..a",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
      });

      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.ALTERNATIVE_TARGETS,
          alternativeTargets,
        },
      });

      expectWalkedPath(
        targetMovement,
        mockChar,
        createPath([
          [2, 6],
          [1, 6],
          [0, 6],
        ]),
      );
    });

    it("uses fallback strategy", () => {
      const charPos = layerPos(new Vector2(2, 5));
      const targetPos = layerPos(new Vector2(2, 0));
      const alternativeTargets = [
        LayerPositionUtils.fromInternal(layerPos(new Vector2(0, 0))),
      ];
      tilemapMock = mockLayeredBlockMap([
        {
          layer: "lowerCharLayer",
          blockMap: [
            // prettier-ignore
            "a.t.",
            "####",
            "....",
            "....",
            "...#",
            "..s.",
            "....",
          ],
        },
      ]);
      gridTilemap = new GridTilemap(
        tilemapMock,
        "ge_collide",
        CollisionStrategy.BLOCK_TWO_TILES,
      );
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
      });

      gridTilemap.addCharacter(mockChar);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          algorithm: shortestPathAlgo,
          noPathFoundStrategy: NoPathFoundStrategy.ALTERNATIVE_TARGETS,
          alternativeTargets,
          noPathFoundAlternativeTargetsFallbackStrategy:
            NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      });

      expectWalkedPath(
        targetMovement,
        mockChar,
        createPath([
          [2, 4],
          [2, 3],
          [2, 2],
        ]),
      );
    });
  });

  test.each(["BFS", "BIDIRECTIONAL_SEARCH", "JPS"])(
    "should show a warning if considerCost pathfinding option is used with" +
      " algorithm different than A*",
    (algorithm: ShortestPathAlgorithmType) => {
      console.warn = jest.fn();
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos);
      const targetPos = {
        position: new Vector2(3, 1),
        layer: "lowerCharLayer",
      };
      const options: MoveToConfig = {
        considerCosts: true,
      };

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: { ...options, algorithm },
      });

      expect(console.warn).toHaveBeenCalledWith(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with ` +
          `algorithm '${algorithm}'. It can only be used with A* algorithm.`,
      );
    },
  );

  it("should not show a warning if char tileWidth > 1 and non JPS", () => {
    console.warn = jest.fn();
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
    });
    const targetPos = {
      position: new Vector2(3, 1),
      layer: "lowerCharLayer",
    };

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: { algorithm: "BFS" },
    });

    expect(console.warn).not.toHaveBeenCalled();
  });

  it("should show a warning if char tileWidth > 1 when using JPS", () => {
    console.warn = jest.fn();
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
    });
    const targetPos = {
      position: new Vector2(3, 1),
      layer: "lowerCharLayer",
    };

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: { algorithm: "JPS" },
    });

    expect(console.warn).toHaveBeenCalledWith(
      `GridEngine: Pathfinding algorithm 'JPS' can only be used for ` +
        `characters with 'tileWidth' and 'tileHeight' of 1`,
    );
  });

  it("should show a warning if char tileHeight > 1 when using JPS", () => {
    console.warn = jest.fn();
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileHeight: 2,
    });
    const targetPos = {
      position: new Vector2(3, 1),
      layer: "lowerCharLayer",
    };

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: { algorithm: "JPS" },
    });

    expect(console.warn).toHaveBeenCalledWith(
      `GridEngine: Pathfinding algorithm 'JPS' can only be used for ` +
        `characters with 'tileWidth' and 'tileHeight' of 1`,
    );
  });

  it(
    "should not show a warning if considerCost pathfinding option is used " +
      "with A*",
    () => {
      console.warn = jest.fn();
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos);
      const targetPos = {
        position: new Vector2(3, 1),
        layer: "lowerCharLayer",
      };
      const options: MoveToConfig = {
        considerCosts: true,
      };

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: { ...options, algorithm: "A_STAR" },
      });

      expect(console.warn).not.toHaveBeenCalledWith(
        `GridEngine: Pathfinding option 'considerCosts' cannot be used with ` +
          `algorithm 'A_STAR'. It can only be used with A* algorithm.`,
      );
    },
  );

  it("should provide the current path ahead", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const targetPos = layerPos(new Vector2(1, 3));
    const mockChar = createMockChar("char1", charPos);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos);
    expect(targetMovement.getInfo().state?.pathAhead).toEqual([
      { position: { x: 1, y: 1 }, charLayer: "lowerCharLayer" },
      { position: { x: 1, y: 2 }, charLayer: "lowerCharLayer" },
      { position: { x: 1, y: 3 }, charLayer: "lowerCharLayer" },
    ]);

    chunkUpdate(targetMovement, mockChar, 2);

    expect(targetMovement.getInfo().state?.pathAhead).toEqual([
      { position: { x: 1, y: 2 }, charLayer: "lowerCharLayer" },
      { position: { x: 1, y: 3 }, charLayer: "lowerCharLayer" },
    ]);
  });
});
