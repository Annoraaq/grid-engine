import { FollowMovement } from "./FollowMovement";
import * as Phaser from "phaser";
import { TargetMovement } from "../TargetMovement/TargetMovement";

const mockTargetMovement = {
  setCharacter: jest.fn(),
  update: jest.fn(),
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
    mockTargetMovement.setCharacter.mockReset();
  });

  it("should update added character", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement = new FollowMovement(gridTilemapMock, targetChar);
    followMovement.setCharacter(mockChar);
    followMovement.update();
    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      targetCharPos,
      1,
      false
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });

  it("should update added character with distance", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement = new FollowMovement(gridTilemapMock, targetChar, 7);
    followMovement.setCharacter(mockChar);
    followMovement.update();
    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      targetCharPos,
      8,
      false
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });

  it("should update added character with distance and closestPointIfBlocked", () => {
    const charPos = new Phaser.Math.Vector2(1, 1);
    const targetCharPos = new Phaser.Math.Vector2(3, 1);
    const mockChar = createMockChar("char", charPos);
    const targetChar = createMockChar("targetChar", targetCharPos);
    followMovement = new FollowMovement(gridTilemapMock, targetChar, 7, true);
    followMovement.setCharacter(mockChar);
    followMovement.update();
    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      targetCharPos,
      8,
      true
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });
});
