import { Direction } from "../Direction/Direction";
import { FollowMovement } from "./FollowMovement";
describe("FollowMovement", () => {
  let followMovement: FollowMovement;
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
    followMovement = new FollowMovement(gridTilemapMock);
  });

  it("should move char in correct direction", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement.addCharacter(mockChar, targetChar);
    followMovement.update();
    expect(mockChar.move).toHaveBeenCalledWith(Direction.RIGHT);
  });

  it("should not move deleted char", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement.addCharacter(mockChar, targetChar);
    followMovement.removeCharacter("char");
    followMovement.update();
    expect(mockChar.move).not.toHaveBeenCalled();
  });
});
