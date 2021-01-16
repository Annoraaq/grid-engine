import { Direction } from "./../Direction/Direction";
import { TargetMovement } from "./TargetMovement";
import * as Phaser from "phaser";
import { Bfs } from "../Algorithms/ShortestPath/Bfs/Bfs";
describe("TargetMovement", () => {
  let targetMovement: TargetMovement;

  function createMockChar(id: string, pos: Phaser.Math.Vector2) {
    return <any>{
      getId: () => id,
      getTilePos: jest.fn(() => pos),
      move: jest.fn(),
      isMoving: () => false,
    };
  }
  beforeEach(() => {
    targetMovement = new TargetMovement();
    Bfs.getShortestPath = jest.fn();
  });

  it("should move char in correct direction", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(2, 1)]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move all standing chars", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(2, 1)]);
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
    Bfs.getShortestPath = jest.fn().mockReturnValue([charPos]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });

  it("should move left along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(2, 1)]);
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(2, 1));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move right along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(0, 1)]);
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(0, 1));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.LEFT);
  });

  it("should move down along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(1, 2)]);
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 2));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should move up along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(1, 0)]);
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 0));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.UP);
  });

  it("should not move along path", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    Bfs.getShortestPath = jest
      .fn()
      .mockReturnValue([charPos, new Phaser.Math.Vector2(1, 1)]);
    const char = createMockChar("char", charPos);
    targetMovement.addCharacter(char, new Phaser.Math.Vector2(1, 0));
    targetMovement.update();

    expect(char.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should not move deleted char", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    Bfs.getShortestPath = jest.fn().mockReturnValue([charPos]);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.removeCharacter(mockChar);
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });
});
