import { FollowMovement } from "./FollowMovement";

const mockTargetMovement = {
  addCharacter: jest.fn(),
  removeCharacter: jest.fn(),
  update: jest.fn(),
  clear: jest.fn(),
};

jest.mock("../TargetMovement/TargetMovement", () => ({
  TargetMovement: jest.fn(function () {
    return mockTargetMovement;
  }),
}));

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
    mockTargetMovement.addCharacter.mockReset();
    mockTargetMovement.removeCharacter.mockReset();
    mockTargetMovement.clear.mockReset();
  });

  it("should update added character", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement.addCharacter(mockChar, targetChar);
    followMovement.update();
    expect(mockTargetMovement.addCharacter).toHaveBeenCalledWith(
      mockChar,
      targetCharPos
    );
  });

  it("should not update deleted char", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement.addCharacter(mockChar, targetChar);
    followMovement.removeCharacter("char");
    followMovement.update();
    expect(mockTargetMovement.addCharacter).not.toHaveBeenCalled();
  });
});
