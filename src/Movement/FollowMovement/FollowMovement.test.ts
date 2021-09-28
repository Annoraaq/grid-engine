import { LayerPosition } from "./../../Pathfinding/ShortestPathAlgorithm";
import { NumberOfDirections } from "./../../Direction/Direction";
import { FollowMovement } from "./FollowMovement";
import { TargetMovement } from "../TargetMovement/TargetMovement";
import { Subject } from "rxjs";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { NoPathFoundStrategy } from "../../Pathfinding/NoPathFoundStrategy";

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
  let targetCharPos: LayerPosition;
  let targetChar;

  function createMockChar(id: string, pos: LayerPosition) {
    return <any>{
      positionChangeStartedSubject$: new Subject(),
      autoMovementSetSubject$: new Subject(),
      getId: () => id,
      getTilePos: jest.fn(() => pos),
      move: jest.fn(),
      isMoving: () => false,
      positionChangeStarted: function () {
        return this.positionChangeStartedSubject$;
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
    const charPos = { position: new Vector2(1, 1), layer: "layer1" };
    targetCharPos = { position: new Vector2(3, 1), layer: "layer1" };
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
      { noPathFoundStrategy: NoPathFoundStrategy.STOP }
    );
    expect(mockTargetMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });

  it("should update added character", () => {
    followMovement.setCharacter(mockChar);
    followMovement.update(100);
    expect(mockTargetMovement.update).toHaveBeenCalledWith(100);
  });

  it("should pass number of directions", () => {
    followMovement.setNumberOfDirections(NumberOfDirections.EIGHT);
    followMovement.setCharacter(mockChar);
    followMovement.update(100);
    expect(mockTargetMovement.setNumberOfDirections).toHaveBeenCalledWith(
      NumberOfDirections.EIGHT
    );
  });

  it("should update target on position change", () => {
    followMovement.setCharacter(mockChar);

    const enterTile = { position: new Vector2(7, 7), layer: "layer1" };
    mockTargetMovement.setNumberOfDirections.mockReset();
    mockTargetMovement.setCharacter.mockReset();

    targetChar.positionChangeStartedSubject$.next({
      enterTile: enterTile.position,
      enterLayer: enterTile.layer,
    });

    expect(TargetMovement).toHaveBeenCalledWith(gridTilemapMock, enterTile, 1, {
      noPathFoundStrategy: NoPathFoundStrategy.STOP,
    });
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
    targetChar.positionChangeStartedSubject$.next({ enterTile });

    expect(TargetMovement).not.toHaveBeenCalledWith(
      gridTilemapMock,
      enterTile,
      1,
      { noPathFoundStrategy: NoPathFoundStrategy.STOP }
    );
    expect(mockTargetMovement.setNumberOfDirections).not.toHaveBeenCalledWith(
      NumberOfDirections.FOUR
    );
    expect(mockTargetMovement.setCharacter).not.toHaveBeenCalledWith(mockChar);
  });

  it("should update added character with distance", () => {
    followMovement = new FollowMovement(gridTilemapMock, targetChar, 7);
    followMovement.setCharacter(mockChar);
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      targetCharPos,
      8,
      { noPathFoundStrategy: NoPathFoundStrategy.STOP }
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });

  it("should update added character with distance and CLOSEST_REACHABLE", () => {
    followMovement = new FollowMovement(
      gridTilemapMock,
      targetChar,
      7,
      NoPathFoundStrategy.CLOSEST_REACHABLE
    );
    followMovement.setCharacter(mockChar);
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      gridTilemapMock,
      targetCharPos,
      8,
      { noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE }
    );
    expect(mockTargetMovement.setCharacter).toHaveBeenCalledWith(mockChar);
  });
});
