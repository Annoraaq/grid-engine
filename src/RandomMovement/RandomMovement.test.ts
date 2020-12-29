import { Direction } from "./../Direction/Direction";
import { GridCharacter } from "./../GridCharacter/GridCharacter";
import { RandomMovement } from "./RandomMovement";
import * as Phaser from "phaser";

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
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => false,
      move: jest.fn(),
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
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: () => false,
      move: jest.fn(),
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
    };
    const char2Mock: GridCharacter = <any>{
      getId: () => "char2",
      isBlockingDirection: (dir) => dir !== Direction.NONE,
      move: jest.fn(),
    };
    randomMovement.addCharacter(char1Mock);
    randomMovement.addCharacter(char2Mock);
    randomMovement.update(5);

    expect(char1Mock.move).toHaveBeenCalledWith(Direction.DOWN);
    expect(char2Mock.move).toHaveBeenCalledWith(Direction.NONE);
  });
});
