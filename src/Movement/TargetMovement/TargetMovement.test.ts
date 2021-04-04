import { Direction } from "../../Direction/Direction";
import { TargetMovement } from "./TargetMovement";
import * as Phaser from "phaser";
import { Bfs } from "../../Algorithms/ShortestPath/Bfs/Bfs";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

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
    Bfs.getShortestPath = jest.fn();
  });

  it("should move char in correct direction", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
    expect(Bfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Vector2(3, 1),
      expect.any(Function)
    );
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move char", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(2, 1)],
      closestToTarget: new Vector2(3, 1),
    });
    const char1 = createMockChar("char1", charPos);
    targetMovement.setCharacter(char1);
    targetMovement.update();

    expect(Bfs.getShortestPath).toHaveBeenCalledTimes(1);
    expect(char1.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should not move arrived char", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1));
    const charPos = new Vector2(3, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move char arrived at distance", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 1), 2);
    const charPos = new Vector2(3, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should move right along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(2, 1));
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
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
    Bfs.getShortestPath = jest.fn().mockReturnValue({
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
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 2)],
      closestToTarget: new Vector2(1, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should move up along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 0));
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 0)],
      closestToTarget: new Vector2(1, 0),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.UP);
  });

  it("should not move along path", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 1));
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
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
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Vector2(2, 1),
      })
      .mockReturnValueOnce({
        path: [charPos, new Vector2(2, 1)],
        closestToTarget: new Vector2(2, 1),
      });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();

    expect(Bfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Vector2(3, 1),
      expect.any(Function)
    );
    expect(Bfs.getShortestPath).toHaveBeenCalledWith(
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
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Vector2(2, 1),
      })
      .mockReturnValueOnce({
        path: [charPos, new Vector2(2, 1)],
        closestToTarget: new Vector2(2, 1),
      });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if distance reached", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(1, 3), 3);
    const charPos = new Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Vector2(1, 2), new Vector2(1, 3)],
      closestToTarget: new Vector2(1, 3),
    });
    const char = createMockChar("char", charPos);
    targetMovement.setCharacter(char);
    targetMovement.update();
    expect(char.turnTowards).toHaveBeenCalledWith(Direction.DOWN);

    expect(char.move).not.toHaveBeenCalled();
  });

  it("should not move deleted char", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2));
    const charPos = new Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Vector2(3, 2)]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.removeCharacter("char1");
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if no path exists", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2));
    const charPos = new Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue({ path: [], closestToDistance: charPos });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.update();
    expect(mockChar.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should delegate isBlocking to gridTilemap", () => {
    const charPos = new Vector2(3, 1);
    const targetPos = new Vector2(1, 1);
    targetMovement = new TargetMovement(gridTilemapMock, targetPos);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    let blocking = targetMovement.isBlocking(targetPos)(charPos);
    expect(blocking).toEqual(true);
    expect(gridTilemapMock.isBlocking).toHaveBeenCalledWith(charPos);

    gridTilemapMock.isBlocking.mockReturnValue(false);
    blocking = targetMovement.isBlocking(targetPos)(charPos);
    expect(blocking).toEqual(false);
    expect(gridTilemapMock.isBlocking).toHaveBeenCalledWith(charPos);
  });

  it("should not block on target pos", () => {
    const charPos = new Vector2(3, 1);
    const targetPos = new Vector2(3, 1);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    const blocking = targetMovement.isBlocking(targetPos)(charPos);
    expect(blocking).toEqual(false);
    expect(gridTilemapMock.isBlocking).not.toHaveBeenCalled();
  });

  it("should clear all chars", () => {
    targetMovement = new TargetMovement(gridTilemapMock, new Vector2(3, 2));
    const charPos = new Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Vector2(3, 2)]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.setCharacter(mockChar);
    targetMovement.clear();
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });
});
