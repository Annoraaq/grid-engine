import { Direction, NumberOfDirections } from "../../Direction/Direction";
import { TargetMovement } from "./TargetMovement";
import * as Phaser from "phaser";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

const mockBfs = {
  getShortestPath: jest.fn(),
};

jest.mock("../../Algorithms/ShortestPath/Bfs/Bfs", function () {
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
      getTilePos: jest.fn(() => pos),
      move: jest.fn(),
      isMoving: () => false,
      turnTowards: jest.fn(),
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
      path: [charPos, new Vector2(2, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
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
      path: [charPos, new Vector2(2, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

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
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move char arrived at distance", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1), 2);
    const charPos = new Vector2(3, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    const mockChar = createMockChar("char", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
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
    targetMovement.update();

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
    targetMovement.update();

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
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should move down-left along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 2));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(0, 2)],
      closestToTarget: new Vector2(1, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN_LEFT);
  });

  it("should move down-right along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 2));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 2)],
      closestToTarget: new Vector2(1, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN_RIGHT);
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
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.UP);
  });

  it("should move up-left along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 0));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(0, 0)],
      closestToTarget: new Vector2(1, 0),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.UP_LEFT);
  });

  it("should move up-right along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 0));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 0)],
      closestToTarget: new Vector2(1, 0),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.UP_RIGHT);
  });

  it("should not move along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 1));
    const charPos = new Vector2(1, 1);
    mockBfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: new Vector2(1, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).not.toHaveBeenCalled();
  });

  it("should move towards closest reachable point if path is blocked", () => {
    targetMovement = new TargetMovement(
      gridTilemapMock,
      new Vector2(3, 1),
      0,
      true
    );
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
    targetMovement.update();

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
    targetMovement = new TargetMovement(gridTilemapMock, targetPos, 2, true);
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
    targetMovement.update();
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
    targetMovement.update();
    expect(char.turnTowards).toHaveBeenCalledWith(Direction.DOWN);

    expect(char.move).not.toHaveBeenCalled();
  });

  it("should not move if distance reached or will be reached", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 2));
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 2)],
      closestToTarget: new Vector2(1, 2),
    });
    const char = createMockChar("char", charPos);
    char.isMoving = () => true;
    targetMovement.setCharacter(char);
    targetMovement.update();
    expect(char.turnTowards).toHaveBeenCalledWith(Direction.DOWN);

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
    targetMovement.update();
    expect(mockChar.move).toHaveBeenCalledWith(Direction.NONE);
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

  it("should not block on target pos", () => {
    const charPos = new Vector2(3, 1);
    const targetPos = new Vector2(2, 1);
    targetMovement = new TargetMovement(gridTilemapMock, targetPos);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const getNeighbours = targetMovement.getNeighbours(charPos);
    expect(getNeighbours).toEqual([new Vector2(charPos.x - 1, charPos.y)]);
  });
});
