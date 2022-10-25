import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { MoveToResult, TargetMovement } from "./TargetMovement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { Position } from "../../GridEngine";
import { CharConfig, GridCharacter } from "../../GridCharacter/GridCharacter";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import * as Phaser from "phaser";
import {
  createBlankLayerMock,
  createTilemapMock,
} from "../../Utils/MockFactory/MockFactory";
import { BidirectionalSearch } from "../../Pathfinding/BidirectionalSearch/BidirectionalSearch";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

const TEST_CHAR_CONFIG = {
  speed: 1,
  collidesWithTiles: true,
  numberOfDirections: NumberOfDirections.FOUR,
};

describe("TargetMovement", () => {
  let targetMovement: TargetMovement;
  let blankLayerMock;
  let tilemapMock;
  let gridTilemap;
  let bidirectionalSearch: BidirectionalSearch;

  function createMockChar(
    id: string,
    pos: LayerPosition,
    charConfig: CharConfig = { ...TEST_CHAR_CONFIG, tilemap: gridTilemap }
  ): GridCharacter {
    const mockChar = new GridCharacter(id, charConfig);
    mockChar.setTilePosition(pos);
    return mockChar;
  }
  function layerPos(vec: Vector2): LayerPosition {
    return {
      position: vec,
      layer: "lowerCharLayer",
    };
  }
  function mockBlockMap(blockMap: string[]) {
    tilemapMock.hasTileAt.mockImplementation((x, y, _layerName) => {
      if (x < 0 || x >= blockMap[0].length) return false;
      if (y < 0 || y >= blockMap.length) return false;
      return blockMap[y][x] != "#";
    });
  }

  beforeEach(() => {
    blankLayerMock = createBlankLayerMock();
    tilemapMock = createTilemapMock(blankLayerMock);
    gridTilemap = new GridTilemap(tilemapMock as any);
    bidirectionalSearch = new BidirectionalSearch();
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
      { shortestPathAlgorithm: bidirectionalSearch }
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
          noPathFoundMaxRetries: 3,
          noPathFoundRetryBackoffMs: 200,
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        },
        ignoreBlockedTarget: true,
        distance: 12,
        shortestPathAlgorithm: bidirectionalSearch,
      }
    );

    expect(targetMovement.getInfo()).toEqual({
      type: "Target",
      config: {
        ignoreBlockedTarget: true,
        distance: 12,
        targetPos: {
          position: new Vector2(3, 1),
          layer: "lowerCharLayer",
        },
        noPathFoundMaxRetries: 3,
        noPathFoundRetryBackoffMs: 200,
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        pathBlockedStrategy: PathBlockedStrategy.RETRY,
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
      { shortestPathAlgorithm: bidirectionalSearch }
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
      { shortestPathAlgorithm: bidirectionalSearch }
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
      { shortestPathAlgorithm: bidirectionalSearch }
    );
    targetMovement.update(100);
    expect(mockChar.isMoving()).toBe(false);
  });

  it("should move towards closest reachable point if path is blocked", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "....",
      "####",
      ".t..",
    ]);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      {
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      }
    );
    targetMovement.update(1000);
    mockChar.update(1000);
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not move towards closest reachable point if distance is reached", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 3));
    const mockChar = createMockChar("char", charPos);

    // prettier-ignore
    mockBlockMap([
      ".p..",
      "....",
      "####",
      ".t..",
    ]);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      distance: 3,
      config: {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      },
      shortestPathAlgorithm: bidirectionalSearch,
    });
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 0)));
  });

  it("should not move if distance reached", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "....",
      "....",
      ".t..",
    ]);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      { distance: 2, shortestPathAlgorithm: bidirectionalSearch }
    );
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));

    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should move if closestToTarget is further than distance", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "....",
      "####",
      ".t..",
    ]);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      {
        distance: 2,
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      }
    );

    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not move if closestToTarget is closer than distance", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "....",
      "....",
      "####",
      ".t..",
    ]);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 4)),
      {
        distance: 3,
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      }
    );

    targetMovement.update(1000);
    mockChar.update(1000);
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
  });

  it("should not move if no path exists", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const mockChar = createMockChar("char", charPos);
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "....",
      "####",
      ".t..",
    ]);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(1, 3)),
      { shortestPathAlgorithm: bidirectionalSearch }
    );
    targetMovement.update(1000);
    mockChar.update(1000);

    expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 0)));
  });

  describe("noPathFoundStrategy = RETRY", () => {
    it("should move if path exists after backoff", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);
      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "####",
        ".t..",
      ]);
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          },
          shortestPathAlgorithm: bidirectionalSearch,
        }
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(false);
      expect(mockChar.getTilePos()).toEqual(charPos);

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);

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
      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "####",
        ".t..",
      ]);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 150,
          },
          shortestPathAlgorithm: bidirectionalSearch,
        }
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(false);

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);

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

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "####",
        ".t..",
      ]);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
            noPathFoundMaxRetries: 2,
          },
          shortestPathAlgorithm: bidirectionalSearch,
        }
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

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);
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

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "####",
        ".t..",
      ]);

      // expect(mockChar.getMovementDirection()).not.toEqual(Direction.DOWN);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
          },
          shortestPathAlgorithm: bidirectionalSearch,
        }
      );
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);

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
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
            noPathFoundMaxRetries: -1,
          },
          shortestPathAlgorithm: bidirectionalSearch,
        }
      );
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);
      targetMovement.update(1);
      mockChar.update(1);

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);

      targetMovement.update(1);
      mockChar.update(1);

      expect(mockChar.isMoving()).toBe(true);
    });
  });

  describe("noPathFoundStrategy = STOP", () => {
    it("should stop if no path found", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const mockChar = createMockChar("char", charPos);

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "####",
        ".t..",
      ]);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 3)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.STOP,
          },
          shortestPathAlgorithm: bidirectionalSearch,
        }
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

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);

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

  describe("non-colliding char", () => {
    it("should ignore blocked tiles with non tile-colliding char", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const targetPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collidesWithTiles: false,
      });
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        shortestPathAlgorithm: bidirectionalSearch,
      });

      tilemapMock.hasTileAt.mockReturnValue(false);
      const getNeighbors = targetMovement.getNeighbors(charPos);

      expect(getNeighbors).toEqual([
        {
          position: new Vector2(charPos.position.x, charPos.position.y + 1),
          layer: "lowerCharLayer",
        },
        {
          position: new Vector2(charPos.position.x + 1, charPos.position.y),
          layer: "lowerCharLayer",
        },
        {
          position: new Vector2(charPos.position.x - 1, charPos.position.y),
          layer: "lowerCharLayer",
        },
        {
          position: new Vector2(charPos.position.x, charPos.position.y - 1),
          layer: "lowerCharLayer",
        },
      ]);
    });

    it("should not list tiles out of range", () => {
      const charPos = layerPos(new Vector2(0, 0));
      const charPos2 = layerPos(new Vector2(19, 29));
      const targetPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collidesWithTiles: false,
      });
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        shortestPathAlgorithm: bidirectionalSearch,
      });

      const neighbors = targetMovement.getNeighbors(charPos);

      expect(neighbors).toEqual([
        layerPos(new Vector2(0, 1)),
        layerPos(new Vector2(1, 0)),
      ]);

      const neighbors2 = targetMovement.getNeighbors(charPos2);

      expect(neighbors2).toEqual([
        layerPos(new Vector2(18, 29)),
        layerPos(new Vector2(19, 28)),
      ]);
    });
  });

  function blockPath(charPos: LayerPosition, targetPos: LayerPosition) {
    if (charPos.position.x != 1 || charPos.position.y != 0) {
      throw "CharPos needs to be (1,0)";
    }
    if (targetPos.position.x != 1 || targetPos.position.y != 2) {
      throw "TargetPos needs to be (1,2)";
    }
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "####",
      ".t..",
    ]);
  }

  function unblockPath(charPos: LayerPosition, targetPos: LayerPosition) {
    if (charPos.position.x != 1 || charPos.position.y != 0) {
      throw "CharPos needs to be (1,0)";
    }
    if (targetPos.position.x != 1 || targetPos.position.y != 2) {
      throw "TargetPos needs to be (1,2)";
    }
    // prettier-ignore
    mockBlockMap([
      ".p..",
      "#.##",
      ".t..",
    ]);
  }

  it("should timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);

    unblockPath(charPos, targetPos);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        pathBlockedWaitTimeoutMs: 2000,
      },
      shortestPathAlgorithm: bidirectionalSearch,
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

    unblockPath(charPos, targetPos);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        pathBlockedWaitTimeoutMs: 2000,
      },
      shortestPathAlgorithm: bidirectionalSearch,
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

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "#.##",
        ".t..",
      ]);
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      });

      // prettier-ignore
      mockBlockMap([
        "....",
        ".p..",
        "####",
        ".t..",
      ]);

      targetMovement.update(1000);
      mockChar.update(1000);
      expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));

      targetMovement.update(1000);
      mockChar.update(1000);

      expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(1, 1)));
      // prettier-ignore
      mockBlockMap([
        "....",
        ".p..",
        "##.#",
        ".t..",
      ]);
      targetMovement.update(1000);
      mockChar.update(1000);

      expect(mockChar.getTilePos()).toEqual(layerPos(new Vector2(2, 1)));
    });

    it("should recalculate shortest path after default backoff", () => {
      const defaultBackoff = 200;
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(1, 2));
      const mockChar = createMockChar("char", charPos);

      unblockPath(charPos, targetPos);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      });

      blockPath(charPos, targetPos);

      expect(mockChar.isMoving()).toBe(false);
      // prettier-ignore
      mockBlockMap([
        ".p..",
        "##.#",
        ".t..",
      ]);
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
      unblockPath(charPos, targetPos);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
          pathBlockedRetryBackoffMs: 150,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      });
      blockPath(charPos, targetPos);

      targetMovement.update(100);
      mockChar.update(100);
      expect(mockChar.isMoving()).toBe(false);
      // prettier-ignore
      mockBlockMap([
        ".p..",
        "##.#",
        ".t..",
      ]);

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
      unblockPath(charPos, targetPos);

      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        config: {
          pathBlockedStrategy: PathBlockedStrategy.RETRY,
          pathBlockedMaxRetries: 2,
        },
        shortestPathAlgorithm: bidirectionalSearch,
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

    unblockPath(charPos, targetPos);
    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      shortestPathAlgorithm: bidirectionalSearch,
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
    // prettier-ignore
    mockBlockMap([
      ".pp.",
      ".pp.",
      ".t..",
      "....",
    ]);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      shortestPathAlgorithm: bidirectionalSearch,
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
      shortestPathAlgorithm: bidirectionalSearch,
    });
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    expect(mockChar.isMoving()).toBe(false);
    targetMovement.update(1);
    mockChar.update(1);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should consider multi-tile chars", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const targetPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos, {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
      tileHeight: 2,
    });
    mockChar.setTilePosition(charPos);

    // prettier-ignore
    mockBlockMap([
      "....",
      ".pp.",
      ".pp#",
      ".#..",
    ]);

    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      shortestPathAlgorithm: bidirectionalSearch,
    });
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    const unblockedNeigbors = targetMovement.getNeighbors(charPos);
    expect(unblockedNeigbors).toEqual([
      layerPos(new Vector2(0, 1)), // left
      layerPos(new Vector2(1, 0)), // up
    ]);
  });

  it("should not block on target", () => {
    const charPos = layerPos(new Vector2(1, 0));
    const targetPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos);
    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      ignoreBlockedTarget: true,
      shortestPathAlgorithm: bidirectionalSearch,
    });

    // prettier-ignore
    mockBlockMap([
      ".p",
      ".#",
    ]);

    const getNeighbors = targetMovement.getNeighbors(charPos);
    expect(getNeighbors).toEqual(expect.arrayContaining([targetPos]));
  });

  describe("finished observable", () => {
    let mockChar;
    let charPos: LayerPosition;

    beforeEach(() => {
      charPos = layerPos(new Vector2(1, 0));
      mockChar = createMockChar("char", charPos);
    });

    it("should fire when char gets new movement", () => {
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(0, 0)),
        {
          shortestPathAlgorithm: bidirectionalSearch,
        }
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
        {
          shortestPathAlgorithm: bidirectionalSearch,
        }
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
        {
          shortestPathAlgorithm: bidirectionalSearch,
        }
      );
      targetMovement.finishedObs().subscribe({ complete: mockCall });
      mockChar.setMovement(undefined);
      expect(mockCall).toHaveBeenCalled();
    });

    it("should fire when char arrives", () => {
      const mockCall = jest.fn();
      const targetPos = charPos;
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        shortestPathAlgorithm: bidirectionalSearch,
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
    it("should get 8 neighbors", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const targetPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      tilemapMock.hasTileAt.mockReturnValue(false);
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        shortestPathAlgorithm: bidirectionalSearch,
      });
      let getNeighbors = targetMovement.getNeighbors(charPos);
      expect(getNeighbors).toEqual([]);

      tilemapMock.hasTileAt.mockReturnValue(true);
      getNeighbors = targetMovement.getNeighbors(charPos);
      expect(getNeighbors).toEqual([
        layerPos(new Vector2(charPos.position.x, charPos.position.y + 1)),
        layerPos(new Vector2(charPos.position.x + 1, charPos.position.y)),
        layerPos(new Vector2(charPos.position.x - 1, charPos.position.y)),
        layerPos(new Vector2(charPos.position.x, charPos.position.y - 1)),
        layerPos(new Vector2(charPos.position.x + 1, charPos.position.y + 1)),
        layerPos(new Vector2(charPos.position.x + 1, charPos.position.y - 1)),
        layerPos(new Vector2(charPos.position.x - 1, charPos.position.y + 1)),
        layerPos(new Vector2(charPos.position.x - 1, charPos.position.y - 1)),
      ]);
    });

    it("should move up-left along path", () => {
      const charPos = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      tilemapMock.hasTileAt.mockReturnValue(true);
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(1, 1)),
        { shortestPathAlgorithm: bidirectionalSearch }
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
        { shortestPathAlgorithm: bidirectionalSearch }
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
        { shortestPathAlgorithm: bidirectionalSearch }
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
        { shortestPathAlgorithm: bidirectionalSearch }
      );
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN_RIGHT);
    });

    it("should not move towards closest reachable point if distance is reached", () => {
      const charPos = layerPos(new Vector2(1, 0));
      const targetPos = layerPos(new Vector2(3, 3));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });

      // prettier-ignore
      mockBlockMap([
        ".p..",
        "....",
        "####",
        ".t..",
      ]);
      targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
        distance: 3,
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
        shortestPathAlgorithm: bidirectionalSearch,
      });
      targetMovement.update(100);
      mockChar.update(100);

      expect(mockChar.isMoving()).toBe(false);
    });
  });

  it("should not consider forbidden positions as neighbors", () => {
    function posToStr(pos: Position, charLayer?: string): string {
      return `${pos.x}#${pos.y}#${charLayer}`;
    }
    const playerPos = { position: new Vector2(5, 5), layer: "lowerCharLayer" };
    const targetPos = {
      position: new Vector2(10, 10),
      layer: "lowerCharLayer",
    };
    const leftOfPlayer = {
      position: new Vector2(4, 5),
      layer: "lowerCharLayer",
    };
    const topOfPlayer = {
      position: new Vector2(5, 4),
      layer: "lowerCharLayer",
    };
    const rightOfPlayer = {
      position: new Vector2(6, 5),
      layer: "lowerCharLayer",
    };
    const bottomOfPlayer = {
      position: new Vector2(5, 6),
      layer: "lowerCharLayer",
    };
    const rightOfPlayerOtherLayer = {
      position: new Vector2(4, 5),
      layer: "unknownCharLayer",
    };
    const forbiddenPositions = new Set<string>();
    forbiddenPositions.add(posToStr(leftOfPlayer.position, leftOfPlayer.layer));
    forbiddenPositions.add(
      posToStr(rightOfPlayerOtherLayer.position, rightOfPlayerOtherLayer.layer)
    );

    const mockChar = createMockChar("char", playerPos);
    targetMovement = new TargetMovement(mockChar, gridTilemap, targetPos, {
      config: {
        isPositionAllowedFn: (pos, charLayer) =>
          !forbiddenPositions.has(posToStr(pos, charLayer)),
      },
      shortestPathAlgorithm: bidirectionalSearch,
    });

    expect(targetMovement.getNeighbors(playerPos)).toEqual([
      bottomOfPlayer,
      rightOfPlayer,
      topOfPlayer,
    ]);
  });

  describe("multi-tile chars neighbors", () => {
    let playerPos;
    let mockChar;
    let left, right, top, bottom;

    beforeEach(() => {
      playerPos = layerPos(new Vector2(10, 10));
      mockChar = createMockChar("char", playerPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        tileWidth: 2,
        tileHeight: 2,
      });
      left = layerPos(new Vector2(0, 1));
      right = layerPos(new Vector2(2, 1));
      top = layerPos(new Vector2(1, 0));
      bottom = layerPos(new Vector2(1, 2));
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemap,
        layerPos(new Vector2(3, 3)),
        { shortestPathAlgorithm: bidirectionalSearch }
      );
    });

    it("should get all neighbors for unblocked chars", () => {
      tilemapMock.hasTileAt.mockReturnValue(true);

      expect(targetMovement.getNeighbors(layerPos(new Vector2(1, 1)))).toEqual([
        bottom,
        right,
        left,
        top,
      ]);
    });

    it("should get no neighbors for completely blocked chars", () => {
      // prettier-ignore
      mockBlockMap([
        "..#.",
        ".pp.",
        "#pp#",
        "..#.",
      ]);

      expect(targetMovement.getNeighbors(layerPos(new Vector2(1, 1)))).toEqual(
        []
      );
    });
  });
});
