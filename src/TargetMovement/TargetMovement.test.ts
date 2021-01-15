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
      isMoving: () => false,
    };
  }
  beforeEach(() => {
    targetMovement = new TargetMovement();
  });

  it("should move char in correct direction", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should move all standing chars", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const standingChar = createMockChar("char1", charPos);
    const standingChar2 = createMockChar("char2", charPos);
    const movingChar = createMockChar("char3", charPos);
    movingChar.isMoving = () => true;
    targetMovement.addCharacter(standingChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.addCharacter(standingChar2, new Phaser.Math.Vector2(3, 1));
    targetMovement.addCharacter(movingChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(standingChar.move).toHaveBeenCalledWith(Direction.RIGHT);
    expect(standingChar2.move).toHaveBeenCalledWith(Direction.RIGHT);
    expect(movingChar.move).not.toHaveBeenCalled();
  });

  it("should not move arrived char", () => {
    const charPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char1", charPos);
    targetMovement.addCharacter(mockChar, new Phaser.Math.Vector2(3, 1));
    targetMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });
});
