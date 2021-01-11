import { Direction } from "./../Direction/Direction";
import { TargetMovement } from "./TargetMovement";
import * as Phaser from "phaser";
describe("TargetMovement", () => {
  let targetMovement: TargetMovement;

  function createMockChar(id: string, pos: Phaser.Math.Vector2) {
    return <any>{
      getId: () => id,
      getTilePos: jest.fn(() => pos),
      move: jest.fn(),
    };
  }
  beforeEach(() => {
    targetMovement = new TargetMovement();
  });

  it("should move char in correct direction", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update(1);
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move all chars", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const mockChar = createMockChar("char1", charPos);
    const mockChar2 = createMockChar("char2", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.addCharacter(mockChar2, new Phaser.Math.Vector2(3, 1));
    targetMovement.update(1);
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
    expect(mockChar2.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should not move arrived char", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update(1);
    expect(mockChar.move).not.toHaveBeenCalled();
  });
});
