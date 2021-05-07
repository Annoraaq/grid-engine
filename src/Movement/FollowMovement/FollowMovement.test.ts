import { NumberOfDirections } from "./../../Direction/Direction";
import { FollowMovement } from "./FollowMovement";
import * as Phaser from "phaser";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Subject } from "rxjs";

type Vector2 = Phaser.Math.Vector2;
const Vector2 = Phaser.Math.Vector2;

const mockTargetMovement = {
  setCharacter: jest.fn(),
  update: jest.fn(),
  setNumberOfDirections: jest.fn(),
};

jest.mock("../TargetMovement/TargetMovement", () => ({
  TargetMovement: jest.fn(function () {
    return mockTargetMovement;
  }),
}));

describe("FollowMovement", () => {
  let followMovement: FollowMovement;
  let gridTilemapMock;
  let mockChar;
  let targetCharPos: Vector2;
  let targetChar;

  function createMockChar(id: string, pos: Phaser.Math.Vector2) {
    return <any>{
      positionChangedSubject$: new Subject(),
      autoMovementSetSubject$: new Subject(),
      getId: () => id,
      getTilePos: jest.fn(() => pos),
      move: jest.fn(),
      isMoving: () => false,
      positionChanged: function () {
        return this.positionChangedSubject$;
      },
      autoMovementSet: function () {
        return this.autoMovementSetSubject$;
      },
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
    const charPos = new Vector2(1, 1);
    targetCharPos = new Vector2(3, 1);
    mockChar = createMockChar("char", charPos);
    targetChar = createMockChar("targetChar", targetCharPos);
    followMovement = new FollowMovement(gridTilemapMock, targetChar);
  });

  it("should set character", () => {
    followMovement.setCharacter(mockChar);
    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      targetCharPos,
      1,
      false
    );
    expect(mockTargetMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });

  it("should update added character", () => {
    followMovement.setCharacter(mockChar);
    followMovement.update();
    expect(mockTargetMovement.update).toHaveBeenCalled();
  });

  it("should pass number of directions", () => {
    followMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
    followMovement.setCharacter(mockChar);
    followMovement.update();
    expect(mockTargetMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.EIGHT
    );
  });

  it("should update target on position change", () => {
    followMovement.setCharacter(mockChar);

    const enterTile = new Vector2(7, 7);
    mockTargetMovement.setNumberOfDirections.mockReset();
    mockTargetMovement.setCharacter.mockReset();

    targetChar.positionChangedSubject$.next({ enterTile });

    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      enterTile,
      1,
      false
    );
    expect(mockTargetMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });

  it("should not update target on position change after autoMovementSet", () => {
    followMovement.setCharacter(mockChar);

    const enterTile = new Vector2(7, 7);
    mockTargetMovement.setNumberOfDirections.mockReset();
    mockTargetMovement.setCharacter.mockReset();

    mockChar.autoMovementSetSubject$.next();
    targetChar.positionChangedSubject$.next({ enterTile });

    expect(TargetMovement).not.toHaveBeenCalledWith(
      gridTilemapMock,
      enterTile,
      1,
      false
    );
    expect(mockTargetMovement.setNumberOfDirections).not.toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockTargetMovement.setCharacter).not.toHaveBeenCalledWith(mockChar);
  });

  it("should update added character with distance", () => {
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
