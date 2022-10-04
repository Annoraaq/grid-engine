import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { MoveToResult, TargetMovement } from "./TargetMovement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { Position } from "../../GridEngine";
import { Bfs } from "../../Pathfinding/Bfs/Bfs";
import { CharConfig, GridCharacter } from "../../GridCharacter/GridCharacter";
import { GridTilemap } from "../../GridTilemap/GridTilemap";
import * as Phaser from "phaser";
import {
  createBlankLayerMock,
  createTilemapMock,
} from "../../Utils/MockFactory/MockFactory";

// Hack to get Phaser included at runtime
((_a) => {
  // do nothing
})(Phaser);

const mockBfs = {
  getShortestPath: jest.fn(),
};

const TEST_CHAR_CONFIG = {
  speed: 3,
  collidesWithTiles: true,
  numberOfDirections: NumberOfDirections.FOUR,
};

jest.mock(
  "../../Pathfinding/BidirectionalSearch/BidirectionalSearch",
  function () {
    return {
      BidirectionalSearch: jest.fn(function () {
        return mockBfs;
      }),
    };
  }
);

describe("TargetMovement", () => {
  let targetMovement: TargetMovement;
  let gridTilemapMock;
  let blankLayerMock;
  let tilemapMock;
  let gridTilemap;

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
  beforeEach(() => {
    blankLayerMock = createBlankLayerMock();
    tilemapMock = createTilemapMock(blankLayerMock);
    gridTilemap = new GridTilemap(tilemapMock as any);
    gridTilemapMock = {
      hasBlockingTile: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingChar: jest.fn().mockReturnValue(false),
      getTransition: jest.fn(),
      isInRange: jest.fn().mockReturnValue(true),
    };
    mockBfs.getShortestPath = jest.fn();
  });

  it("should move char in correct direction", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos);

    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1)), layerPos(new Vector2(3, 1))],
      closestToTarget: new Vector2(3, 1),
    });
    targetMovement = new TargetMovement(mockChar, gridTilemapMock, {
      position: new Vector2(3, 1),
      layer: "layer2",
    });
    targetMovement.update(100);
    expect(mockBfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      { position: new Vector2(3, 1), layer: "layer2" },
      expect.any(Function)
    );
    expect(mockChar.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should return info", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1)), layerPos(new Vector2(3, 1))],
      closestToTarget: new Vector2(3, 1),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      {
        position: new Vector2(3, 1),
        layer: "layer2",
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
      }
    );

    expect(targetMovement.getInfo()).toEqual({
      type: "Target",
      config: {
        ignoreBlockedTarget: true,
        distance: 12,
        targetPos: {
          position: new Vector2(3, 1),
          layer: "layer2",
        },
        noPathFoundMaxRetries: 3,
        noPathFoundRetryBackoffMs: 200,
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        pathBlockedStrategy: PathBlockedStrategy.RETRY,
      },
    });
  });

  it("should move char within the path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [
        layerPos(new Vector2(0, 1)),
        charPos,
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(3, 1)),
      ],
      closestToTarget: new Vector2(3, 1),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 1))
    );
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(mockChar.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should not move arrived char", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 1))
    );
    targetMovement.update(100);
    expect(mockChar.isMoving()).toBe(false);
  });

  it("should move right along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1))],
      closestToTarget: new Vector2(2, 1),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(2, 1))
    );
    targetMovement.update(100);

    expect(mockChar.getMovementDirection()).toEqual(Direction.RIGHT);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should move left along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(0, 1))],
      closestToTarget: new Vector2(0, 1),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(0, 1))
    );
    targetMovement.update(100);

    expect(mockChar.getMovementDirection()).toEqual(Direction.LEFT);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should move down along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(1, 2))],
      closestToTarget: new Vector2(1, 2),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(1, 2))
    );
    targetMovement.update(100);

    expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should move up along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(1, 0))],
      closestToTarget: new Vector2(1, 0),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(1, 0))
    );
    targetMovement.update(100);

    expect(mockChar.getMovementDirection()).toEqual(Direction.UP);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should move towards closest reachable point if path is blocked", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: layerPos(new Vector2(2, 1)),
      })
      .mockReturnValueOnce({
        path: [charPos, layerPos(new Vector2(2, 1))],
        closestToTarget: layerPos(new Vector2(2, 1)),
      });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 1)),
      {
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      }
    );
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      layerPos(new Vector2(3, 1)),
      expect.any(Function)
    );
    expect(mockBfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      layerPos(new Vector2(2, 1)),
      expect.any(Function)
    );
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should not move towards closest reachable point if distance is reached", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const targetPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos);

    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: layerPos(new Vector2(2, 1)),
      })
      .mockReturnValueOnce({
        path: [charPos, layerPos(new Vector2(2, 1))],
        closestToTarget: layerPos(new Vector2(2, 1)),
      });
    targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos, {
      distance: 2,
      config: {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      },
    });
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(false);
  });

  it("should not move if distance reached", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(1, 2)), layerPos(new Vector2(1, 3))],
      closestToTarget: new Vector2(1, 3),
    });

    mockChar.turnTowards(Direction.UP);
    expect(mockChar.getFacingDirection()).not.toEqual(Direction.DOWN);

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(1, 3)),
      {
        distance: 3,
      }
    );
    targetMovement.update(100);

    expect(mockChar.getFacingDirection()).toEqual(Direction.DOWN);
    expect(mockChar.isMoving()).toBe(false);

    targetMovement.update(100);

    expect(mockChar.getFacingDirection()).toEqual(Direction.DOWN);
  });

  describe("turn towards", () => {
    it("should turn towards left", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const target = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      expect(mockChar.getFacingDirection()).not.toEqual(Direction.LEFT);
      targetMovement.update(100);

      expect(mockChar.getFacingDirection()).toEqual(Direction.LEFT);
    });

    it("should turn towards right", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const target = layerPos(new Vector2(3, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      expect(mockChar.getFacingDirection()).not.toEqual(Direction.RIGHT);
      targetMovement.update(100);

      expect(mockChar.getFacingDirection()).toEqual(Direction.RIGHT);
    });

    it("should turn towards up", () => {
      const charPos = layerPos(new Vector2(1, 3));
      const target = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      expect(mockChar.getFacingDirection()).not.toEqual(Direction.UP);
      targetMovement.update(100);

      expect(mockChar.getFacingDirection()).toEqual(Direction.UP);
    });

    it("should turn towards down", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const target = layerPos(new Vector2(1, 3));
      const mockChar = createMockChar("char", charPos);
      mockChar.turnTowards(Direction.UP);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      expect(mockChar.getFacingDirection()).not.toEqual(Direction.DOWN);
      targetMovement.update(100);

      expect(mockChar.getFacingDirection()).toEqual(Direction.DOWN);
    });

    it("should turn diagonally (towards larger of two distances)", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const target = layerPos(new Vector2(2, 3));
      const mockChar = createMockChar("char", charPos);
      mockChar.turnTowards(Direction.UP);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 3,
      });
      expect(mockChar.getFacingDirection()).not.toEqual(Direction.DOWN);
      targetMovement.update(100);

      expect(mockChar.getFacingDirection()).toEqual(Direction.DOWN);
    });
  });

  it("should move if closestToTarget is further than distance", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: layerPos(new Vector2(1, 3)),
      })
      .mockReturnValueOnce({
        path: [
          charPos,
          layerPos(new Vector2(1, 2)),
          layerPos(new Vector2(1, 3)),
        ],
        closestToTarget: layerPos(new Vector2(1, 3)),
      });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(1, 5)),
      {
        distance: 3,
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      }
    );
    targetMovement.update(100);

    expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should not move if closestToTarget is closer than distance", () => {
    const charPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: layerPos(new Vector2(1, 3)),
      })
      .mockReturnValueOnce({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: layerPos(new Vector2(1, 3)),
      });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(1, 5)),
      {
        distance: 3,
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
        },
      }
    );
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(false);
  });

  it("should not move if distOffset is larger than distance", () => {
    const charPos = layerPos(new Vector2(1, 2));
    const target = layerPos(new Vector2(1, 5));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: charPos,
      })
      .mockReturnValueOnce({
        path: [charPos],
        closestToTarget: new Vector2(1, 3),
      });

    targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
      distance: 1,
      config: { noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE },
    });
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(false);
  });

  it("should not move if no path exists", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValue({ path: [], closestToDistance: charPos });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 2))
    );
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(false);
  });

  describe("noPathFoundStrategy = RETRY", () => {
    it("should move if path exists after backoff", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          },
        }
      );
      targetMovement.update(100);

      expect(mockChar.isMoving()).toBe(false);

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(99);
      expect(mockChar.isMoving()).toBe(false);

      targetMovement.update(1);
      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    });

    it("should move if path exists after custom backoff", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 150,
          },
        }
      );
      targetMovement.update(100);

      expect(mockChar.isMoving()).toBe(false);

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(49);
      expect(mockChar.isMoving()).toBe(false);

      targetMovement.update(1);
      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    });

    it("should limit retry to maxRetries", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
            noPathFoundMaxRetries: 2,
          },
        }
      );
      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });

      targetMovement.update(1);
      targetMovement.update(1);
      targetMovement.update(1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(1);
      expect(mockChar.isMoving()).toBe(false);

      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(1, 1),
        result: MoveToResult.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED,
        description:
          "NoPathFoundStrategy RETRY: Maximum retries of 2 exceeded.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });

    it("should not limit retry on default", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });

      expect(mockChar.getMovementDirection()).not.toEqual(Direction.DOWN);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
          },
        }
      );
      targetMovement.update(1);
      targetMovement.update(1);
      targetMovement.update(1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(1);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    });

    it("should not limit retry if maxRetries = -1", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });

      expect(mockChar.getMovementDirection()).not.toEqual(Direction.DOWN);

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.RETRY,
            noPathFoundRetryBackoffMs: 1,
            noPathFoundMaxRetries: -1,
          },
        }
      );
      targetMovement.update(1);
      targetMovement.update(1);
      targetMovement.update(1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(1);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    });
  });

  describe("noPathFoundStrategy = STOP", () => {
    it("should stop if no path found", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.STOP,
          },
        }
      );
      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });
      targetMovement.update(100);
      expect(mockChar.isMoving()).toBe(false);

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(200);

      expect(mockChar.isMoving()).toBe(false);
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(1, 1),
        result: MoveToResult.NO_PATH_FOUND,
        description: "NoPathFoundStrategy STOP: No path found.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });
  });

  describe("non-colliding char", () => {
    beforeEach(() => {
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [],
        closestToTarget: undefined,
      });
    });

    it("should ignore blocked tiles with non tile-colliding char", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const targetPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collidesWithTiles: false,
      });
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);

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
      gridTilemapMock.isInRange.mockReturnValue(false);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);
      const charPos = layerPos(new Vector2(3, 1));
      const targetPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collidesWithTiles: false,
      });
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);

      const getNeighbors = targetMovement.getNeighbors(charPos);

      expect(getNeighbors).toEqual([]);
    });

    it("should not move if no path exists", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const mockChar = createMockChar("char1", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        collidesWithTiles: false,
      });
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2))
      );
      targetMovement.update(100);
      expect(mockChar.isMoving()).toBe(false);
    });
  });

  it("should not recalculate shortest path on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    tilemapMock.hasTileAt.mockReturnValue(false);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1)), layerPos(new Vector2(2, 2))],
      closestToTarget: new Vector2(2, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(2, 2))
    );
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(mockChar.isMoving()).toBe(false);

    tilemapMock.hasTileAt.mockReturnValue(true);
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(true);
    expect(mockChar.getMovementDirection()).toEqual(Direction.RIGHT);
  });

  it("should timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    tilemapMock.hasTileAt.mockReturnValue(false);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1)), layerPos(new Vector2(2, 2))],
      closestToTarget: new Vector2(2, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(2, 2)),
      {
        config: {
          pathBlockedWaitTimeoutMs: 2000,
        },
      }
    );
    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });
    targetMovement.update(2200);
    tilemapMock.hasTileAt.mockReturnValue(true);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(mockChar.isMoving()).toBe(false);
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(1, 1),
      result: MoveToResult.PATH_BLOCKED_WAIT_TIMEOUT,
      description: "PathBlockedStrategy WAIT: Wait timeout of 2000ms exceeded.",
      layer: "lowerCharLayer",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should reset timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos);
    tilemapMock.hasTileAt.mockReturnValue(false);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1)), layerPos(new Vector2(2, 2))],
      closestToTarget: new Vector2(2, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(2, 2)),
      {
        config: {
          pathBlockedWaitTimeoutMs: 2000,
        },
      }
    );
    targetMovement.update(500);
    tilemapMock.hasTileAt.mockReturnValue(true);
    targetMovement.update(100);
    tilemapMock.hasTileAt.mockReturnValue(false);
    targetMovement.update(1600); // would stop char if timeout NOT reset
    tilemapMock.hasTileAt.mockReturnValue(true);
    // should not have been stopped and therefore move
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(true);
  });

  describe("PathBlockedStrategy = RETRY", () => {
    it("should recalculate shortest path", () => {
      const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
      tilemapMock.hasTileAt.mockReturnValue(false);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [
          layerPos(new Vector2(2, 1)),
          layerPos(new Vector2(2, 2)),
          layerPos(new Vector2(3, 2)),
        ],
        closestToTarget: new Vector2(3, 2),
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            pathBlockedStrategy: PathBlockedStrategy.RETRY,
          },
        }
      );

      tilemapMock.hasTileAt.mockReturnValue(false);
      targetMovement.update(200);

      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
      expect(mockChar.isMoving()).toBe(false);

      tilemapMock.hasTileAt.mockReturnValue(true);
      targetMovement.update(200);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN);
    });

    it("should keep retrying if no path can be found anymore after it was blocked", () => {
      const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
      tilemapMock.hasTileAt.mockReturnValue(false);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [
          layerPos(new Vector2(2, 1)),
          layerPos(new Vector2(2, 2)),
          layerPos(new Vector2(3, 2)),
        ],
        closestToTarget: new Vector2(3, 2),
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            pathBlockedStrategy: PathBlockedStrategy.RETRY,
          },
        }
      );

      tilemapMock.hasTileAt.mockReturnValue(false);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [],
        closestToTarget: new Vector2(2, 1),
      });
      targetMovement.update(200);
      targetMovement.update(200);

      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);

      targetMovement.update(200);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(3);
    });

    it("should recalculate shortest path after default backoff", () => {
      const defaultBackoff = 200;
      const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
      tilemapMock.hasTileAt.mockReturnValue(false);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [
          layerPos(new Vector2(2, 1)),
          layerPos(new Vector2(2, 2)),
          layerPos(new Vector2(3, 2)),
        ],
        closestToTarget: new Vector2(3, 2),
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            pathBlockedStrategy: PathBlockedStrategy.RETRY,
          },
        }
      );

      tilemapMock.hasTileAt.mockReturnValue(false);
      targetMovement.update(defaultBackoff - 1);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
      targetMovement.update(1);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
    });

    it("should recalculate shortest path after custom backoff", () => {
      const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
      tilemapMock.hasTileAt.mockReturnValue(false);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [
          layerPos(new Vector2(2, 1)),
          layerPos(new Vector2(2, 2)),
          layerPos(new Vector2(3, 2)),
        ],
        closestToTarget: new Vector2(3, 2),
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            pathBlockedStrategy: PathBlockedStrategy.RETRY,
            pathBlockedRetryBackoffMs: 150,
          },
        }
      );

      tilemapMock.hasTileAt.mockReturnValue(false);
      targetMovement.update(100);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
      targetMovement.update(49);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
      targetMovement.update(1);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
    });

    it("should recalculate shortest path with maxRetries", () => {
      const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
      tilemapMock.hasTileAt.mockReturnValue(false);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [
          layerPos(new Vector2(2, 1)),
          layerPos(new Vector2(2, 2)),
          layerPos(new Vector2(3, 2)),
        ],
        closestToTarget: new Vector2(3, 2),
      });

      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2)),
        {
          config: {
            pathBlockedStrategy: PathBlockedStrategy.RETRY,
            pathBlockedMaxRetries: 2,
          },
        }
      );

      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });

      tilemapMock.hasTileAt.mockReturnValue(false);
      targetMovement.update(200); // retry 1
      targetMovement.update(200); // retry 2
      targetMovement.update(200); // retry 3 should not happen

      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(3);
      expect(mockChar.isMoving()).toBe(false);
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(2, 1),
        result: MoveToResult.PATH_BLOCKED_MAX_RETRIES_EXCEEDED,
        description:
          "PathBlockedStrategy RETRY: Maximum retries of 2 exceeded.",
        layer: "lowerCharLayer",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });
  });

  it("should stop on pathBlockedStrategy STOP", () => {
    const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
    tilemapMock.hasTileAt.mockReturnValue(false);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(2, 2)),
        layerPos(new Vector2(3, 2)),
      ],
      closestToTarget: new Vector2(3, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 2))
    );
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });
    tilemapMock.hasTileAt.mockReturnValue(false);
    targetMovement.update(100);

    tilemapMock.hasTileAt.mockReturnValue(true);
    targetMovement.update(100);

    expect(mockChar.isMoving()).toBe(false);
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(2, 1),
      result: MoveToResult.PATH_BLOCKED,
      description: `PathBlockedStrategy STOP: Path blocked.`,
      layer: "lowerCharLayer",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should not block itself for multi-tile chars", () => {
    const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)), {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
      tileHeight: 2,
    });
    tilemapMock.hasTileAt.mockReturnValue(true);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(2, 2)),
        layerPos(new Vector2(3, 2)),
      ],
      closestToTarget: new Vector2(3, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 2))
    );
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    expect(mockChar.isMoving()).toBe(false);
    targetMovement.update(1);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should not block itself on tile", () => {
    const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)));
    tilemapMock.hasTileAt.mockReturnValue(true);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(2, 2)),
        layerPos(new Vector2(3, 2)),
      ],
      closestToTarget: new Vector2(3, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 2))
    );
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    expect(mockChar.isMoving()).toBe(false);
    targetMovement.update(1);
    expect(mockChar.isMoving()).toBe(true);
  });

  it("should consider multi-tile chars", () => {
    const blankLayerMock = createBlankLayerMock();
    const tilemapMock = createTilemapMock(blankLayerMock);
    const gridTilemap = new GridTilemap(tilemapMock as any);
    const mockChar = createMockChar("char", layerPos(new Vector2(2, 1)), {
      ...TEST_CHAR_CONFIG,
      tilemap: gridTilemap,
      tileWidth: 2,
      tileHeight: 2,
    });
    mockChar.setTilePosition(layerPos(new Vector2(2, 1)));

    // This simulates blocking tiles
    tilemapMock.hasTileAt.mockImplementation((x, y) => {
      if (x === 2 && y === 3) return false;
      if (x === 4 && y === 1) return false;
      return true;
    });

    // TODO: replace mock with real implementation
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [
        layerPos(new Vector2(2, 1)),
        layerPos(new Vector2(2, 2)),
        layerPos(new Vector2(3, 2)),
      ],
      closestToTarget: new Vector2(3, 2),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemap,
      layerPos(new Vector2(3, 2))
    );
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    const unblockedNeigbors = targetMovement.getNeighbors(
      layerPos(new Vector2(2, 1))
    );
    expect(unblockedNeigbors).toEqual([
      layerPos(new Vector2(1, 1)),
      layerPos(new Vector2(2, 0)),
    ]);
  });

  it("should not block on target", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const targetPos = layerPos(new Vector2(3, 2));
    const mockChar = createMockChar("char1", charPos);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [layerPos(new Vector2(3, 1)), layerPos(new Vector2(3, 2))],
      closestToTarget: new Vector2(3, 2),
    });
    targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos, {
      ignoreBlockedTarget: true,
    });

    tilemapMock.hasTileAt.mockReturnValue(false);
    const getNeighbors = targetMovement.getNeighbors(charPos);

    expect(getNeighbors).toEqual([
      {
        position: new Vector2(charPos.position.x, charPos.position.y + 1),
        layer: "lowerCharLayer",
      },
    ]);
  });

  describe("finished observable", () => {
    let mockChar;

    beforeEach(() => {
      mockChar = createMockChar("char", layerPos(new Vector2(1, 1)));
      const targetPos = layerPos(new Vector2(3, 3));
      mockBfs.getShortestPath = jest.fn().mockReturnValueOnce({
        path: [],
        targetPos,
      });
    });

    it("should fire when char gets new movement", () => {
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
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
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);

      mockChar.setMovement(targetMovement);
      expect(mockCall).not.toHaveBeenCalled();
    });

    it("should complete when char gets new movement", () => {
      const mockCall = jest.fn();
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      targetMovement.finishedObs().subscribe({ complete: mockCall });
      mockChar.setMovement(undefined);
      expect(mockCall).toHaveBeenCalled();
    });

    it("should fire when char arrives", () => {
      const charPos = layerPos(new Vector2(1, 1));
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos],
        closestToTarget: charPos,
      });
      const mockCall = jest.fn();
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      targetMovement.finishedObs().subscribe(mockCall);
      targetMovement.update(100);
      expect(mockCall).toHaveBeenCalledWith({
        position: mockChar.getTilePos().position,
        result: MoveToResult.SUCCESS,
        description: "Successfully arrived.",
        layer: "lowerCharLayer",
      });
    });

    it("should fire once when char arrives", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const targetPos = layerPos(new Vector2(3, 3));
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos],
        closestToTarget: charPos,
      });
      const mockCall = jest.fn();
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      targetMovement.finishedObs().subscribe(mockCall);
      targetMovement.update(100);
      targetMovement.update(100);
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
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [],
        closestToTarget: undefined,
      });
      tilemapMock.hasTileAt.mockReturnValue(false);
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
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
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(0, 0))],
        closestToTarget: new Vector2(1, 0),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 0))
      );
      targetMovement.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.UP_LEFT);
    });

    it("should move up-right along path", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(2, 0))],
        closestToTarget: new Vector2(1, 0),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 0))
      );
      targetMovement.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.UP_RIGHT);
    });

    it("should move down-left along path", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(0, 2))],
        closestToTarget: new Vector2(1, 2),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 2))
      );
      targetMovement.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN_LEFT);
    });

    it("should move down-right along path", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(2, 2))],
        closestToTarget: new Vector2(1, 2),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 2))
      );
      targetMovement.update(100);

      expect(mockChar.isMoving()).toBe(true);
      expect(mockChar.getMovementDirection()).toEqual(Direction.DOWN_RIGHT);
    });

    it("should not move towards closest reachable point if distance is reached", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const targetPos = layerPos(new Vector2(3, 3));
      const closestToTarget = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos, {
        ...TEST_CHAR_CONFIG,
        tilemap: gridTilemap,
        numberOfDirections: NumberOfDirections.EIGHT,
      });
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValueOnce({
          path: [],
          closestToTarget: closestToTarget,
        })
        .mockReturnValueOnce({
          path: [charPos, closestToTarget],
          closestToTarget: closestToTarget,
        });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        targetPos,
        {
          distance: 2,
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          },
        }
      );
      targetMovement.update(100);
      expect(mockChar.isMoving()).toBe(false);
    });
  });

  it("Should not consider forbidden positions as neighbors", () => {
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
    const bfs = new Bfs();
    mockBfs.getShortestPath = jest.fn((startPos, targetPos, getNeighbors) =>
      bfs.getShortestPath(startPos, targetPos, getNeighbors)
    );
    targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos, {
      config: {
        isPositionAllowedFn: (pos, charLayer) =>
          !forbiddenPositions.has(posToStr(pos, charLayer)),
      },
    });

    expect(targetMovement.getNeighbors(playerPos)).toEqual([
      bottomOfPlayer,
      rightOfPlayer,
      topOfPlayer,
    ]);
  });
});
