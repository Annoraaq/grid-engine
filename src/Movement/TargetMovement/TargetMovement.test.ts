import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { MoveToResult, TargetMovement } from "./TargetMovement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { of, Subject } from "rxjs";

const mockBfs = {
  getShortestPath: jest.fn(),
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

  function createMockChar(id: string, pos: Vector2) {
    return <any>{
      getId: () => id,
      getNextTilePos: jest.fn(() => ({ position: pos, layer: "layer1" })),
      getTilePos: jest.fn(() => ({
        position: new Vector2(pos.x - 1, pos.y),
        layer: "layer1",
      })),
      move: jest.fn(),
      isMoving: () => false,
      turnTowards: jest.fn(),
      autoMovementSet: jest.fn().mockReturnValue(of()),
      collidesWithTiles: jest.fn().mockReturnValue(true),
      setMovement: jest.fn(),
      getCollisionGroups: () => ["cGroup1"],
    };
  }
  function layerPos(vec: Vector2): LayerPosition {
    return {
      position: vec,
      layer: "layer1",
    };
  }
  beforeEach(() => {
    gridTilemapMock = {
      hasBlockingTile: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingChar: jest.fn().mockReturnValue(false),
      isBlocking: jest.fn(),
      getTransition: jest.fn(),
      isInRange: jest.fn().mockReturnValue(true),
    };
    mockBfs.getShortestPath = jest.fn();
  });

  it("should move char in correct direction", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos.position);
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
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should return info", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos.position);
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

  it("should move char", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(2, 1)), layerPos(new Vector2(3, 1))],
      closestToTarget: new Vector2(3, 1),
    });
    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 1))
    );
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move char within the path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should not move arrived char", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos.position);
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
    expect(gridTilemapMock.isBlocking).not.toHaveBeenCalledWith(undefined);
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should move right along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move left along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should move down along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should move up along path", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).toHaveBeenCalledWith(Direction.UP);
  });

  it("should move towards closest reachable point if path is blocked", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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
    expect(mockChar.move).toHaveBeenCalled();
  });

  it("should not move towards closest reachable point if distance is reached", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const targetPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos.position);

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
      numberOfDirections: NumberOfDirections.FOUR,
      distance: 2,
      config: {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      },
    });
    targetMovement.update(100);

    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if distance reached", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, layerPos(new Vector2(1, 2)), layerPos(new Vector2(1, 3))],
      closestToTarget: new Vector2(1, 3),
    });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(1, 3)),
      {
        distance: 3,
      }
    );
    targetMovement.update(100);

    expect(mockChar.turnTowards).toHaveBeenCalledWith(Direction.DOWN);
    expect(mockChar.move).not.toHaveBeenCalled();

    targetMovement.update(100);
    mockChar.turnTowards.mockReset();

    expect(mockChar.turnTowards).not.toHaveBeenCalled();
  });

  describe("turn towards", () => {
    it("should turn towards left", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const target = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      targetMovement.update(100);

      expect(mockChar.turnTowards).toHaveBeenCalledWith(Direction.LEFT);
    });

    it("should turn towards right", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const target = layerPos(new Vector2(3, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      targetMovement.update(100);

      expect(mockChar.turnTowards).toHaveBeenCalledWith(Direction.RIGHT);
    });

    it("should turn towards up", () => {
      const charPos = layerPos(new Vector2(1, 3));
      const target = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      targetMovement.update(100);

      expect(mockChar.turnTowards).toHaveBeenCalledWith(Direction.UP);
    });

    it("should turn towards down", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const target = layerPos(new Vector2(1, 3));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 2,
      });
      targetMovement.update(100);

      expect(mockChar.turnTowards).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should turn diagonally (towards larger of two distances)", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const target = layerPos(new Vector2(2, 3));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });

      targetMovement = new TargetMovement(mockChar, gridTilemapMock, target, {
        distance: 3,
      });
      targetMovement.update(100);

      expect(mockChar.turnTowards).toHaveBeenCalledWith(Direction.DOWN);
    });
  });

  it("should move if closestToTarget is further than distance", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should not move if closestToTarget is closer than distance", () => {
    const charPos = layerPos(new Vector2(1, 2));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if distOffset is larger than distance", () => {
    const charPos = layerPos(new Vector2(1, 2));
    const target = layerPos(new Vector2(1, 5));
    const mockChar = createMockChar("char", charPos.position);
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

    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if no path exists", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const mockChar = createMockChar("char", charPos.position);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValue({ path: [], closestToDistance: charPos });

    targetMovement = new TargetMovement(
      mockChar,
      gridTilemapMock,
      layerPos(new Vector2(3, 2))
    );
    targetMovement.update(100);

    expect(mockChar.move).not.toHaveBeenCalled();
  });

  describe("noPathFoundStrategy = RETRY", () => {
    it("should move if path exists after backoff", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
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

      expect(mockChar.move).not.toHaveBeenCalled();

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(99);
      expect(mockChar.move).not.toHaveBeenCalled();

      targetMovement.update(1);
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should move if path exists after custom backoff", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
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

      expect(mockChar.move).not.toHaveBeenCalled();

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(49);
      expect(mockChar.move).not.toHaveBeenCalled();

      targetMovement.update(1);
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should limit retry to maxRetries", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
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
      expect(mockChar.move).not.toHaveBeenCalled();

      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(0, 1),
        result: MoveToResult.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED,
        description:
          "NoPathFoundStrategy RETRY: Maximum retries of 2 exceeded.",
        layer: "layer1",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });

    it("should not limit retry on default", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
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
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should not limit retry if maxRetries = -1", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
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
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });
  });

  describe("noPathFoundStrategy = STOP", () => {
    it("should stop if no path found", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
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
      expect(mockChar.move).not.toHaveBeenCalled();

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(1, 3))],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(200);

      expect(mockChar.move).not.toHaveBeenCalled();
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(0, 1),
        result: MoveToResult.NO_PATH_FOUND,
        description: "NoPathFoundStrategy STOP: No path found.",
        layer: "layer1",
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
      const mockChar = createMockChar("char1", charPos.position);
      mockChar.collidesWithTiles.mockReturnValue(false);
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);

      gridTilemapMock.isBlocking.mockReturnValue(true);
      const getNeighbors = targetMovement.getNeighbors(charPos);

      expect(getNeighbors).toEqual([
        {
          position: new Vector2(charPos.position.x, charPos.position.y + 1),
          layer: "layer1",
        },
        {
          position: new Vector2(charPos.position.x + 1, charPos.position.y),
          layer: "layer1",
        },
        {
          position: new Vector2(charPos.position.x - 1, charPos.position.y),
          layer: "layer1",
        },
        {
          position: new Vector2(charPos.position.x, charPos.position.y - 1),
          layer: "layer1",
        },
      ]);
    });

    it("should not list tiles out of range", () => {
      gridTilemapMock.isInRange.mockReturnValue(false);
      gridTilemapMock.hasBlockingChar.mockReturnValue(false);
      const charPos = layerPos(new Vector2(3, 1));
      const targetPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char1", charPos.position);
      mockChar.collidesWithTiles.mockReturnValue(false);
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);

      const getNeighbors = targetMovement.getNeighbors(charPos);

      expect(getNeighbors).toEqual([]);
    });

    it("should not move if no path exists", () => {
      const charPos = layerPos(new Vector2(3, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockChar.collidesWithTiles.mockReturnValue(false);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(3, 2))
      );
      targetMovement.update(100);
      expect(mockChar.move).not.toHaveBeenCalled();
    });
  });

  it("should delegate getNeighbors to gridTilemap", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const targetPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char1", charPos.position);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [],
      closestToTarget: undefined,
    });
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
    let getNeighbors = targetMovement.getNeighbors(charPos);
    expect(getNeighbors).toEqual([]);

    gridTilemapMock.isBlocking.mockReturnValue(false);
    gridTilemapMock.getTransition.mockReturnValue("layer2");
    getNeighbors = targetMovement.getNeighbors(charPos);
    expect(getNeighbors).toEqual([
      {
        position: new Vector2(charPos.position.x, charPos.position.y + 1),
        layer: "layer2",
      },
      {
        position: new Vector2(charPos.position.x + 1, charPos.position.y),
        layer: "layer2",
      },
      {
        position: new Vector2(charPos.position.x - 1, charPos.position.y),
        layer: "layer2",
      },
      {
        position: new Vector2(charPos.position.x, charPos.position.y - 1),
        layer: "layer2",
      },
    ]);
  });

  it("should not recalculate shortest path on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
    gridTilemapMock.isBlocking.mockReturnValue(true);
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
    expect(mockChar.move).not.toHaveBeenCalled();

    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
    gridTilemapMock.isBlocking.mockReturnValue(true);
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
    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(mockChar.move).not.toHaveBeenCalled();
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(0, 1),
      result: MoveToResult.PATH_BLOCKED_WAIT_TIMEOUT,
      description: "PathBlockedStrategy WAIT: Wait timeout of 2000ms exceeded.",
      layer: "layer1",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should reset timeout on strategy WAIT", () => {
    const charPos = layerPos(new Vector2(1, 1));
    const mockChar = createMockChar("char", charPos.position);
    gridTilemapMock.isBlocking.mockReturnValue(true);
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
    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    targetMovement.update(1600); // would stop char if timeout NOT reset
    gridTilemapMock.isBlocking.mockReturnValue(false);
    mockChar.move.mockReset();
    // should not have been stopped and therefore move
    targetMovement.update(100);

    expect(mockChar.move).toHaveBeenCalled();
  });

  describe("PathBlockedStrategy = RETRY", () => {
    it("should recalculate shortest path", () => {
      const mockChar = createMockChar("char", new Vector2(2, 1));
      gridTilemapMock.isBlocking.mockReturnValue(true);
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

      gridTilemapMock.isBlocking.mockReturnValue(true);
      targetMovement.update(200);

      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
      expect(mockChar.move).not.toHaveBeenCalled();

      gridTilemapMock.isBlocking.mockReturnValue(false);
      targetMovement.update(200);

      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should keep retrying if no path can be found anymore after it was blocked", () => {
      const mockChar = createMockChar("char", new Vector2(2, 1));
      gridTilemapMock.isBlocking.mockReturnValue(true);
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

      gridTilemapMock.isBlocking.mockReturnValue(true);
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
      const mockChar = createMockChar("char", new Vector2(2, 1));
      gridTilemapMock.isBlocking.mockReturnValue(true);
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

      gridTilemapMock.isBlocking.mockReturnValue(true);
      targetMovement.update(defaultBackoff - 1);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
      targetMovement.update(1);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
    });

    it("should recalculate shortest path after custom backoff", () => {
      const mockChar = createMockChar("char", new Vector2(2, 1));
      gridTilemapMock.isBlocking.mockReturnValue(true);
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

      gridTilemapMock.isBlocking.mockReturnValue(true);
      targetMovement.update(100);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
      targetMovement.update(49);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
      targetMovement.update(1);
      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
    });

    it("should recalculate shortest path with maxRetries", () => {
      const mockChar = createMockChar("char", new Vector2(2, 1));
      gridTilemapMock.isBlocking.mockReturnValue(true);
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

      gridTilemapMock.isBlocking.mockReturnValue(true);
      targetMovement.update(200); // retry 1
      targetMovement.update(200); // retry 2
      targetMovement.update(200); // retry 3 should not happen

      expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(3);
      expect(mockChar.move).not.toHaveBeenCalled();
      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(1, 1),
        result: MoveToResult.PATH_BLOCKED_MAX_RETRIES_EXCEEDED,
        description:
          "PathBlockedStrategy RETRY: Maximum retries of 2 exceeded.",
        layer: "layer1",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });
  });

  it("should stop on pathBlockedStrategy STOP", () => {
    const mockChar = createMockChar("char", new Vector2(2, 1));
    gridTilemapMock.isBlocking.mockReturnValue(true);
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
    gridTilemapMock.isBlocking.mockReturnValue(true);
    targetMovement.update(100);

    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);

    expect(mockChar.move).not.toHaveBeenCalled();
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(1, 1),
      result: MoveToResult.PATH_BLOCKED,
      description: `PathBlockedStrategy STOP: Path blocked.`,
      layer: "layer1",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should not block itself", () => {
    const mockChar = createMockChar("char", new Vector2(2, 1));
    gridTilemapMock.isBlocking.mockReturnValue(false);
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

    mockChar.getNextTilePos.mockReturnValue({
      position: new Vector2(2, 2),
      layer: "layer1",
    });
    targetMovement.update(1);
    expect(gridTilemapMock.isBlocking).not.toHaveBeenCalledWith(
      "layer1",
      new Vector2(2, 2),
      ["cGroup1"]
    );
    expect(gridTilemapMock.isBlocking).toHaveBeenCalledWith(
      "layer1",
      new Vector2(3, 2),
      ["cGroup1"]
    );
  });

  it("should not block on target", () => {
    const charPos = layerPos(new Vector2(3, 1));
    const targetPos = layerPos(new Vector2(3, 2));
    const mockChar = createMockChar("char1", charPos.position);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [layerPos(new Vector2(3, 1)), layerPos(new Vector2(3, 2))],
      closestToTarget: new Vector2(3, 2),
    });
    targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos, {
      ignoreBlockedTarget: true,
    });

    gridTilemapMock.isBlocking.mockReturnValue(true);
    const getNeighbors = targetMovement.getNeighbors(charPos);

    expect(getNeighbors).toEqual([
      {
        position: new Vector2(charPos.position.x, charPos.position.y + 1),
        layer: "layer1",
      },
    ]);
  });

  describe("finished observable", () => {
    let mockChar;

    beforeEach(() => {
      mockChar = createMockChar("char", new Vector2(1, 1));
      const targetPos = layerPos(new Vector2(3, 3));
      mockBfs.getShortestPath = jest.fn().mockReturnValueOnce({
        path: [],
        targetPos,
      });
    });

    it("should fire when char gets new movement", () => {
      const autoMovementSet$ = new Subject();
      mockChar.autoMovementSet.mockReturnValue(autoMovementSet$);
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);

      autoMovementSet$.next(1);
      expect(mockCall).toHaveBeenCalledWith({
        position: mockChar.getTilePos().position,
        result: MoveToResult.MOVEMENT_TERMINATED,
        description:
          "Movement of character has been replaced before destination was reached.",
        layer: "layer1",
      });
    });

    it("should not fire when char gets same movement", () => {
      const autoMovementSet$ = new Subject();
      mockChar.autoMovementSet.mockReturnValue(autoMovementSet$);
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);

      autoMovementSet$.next(targetMovement);
      expect(mockCall).not.toHaveBeenCalled();
    });

    it("should complete when char gets new movement", () => {
      const autoMovementSet$ = new Subject();
      mockChar.autoMovementSet.mockReturnValue(autoMovementSet$);
      const mockCall = jest.fn();
      const targetPos = layerPos(new Vector2(3, 3));
      targetMovement = new TargetMovement(mockChar, gridTilemapMock, targetPos);
      targetMovement.finishedObs().subscribe({ complete: mockCall });
      autoMovementSet$.next(1);
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
        layer: "layer1",
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
      const mockChar = createMockChar("char1", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [],
        closestToTarget: undefined,
      });
      gridTilemapMock.isBlocking.mockReturnValue(true);
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        targetPos,
        { numberOfDirections: NumberOfDirections.EIGHT }
      );
      gridTilemapMock.isBlocking.mockReturnValue(true);
      let getNeighbors = targetMovement.getNeighbors(charPos);
      expect(getNeighbors).toEqual([]);

      gridTilemapMock.isBlocking.mockReturnValue(false);
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
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(0, 0))],
        closestToTarget: new Vector2(1, 0),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 0)),
        { numberOfDirections: NumberOfDirections.EIGHT }
      );
      targetMovement.update(100);

      expect(mockChar.move).toHaveBeenCalledWith(Direction.UP_LEFT);
    });

    it("should move up-right along path", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(2, 0))],
        closestToTarget: new Vector2(1, 0),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 0)),
        { numberOfDirections: NumberOfDirections.EIGHT }
      );
      targetMovement.update(100);

      expect(mockChar.move).toHaveBeenCalledWith(Direction.UP_RIGHT);
    });

    it("should move down-left along path", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(0, 2))],
        closestToTarget: new Vector2(1, 2),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 2)),
        { numberOfDirections: NumberOfDirections.EIGHT }
      );
      targetMovement.update(100);

      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN_LEFT);
    });

    it("should move down-right along path", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const mockChar = createMockChar("char", charPos.position);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, layerPos(new Vector2(2, 2))],
        closestToTarget: new Vector2(1, 2),
      });
      targetMovement = new TargetMovement(
        mockChar,
        gridTilemapMock,
        layerPos(new Vector2(1, 2)),
        { numberOfDirections: NumberOfDirections.EIGHT }
      );
      targetMovement.update(100);

      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN_RIGHT);
    });

    it("should not move towards closest reachable point if distance is reached", () => {
      const charPos = layerPos(new Vector2(1, 1));
      const targetPos = layerPos(new Vector2(3, 3));
      const closestToTarget = layerPos(new Vector2(2, 2));
      const mockChar = createMockChar("char", charPos.position);
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
          numberOfDirections: NumberOfDirections.EIGHT,
          distance: 2,
          config: {
            noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
          },
        }
      );
      targetMovement.update(100);
      expect(mockChar.move).not.toHaveBeenCalled();
    });
  });
});
