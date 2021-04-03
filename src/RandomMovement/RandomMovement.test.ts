/*eslint no-global-assign: "off"*/
import * as Phaser from "phaser";
import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { RandomMovement } from "./RandomMovement";

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

describe("RandomMovement", () => {
  let randomMovement: RandomMovement;

  function mockRandom(val: number) {
    const mockMath = Object.create(Math);
    mockMath.random = () => val;
    Math = mockMath;
  }

  beforeEach(() => {
    randomMovement = new RandomMovement();
  });

  it("should add and update character", () => {
    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
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
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock);
    randomMovement.addCharacter(char2Mock);
    randomMovement.removeCharacter("char2");
    randomMovement.update(5);

    expect(char1Mock.move).toHaveBeenCalled();
    expect(char2Mock.move).not.toHaveBeenCalled();
  });

  it("should update only non-blocked characters", () => {
    const mockMath = Object.create(Math);
    mockMath.random = () => 0.5;
    Math = mockMath;

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => true,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock);
    randomMovement.addCharacter(char2Mock);
    randomMovement.update(5);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.DOWN);
    expect(char2Mock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should not move further than radius", () => {
    const mockMath = Object.create(Math);
    mockMath.random = () => 0.5;
    Math = mockMath;

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock, 0, 2);
    char1Mock.getTilePos = () => new Vector2(2, 2);
    randomMovement.update(1);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.NONE);
  });

  it("should move further than radius if radius is -1", () => {
    mockRandom(0.5);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock, 0, -1);
    char1Mock.getTilePos = () => new Vector2(2, 2);
    randomMovement.update(1);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.DOWN);
  });

  it("should continue moving if in radius and step size", () => {
    mockRandom(0.7);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock, 0, 2);

    // do first step down and set step size 2
    randomMovement.update(500);
    expect(char1Mock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    // next random direction would be up
    mockRandom(0.1);

    // do next step which is still smaller than step size
    randomMovement.update(500);
    expect(char1Mock.move).toHaveBeenNthCalledWith(2, Direction.DOWN);

    // do next step which exceeds step size. New random direction (up)
    // should be taken
    randomMovement.update(500);
    expect(char1Mock.move).toHaveBeenNthCalledWith(3, Direction.UP);
  });

  it("should not continue moving if direction blocked", () => {
    mockRandom(0.7);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock, 50, 2);

    // do first step down and set step size 2
    randomMovement.update(60);
    expect(char1Mock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);
    expect(char1Mock.move).toHaveBeenCalledTimes(1);

    char1Mock.isBlockingDirection = () => true;

    // do next step which is blocked
    randomMovement.update(1);
    expect(char1Mock.move).toHaveBeenCalledTimes(1);
  });

  it("should not continue moving if direction is out of radius", () => {
    mockRandom(0.7);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock, 50, 2);

    // do first step down and set step size 2
    randomMovement.update(60);
    expect(char1Mock.move).toHaveBeenNthCalledWith(1, Direction.DOWN);

    char1Mock.getTilePos = () => new Vector2(2, 2);

    // do next step which is out of radius
    randomMovement.update(1);
    expect(char1Mock.move).toHaveBeenCalledTimes(1);
  });

  it("should reset step size and steps walked on direction change", () => {
    mockRandom(0.7);

    const char1Mock: GridCharacter = <any>{
      getId: () => "char1",
      isBlockingDirection: () => false,
      move: jest.fn(),
      getTilePos: () => new Vector2(0, 0),
      isMoving: () => false,
    };
    randomMovement.addCharacter(char1Mock, 0, 2);

    // do first step down and init step size with 2
    randomMovement.update(500);
    // walk down
    randomMovement.update(500);

    // walk up and reset step size and walked steps
    mockRandom(0.1);
    randomMovement.update(500);

    // next random direction would be down,
    // because step size was reset to 1
    mockRandom(0.7);
    randomMovement.update(500);

    expect(char1Mock.move).toHaveBeenNthCalledWith(4, Direction.DOWN);
  });
});
