import * as Phaser from "phaser";
import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { RandomMovement } from "./RandomMovement";

describe("RandomMovement", () => {
  let randomMovement: RandomMovement;

  beforeEach(() => {
    randomMovement = new RandomMovement();
  });

  it("should add and update character", () => {
    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Phaser.Math.Vector2(0, 0),
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Phaser.Math.Vector2(0, 0),
    };
    randomMovement.addCharacter(char1Mock);
    randomMovement.addCharacter(char2Mock, 10);
    randomMovement.update(5);

    expect(char1Mock.move).toHaveBeenCalled();
    expect(char2Mock.move).not.toHaveBeenCalled();

    randomMovement.update(6);

    expect(char2Mock.move).toHaveBeenCalled();
  });

  it("should remove character", () => {
    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Phaser.Math.Vector2(0, 0),
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Phaser.Math.Vector2(0, 0),
    };
    randomMovement.addCharacter(char1Mock);
    randomMovement.addCharacter(char2Mock);
    randomMovement.removeCharacter(char2Mock);
    randomMovement.update(5);

    expect(char1Mock.move).toHaveBeenCalled();
    expect(char2Mock.move).not.toHaveBeenCalled();
  });

  it("should update only non-blocked characters", () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Phaser.Math.Vector2(0, 0),
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => true,
      move: jest.fn(),
      getTilePos: () => new Phaser.Math.Vector2(0, 0),
    };
    randomMovement.addCharacter(char1Mock);
    randomMovement.addCharacter(char2Mock);
    randomMovement.update(5);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.DOWN);
    expect(char2Mock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should not move further than radius", () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    const vec = new Phaser.Math.Vector2(0, 0);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => vec,
    };
    randomMovement.addCharacter(char1Mock, 0, 2);
    vec.x = 2;
    vec.y = 2;
    randomMovement.update(1);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should move further than radius if radius is -1", () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    const vec = new Phaser.Math.Vector2(0, 0);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => vec,
    };
    randomMovement.addCharacter(char1Mock, 0, -1);
    vec.x = 2;
    vec.y = 2;
    randomMovement.update(1);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.DOWN);
  });
});
