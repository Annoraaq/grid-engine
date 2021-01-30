import { Direction } from "./../Direction/Direction";
import { TargetMovement } from "./TargetMovement";
import * as Phaser from "phaser";
import { Bfs } from "../Algorithms/ShortestPath/Bfs/Bfs";
describe("TargetMovement", () => {
  let targetMovement: TargetMovement;
  let gridTilemapMock;

  function createMockChar(id: string, pos: Phaser.Math.Vector2) {
    return <any>{
      getId: () => id,
      getTilePos: jest.fn(() => pos),
      move: jest.fn(),
      isMoving: () => false,
    };
  }
  beforeEach(() => {
    gridTilemapMock = {
      hasBlockingTile: jest.fn(),
      hasNoTile: jest.fn(),
      hasBlockingChar: jest.fn().mockReturnValue(false),
      isBlocking: jest.fn(),
    };
    targetMovement = new TargetMovement(gridTilemapMock);
    Bfs.getShortestPath = jest.fn();
  });

  it("should move char in correct direction", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Phaser.Math.Vector2(2, 1)],
      closestToTarget: new Phaser.Math.Vector2(3, 1),
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(Bfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Phaser.Math.Vector2(3, 1),
      expect.any(Function)
    );
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move all standing chars", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Phaser.Math.Vector2(2, 1)],
      closestToTarget: new Phaser.Math.Vector2(3, 1),
    });
    const standingChar = createMockChar("char1", charPos);
    const standingChar2 = createMockChar("char2", charPos);
    const movingChar = createMockChar("char3", charPos);
    movingChar.isMoving = () => true;
    targetMovement.addCharacter(standingChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.addCharacter(standingChar2, new Phaser.Math.Vector2(3, 1));
    targetMovement.addCharacter(movingChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();

    expect(Bfs.getShortestPath).toHaveBeenCalledTimes(2);
    expect(standingChar.move).toHaveBeenCalledWith(Direction.RIGHT);
    expect(standingChar2.move).toHaveBeenCalledWith(Direction.RIGHT);
    expect(movingChar.move).not.toHaveBeenCalled();
  });

  it("should not move arrived char", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move char arrived at distance", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: charPos,
    });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1), 2);
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should move right along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Phaser.Math.Vector2(2, 1)],
      closestToTarget: new Phaser.Math.Vector2(2, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(2, 1));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move left along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Phaser.Math.Vector2(0, 1)],
      closestToTarget: new Phaser.Math.Vector2(0, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(0, 1));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should move down along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Phaser.Math.Vector2(1, 2)],
      closestToTarget: new Phaser.Math.Vector2(1, 2),
    });
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 2));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should move up along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos, new Phaser.Math.Vector2(1, 0)],
      closestToTarget: new Phaser.Math.Vector2(1, 0),
    });
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 0));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.UP);
  });

  it("should not move along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [charPos],
      closestToTarget: new Phaser.Math.Vector2(1, 1),
    });
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 1));
    targetMovement.update();

    expect(char.move).not.toHaveBeenCalled();
  });

  it("should move towards closest reachable point if path is blocked", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Phaser.Math.Vector2(2, 1),
      })
      .mockReturnValueOnce({
        path: [charPos, new Phaser.Math.Vector2(2, 1)],
        closestToTarget: new Phaser.Math.Vector2(2, 1),
      });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(
      mockChar,
      new Phaser.Math.Vector2(3, 1),
      0,
      true
    );
    targetMovement.update();

    expect(Bfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Phaser.Math.Vector2(3, 1),
      expect.any(Function)
    );
    expect(Bfs.getShortestPath).toHaveBeenCalledWith(
      charPos,
      new Phaser.Math.Vector2(2, 1),
      expect.any(Function)
    );
    expect(mockChar.move).toHaveBeenCalled();
  });

  it("should not move towards closest reachable point if distance is reached", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValueOnce({
        path: [],
        closestToTarget: new Phaser.Math.Vector2(2, 1),
      })
      .mockReturnValueOnce({
        path: [charPos, new Phaser.Math.Vector2(2, 1)],
        closestToTarget: new Phaser.Math.Vector2(2, 1),
      });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, targetPos, 2, true);
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if distance reached", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue({
      path: [
        charPos,
        new Phaser.Math.Vector2(1, 2),
        new Phaser.Math.Vector2(1, 3),
      ],
      closestToTarget: new Phaser.Math.Vector2(1, 3),
    });
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 3), 3);
    targetMovement.update();

    expect(char.move).not.toHaveBeenCalled();
  });

  it("should not move deleted char", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(3, 2)]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 2));
    targetMovement.removeCharacter("char1");
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should not move if no path exists", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue({ path: [], closestToDistance: charPos });
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 2));
    targetMovement.update();
    expect(mockChar.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should delegate isBlocking to gridTilemap", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    const targetPos = new Phaser.Math.Vector2(1, 1);
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
    const charPos = new Phaser.Math.Vector2(3, 1);
    const targetPos = new Phaser.Math.Vector2(3, 1);
    gridTilemapMock.isBlocking.mockReturnValue(true);
    let blocking = targetMovement.isBlocking(targetPos)(charPos);
    expect(blocking).toEqual(false);
    expect(gridTilemapMock.isBlocking).not.toHaveBeenCalled();
  });

  it("should clear all chars", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(3, 2)]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 2));
    targetMovement.clear();
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });
});
