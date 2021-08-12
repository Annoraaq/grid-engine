import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { Result, TargetMovement } from "./TargetMovement";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";
import { PathBlockedStrategy } from "../../Pathfinding/PathBlockedStrategy";
import { of } from "rxjs";

const mockBfs = {
  getShortestPath: jest.fn(),
};

jest.mock("../../Pathfinding/Bfs/Bfs", function () {
  return {
    Bfs: jest.fn(function () {
      return mockBfs;
    }),
  };
});

describe("TargetMovement", () => {
  let targetMovement: TargetMovement;
  let gridTilemapMock;

  function createMockChar(id: string, pos: Vector2) {
    return <any>{
      getId: () => id,
      getNextTilePos: jest.fn(() => pos),
      getTilePos: jest.fn(() => new Vector2(pos.x - 1, pos.y)),
      move: jest.fn(),
      isMoving: () => false,
      turnTowards: jest.fn(),
      autoMovementSet: jest.fn().mockReturnValue(of()),
    };
  }
  beforeEach(() => {
    gridTilemapMock = {
      hasBlockingTile: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingChar: jest.fn().mockReturnValue(false),
      isBlocking: jest.fn(),
    };
    mockBfs.getShortestPath = jest.fn();
  });

  it("should move char in correct direction", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1), new Vector2(3, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update(100);
    expect(mockBfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Vector2(3, 1),
      expect.any(Function)
    );
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move char", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1), new Vector2(3, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(char.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move char within the path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(0, 1), charPos, new Vector2(2, 1), new Vector2(3, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(char.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should not move arrived char", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(3, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    const mockChar = createMockChar("char", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update(100);
    expect(gridTilemapMock.isBlocking).not.toHaveBeenCalledWith(undefined);
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should move right along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(2, 1));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1)],
      closestToTarget: new Vector2(2, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(char.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move left along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(0, 1));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(0, 1)],
      closestToTarget: new Vector2(0, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(char.move).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should move down along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 2));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 2)],
      closestToTarget: new Vector2(1, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should move up along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 0));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 0)],
      closestToTarget: new Vector2(1, 0),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(char.move).toHaveBeenCalledWith(Direction.UP);
  });

  it("should move towards closest reachable point if path is blocked", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1), 0, {
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
    });
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Vector2(2, 1),
      })
      .mockReturnValueOnce({
        path: [charPos, new Vector2(2, 1)],
        closestToTarget: new Vector2(2, 1),
      });
    const mockChar = createMockChar("char", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Vector2(3, 1),
      expect.any(Function)
    );
    expect(mockBfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Vector2(2, 1),
      expect.any(Function)
    );
    expect(mockChar.move).toHaveBeenCalled();
  });

  it("should not move towards closest reachable point if distance is reached", () => {
    const charPos = new Vector2(1, 1);
    const targetPos = new Vector2(3, 1);
    targetMovement = new TargetMovement(gridTilemapMock, targetPos, 2, {
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
    });
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Vector2(2, 1),
      })
      .mockReturnValueOnce({
        path: [charPos, new Vector2(2, 1)],
        closestToTarget: new Vector2(2, 1),
      });
    const mockChar = createMockChar("char", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update(100);
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if distance reached", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 3), 3);
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 2), new Vector2(1, 3)],
      closestToTarget: new Vector2(1, 3),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);
    expect(char.turnTowards).toHaveBeenCalledWith(Direction.DOWN);
    expect(char.move).not.toHaveBeenCalled();
    targetMovement.update(100);
    char.turnTowards.mockReset();
    expect(char.turnTowards).not.toHaveBeenCalled();
  });

  describe("turn towards", () => {
    it("should turn towards left", () => {
      const charPos = new Vector2(3, 1);
      const target = new Vector2(1, 1);
      targetMovement = new TargetMovement(gridTilemapMock, target, 2);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      const char = createMockChar("char", charPos);

      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.turnTowards).toHaveBeenCalledWith(Direction.LEFT);
    });

    it("should turn towards right", () => {
      const charPos = new Vector2(1, 1);
      const target = new Vector2(3, 1);
      targetMovement = new TargetMovement(gridTilemapMock, target, 2);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      const char = createMockChar("char", charPos);

      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.turnTowards).toHaveBeenCalledWith(Direction.RIGHT);
    });

    it("should turn towards up", () => {
      const charPos = new Vector2(1, 3);
      const target = new Vector2(1, 1);
      targetMovement = new TargetMovement(gridTilemapMock, target, 2);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      const char = createMockChar("char", charPos);

      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.turnTowards).toHaveBeenCalledWith(Direction.UP);
    });

    it("should turn towards down", () => {
      const charPos = new Vector2(1, 1);
      const target = new Vector2(1, 3);
      targetMovement = new TargetMovement(gridTilemapMock, target, 2);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      const char = createMockChar("char", charPos);

      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.turnTowards).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should turn diagonally (towards larger of two distances)", () => {
      const charPos = new Vector2(1, 1);
      const target = new Vector2(2, 3);
      targetMovement = new TargetMovement(gridTilemapMock, target, 3);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, target],
        closestToTarget: target,
      });
      const char = createMockChar("char", charPos);

      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.turnTowards).toHaveBeenCalledWith(Direction.DOWN);
    });
  });

  it("should move if closestToTarget is further than distance", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 5), 3, {
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
    });
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Vector2(1, 3),
      })
      .mockReturnValueOnce({
        path: [charPos, new Vector2(1, 2), new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);
    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should not move if closestToTarget is closer than distance", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 5), 3, {
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
    });
    const charPos = new Vector2(1, 2);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Vector2(1, 3),
      })
      .mockReturnValueOnce({
        path: [charPos, new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);
    expect(char.move).not.toHaveBeenCalled();
  });

  it("should not move if distOffset is larger than distance", () => {
    const charPos = new Vector2(1, 2);
    const target = new Vector2(1, 5);
    targetMovement = new TargetMovement(gridTilemapMock, target, 1, {
      noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
    });
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
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);
    expect(char.move).not.toHaveBeenCalled();
  });

  it("should not move if no path exists", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2));
    const charPos = new Vector2(3, 1);
    mockBfs.getShortestPath = jest
      .fn()
      .mockReturnValue({ path: [], closestToDistance: charPos });
    const mockChar = createMockChar("char", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update(100);
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  describe("noPathFoundStrategy = RETRY", () => {
    it("should move if path exists after backoff", () => {
      targetMovement = new TargetMovement(
        gridTilemapMock,
        new Vector2(3, 2),
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.RETRY,
        }
      );
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      const mockChar = createMockChar("char", charPos);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(100);
      expect(mockChar.move).not.toHaveBeenCalled();

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(99);
      expect(mockChar.move).not.toHaveBeenCalled();

      targetMovement.update(1);
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should move if path exists after custom backoff", () => {
      targetMovement = new TargetMovement(
        gridTilemapMock,
        new Vector2(3, 2),
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          noPathFoundRetryBackoffMs: 150,
        }
      );
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      const mockChar = createMockChar("char", charPos);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(100);
      expect(mockChar.move).not.toHaveBeenCalled();

      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(49);
      expect(mockChar.move).not.toHaveBeenCalled();

      targetMovement.update(1);
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should limit retry to maxRetries", () => {
      targetMovement = new TargetMovement(
        gridTilemapMock,
        new Vector2(3, 2),
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          noPathFoundRetryBackoffMs: 1,
          noPathFoundMaxRetries: 2,
        }
      );
      const finishedObsCallbackMock = jest.fn();
      const finishedObsCompleteMock = jest.fn();
      targetMovement.finishedObs().subscribe({
        next: finishedObsCallbackMock,
        complete: finishedObsCompleteMock,
      });

      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      const mockChar = createMockChar("char", charPos);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(1);
      targetMovement.update(1);
      targetMovement.update(1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(1);
      expect(mockChar.move).not.toHaveBeenCalled();

      expect(finishedObsCallbackMock).toHaveBeenCalledWith({
        position: new Vector2(0, 1),
        result: Result.NO_PATH_FOUND_MAX_RETRIES_EXCEEDED,
        description:
          "NoPathFoundStrategy RETRY: Maximum retries of 2 exceeded.",
      });
      expect(finishedObsCompleteMock).toHaveBeenCalled();
    });

    it("should not limit retry on default", () => {
      targetMovement = new TargetMovement(
        gridTilemapMock,
        new Vector2(3, 2),
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          noPathFoundRetryBackoffMs: 1,
        }
      );
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      const mockChar = createMockChar("char", charPos);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(1);
      targetMovement.update(1);
      targetMovement.update(1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(1);
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });

    it("should not limit retry if maxRetries = -1", () => {
      targetMovement = new TargetMovement(
        gridTilemapMock,
        new Vector2(3, 2),
        0,
        {
          noPathFoundStrategy: NoPathFoundStrategy.RETRY,
          noPathFoundRetryBackoffMs: 1,
          noPathFoundMaxRetries: -1,
        }
      );
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest
        .fn()
        .mockReturnValue({ path: [], closestToDistance: charPos });
      const mockChar = createMockChar("char", charPos);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(1);
      targetMovement.update(1);
      targetMovement.update(1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(1, 3)],
        closestToTarget: new Vector2(1, 3),
      });
      targetMovement.update(1);
      expect(mockChar.move).toHaveBeenCalledWith(Direction.DOWN);
    });
  });

  it("should delegate getNeighbours to gridTilemap", () => {
    const charPos = new Vector2(3, 1);
    const targetPos = new Vector2(1, 1);
    targetMovement = new TargetMovement(gridTilemapMock, targetPos);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    let getNeighbours = targetMovement.getNeighbours(charPos);
    expect(getNeighbours).toEqual([]);

    gridTilemapMock.isBlocking.mockReturnValue(false);
    getNeighbours = targetMovement.getNeighbours(charPos);
    expect(getNeighbours).toEqual([
      new Vector2(charPos.x, charPos.y + 1),
      new Vector2(charPos.x + 1, charPos.y),
      new Vector2(charPos.x - 1, charPos.y),
      new Vector2(charPos.x, charPos.y - 1),
    ]);
  });

  it("should not recalculate shortest path on strategy WAIT", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(2, 2));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1), new Vector2(2, 2)],
      closestToTarget: new Vector2(2, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(char.move).not.toHaveBeenCalled();

    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);
    expect(char.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should timeout on strategy WAIT", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(2, 2), 0, {
      pathBlockedWaitTimeoutMs: 2000,
    });
    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1), new Vector2(2, 2)],
      closestToTarget: new Vector2(2, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(2200);
    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(char.move).not.toHaveBeenCalled();
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(0, 1),
      result: Result.PATH_BLOCKED_WAIT_TIMEOUT,
      description: "PathBlockedStrategy WAIT: Wait timeout of 2000ms exceeded.",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should reset timeout on strategy WAIT", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(2, 2), 0, {
      pathBlockedWaitTimeoutMs: 2000,
    });
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1), new Vector2(2, 2)],
      closestToTarget: new Vector2(2, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update(500);
    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    targetMovement.update(1600); // would stop char if timeout NOT reset
    gridTilemapMock.isBlocking.mockReturnValue(false);
    char.move.mockReset();
    // should not have been stopped and therefore move
    targetMovement.update(100);

    expect(char.move).toHaveBeenCalled();
  });

  it("should recalculate shortest path on strategy RETRY", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2), 0, {
      pathBlockedStrategy: PathBlockedStrategy.RETRY,
    });

    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(2, 1), new Vector2(2, 2), new Vector2(3, 2)],
      closestToTarget: new Vector2(3, 2),
    });
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const char = createMockChar("char", new Vector2(2, 1));
    targetMovement.setCharacter(char);
    targetMovement.update(200);

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
    expect(char.move).not.toHaveBeenCalled();

    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(200);

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should recalculate shortest path on strategy RETRY after default backoff", () => {
    const defaultBackoff = 200;
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2), 0, {
      pathBlockedStrategy: PathBlockedStrategy.RETRY,
    });

    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(2, 1), new Vector2(2, 2), new Vector2(3, 2)],
      closestToTarget: new Vector2(3, 2),
    });
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const char = createMockChar("char", new Vector2(2, 1));
    targetMovement.setCharacter(char);
    targetMovement.update(defaultBackoff - 1);
    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    targetMovement.update(1);
    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
  });

  it("should recalculate shortest path on strategy RETRY after custom backoff", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2), 0, {
      pathBlockedStrategy: PathBlockedStrategy.RETRY,
      pathBlockedRetryBackoffMs: 150,
    });

    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(2, 1), new Vector2(2, 2), new Vector2(3, 2)],
      closestToTarget: new Vector2(3, 2),
    });
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const char = createMockChar("char", new Vector2(2, 1));
    targetMovement.setCharacter(char);
    targetMovement.update(100);
    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    targetMovement.update(49);
    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(1);
    targetMovement.update(1);
    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(2);
  });

  it("should recalculate shortest path on strategy RETRY with maxRetries", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2), 0, {
      pathBlockedStrategy: PathBlockedStrategy.RETRY,
      pathBlockedMaxRetries: 2,
    });

    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });

    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(2, 1), new Vector2(2, 2), new Vector2(3, 2)],
      closestToTarget: new Vector2(3, 2),
    });
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const char = createMockChar("char", new Vector2(2, 1));
    targetMovement.setCharacter(char); // call shortestPath initially
    targetMovement.update(200); // retry 1
    targetMovement.update(200); // retry 2
    targetMovement.update(200); // retry 3 should not happen

    expect(mockBfs.getShortestPath).toHaveBeenCalledTimes(3);
    expect(char.move).not.toHaveBeenCalled();
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(1, 1),
      result: Result.PATH_BLOCKED_MAX_RETRIES_EXCEEDED,
      description: "PathBlockedStrategy RETRY: Maximum retries of 2 exceeded.",
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should stop on pathBlockedStrategy STOP", () => {
    gridTilemapMock.isBlocking.mockReturnValue(true);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2));
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    const finishedObsCallbackMock = jest.fn();
    const finishedObsCompleteMock = jest.fn();
    targetMovement.finishedObs().subscribe({
      next: finishedObsCallbackMock,
      complete: finishedObsCompleteMock,
    });
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(2, 1), new Vector2(2, 2), new Vector2(3, 2)],
      closestToTarget: new Vector2(3, 2),
    });
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const char = createMockChar("char", new Vector2(2, 1));
    targetMovement.setCharacter(char);
    targetMovement.update(100);

    gridTilemapMock.isBlocking.mockReturnValue(false);
    targetMovement.update(100);

    expect(char.move).not.toHaveBeenCalled();
    expect(finishedObsCallbackMock).toHaveBeenCalledWith({
      position: new Vector2(1, 1),
      result: Result.PATH_BLOCKED,
      description: `PathBlockedStrategy STOP: Path blocked.`,
    });
    expect(finishedObsCompleteMock).toHaveBeenCalled();
  });

  it("should not block itself", () => {
    gridTilemapMock.isBlocking.mockReturnValue(false);

    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2));
    targetMovement.setPathBlockedStrategy(PathBlockedStrategy.STOP);

    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [new Vector2(2, 1), new Vector2(2, 2), new Vector2(3, 2)],
      closestToTarget: new Vector2(3, 2),
    });
    const char = createMockChar("char", new Vector2(2, 1));
    char.getNextTilePos.mockReturnValue(new Vector2(2, 2));
    targetMovement.setCharacter(char);
    targetMovement.update(1);
    expect(gridTilemapMock.isBlocking).not.toHaveBeenCalledWith(
      new Vector2(2, 2)
    );
    expect(gridTilemapMock.isBlocking).toHaveBeenCalledWith(new Vector2(3, 2));
  });

  describe("finished observable", () => {
    let mockChar;

    beforeEach(() => {
      const targetPos = new Vector2(3, 3);
      targetMovement = new TargetMovement(gridTilemapMock, targetPos);
      mockBfs.getShortestPath = jest.fn().mockReturnValueOnce({
        path: [],
        targetPos,
      });
      mockChar = createMockChar("char", new Vector2(1, 1));
    });

    it("should call fire when char gets new movement", () => {
      mockChar.autoMovementSet.mockReturnValue(of(1));
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);
      targetMovement.setCharacter(mockChar);
      expect(mockCall).toHaveBeenCalledWith({
        position: mockChar.getTilePos(),
        result: Result.MOVEMENT_TERMINATED,
        description:
          "Movement of character has been replaced before destination was reached.",
      });
    });

    it("should complete when char gets new movement", () => {
      mockChar.autoMovementSet.mockReturnValue(of(1));
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe({ complete: mockCall });
      targetMovement.setCharacter(mockChar);
      expect(mockCall).toHaveBeenCalled();
    });

    it("should fire when char arrives", () => {
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos],
        closestToTarget: charPos,
      });
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(100);
      expect(mockCall).toHaveBeenCalledWith({
        position: mockChar.getTilePos(),
        result: Result.SUCCESS,
        description: "Successfully arrived.",
      });
    });

    it("should fire once when char arrives", () => {
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos],
        closestToTarget: charPos,
      });
      const mockCall = jest.fn();
      targetMovement.finishedObs().subscribe(mockCall);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(100);
      targetMovement.update(100);
      expect(mockCall).toHaveBeenCalledTimes(1);
    });
  });

  describe("8 directions", () => {
    it("should get 8 neighbours", () => {
      const charPos = new Vector2(3, 1);
      const targetPos = new Vector2(1, 1);
      targetMovement = new TargetMovement(gridTilemapMock, targetPos);
      targetMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
      gridTilemapMock.isBlocking.mockReturnValue(true);
      let getNeighbours = targetMovement.getNeighbours(charPos);
      expect(getNeighbours).toEqual([]);

      gridTilemapMock.isBlocking.mockReturnValue(false);
      getNeighbours = targetMovement.getNeighbours(charPos);
      expect(getNeighbours).toEqual([
        new Vector2(charPos.x, charPos.y + 1),
        new Vector2(charPos.x + 1, charPos.y),
        new Vector2(charPos.x - 1, charPos.y),
        new Vector2(charPos.x, charPos.y - 1),
        new Vector2(charPos.x + 1, charPos.y + 1),
        new Vector2(charPos.x + 1, charPos.y - 1),
        new Vector2(charPos.x - 1, charPos.y + 1),
        new Vector2(charPos.x - 1, charPos.y - 1),
      ]);
    });

    it("should move up-left along path", () => {
      targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 0));
      targetMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(0, 0)],
        closestToTarget: new Vector2(1, 0),
      });
      const char = createMockChar("char", charPos);
      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.move).toHaveBeenCalledWith(Direction.UP_LEFT);
    });

    it("should move up-right along path", () => {
      targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 0));
      targetMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(2, 0)],
        closestToTarget: new Vector2(1, 0),
      });
      const char = createMockChar("char", charPos);
      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.move).toHaveBeenCalledWith(Direction.UP_RIGHT);
    });

    it("should move down-left along path", () => {
      targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 2));
      targetMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(0, 2)],
        closestToTarget: new Vector2(1, 2),
      });
      const char = createMockChar("char", charPos);
      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.move).toHaveBeenCalledWith(Direction.DOWN_LEFT);
    });

    it("should move down-right along path", () => {
      targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 2));
      targetMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
      const charPos = new Vector2(1, 1);
      mockBfs.getShortestPath = jest.fn().mockReturnValue({
        path: [charPos, new Vector2(2, 2)],
        closestToTarget: new Vector2(1, 2),
      });
      const char = createMockChar("char", charPos);
      targetMovement.setCharacter(char);
      targetMovement.update(100);

      expect(char.move).toHaveBeenCalledWith(Direction.DOWN_RIGHT);
    });

    it("should not move towards closest reachable point if distance is reached", () => {
      const charPos = new Vector2(1, 1);
      const targetPos = new Vector2(3, 3);
      const closestToTarget = new Vector2(2, 2);
      targetMovement = new TargetMovement(gridTilemapMock, targetPos, 2, {
        noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
      });
      targetMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
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
      const mockChar = createMockChar("char", charPos);
      targetMovement.setCharacter(mockChar);
      targetMovement.update(100);
      expect(mockChar.move).not.toHaveBeenCalled();
    });
  });
});
