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
    jest.clearAllMocks();
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
    followMovement = new FollowMovement(mockChar, gridTilemapMock, targetChar);
  });

  it("should set character", () => {
    expect(TargetMovement).toHaveBeenCalledWith(
      mockChar,
      gridTilemapMock,
      targetCharPos,
      {
        numberOfDirections: NumberOfDirections.FOUR,
        distance: 1,
        config: { noPathFoundStrategy: NoPathFoundStrategy.STOP },
        ignoreBlockedTarget: true,
      }
    );
  });

  it("should update added character", () => {
    followMovement.update(100);
    expect(mockTargetMovement.update).toHaveBeenCalledWith(100);
  });

  it("should update target on position change", () => {
    const enterTile = { position: new Vector2(7, 7), layer: "layer1" };
    mockTargetMovement.setNumberOfDirections.mockReset();
    mockTargetMovement.setCharacter.mockReset();

    targetChar.positionChangeStartedSubject$.next({
      enterTile: enterTile.position,
      enterLayer: enterTile.layer,
    });

    expect(TargetMovement).toHaveBeenCalledWith(
      mockChar,
      gridTilemapMock,
      enterTile,
      {
        numberOfDirections: NumberOfDirections.FOUR,
        distance: 1,
        config: {
          noPathFoundStrategy: NoPathFoundStrategy.STOP,
        },
        ignoreBlockedTarget: true,
      }
    );
  });

  it("should not update target on position change after autoMovementSet", () => {
    // @ts-ignore
    TargetMovement.mockClear();
    const enterTile = new Vector2(7, 7);
    mockTargetMovement.setNumberOfDirections.mockReset();
    mockTargetMovement.setCharacter.mockReset();

    mockChar.autoMovementSetSubject$.next(undefined);
    targetChar.positionChangeStartedSubject$.next({ enterTile });

    expect(TargetMovement).not.toHaveBeenCalled();
  });

  it("should update target on position change after autoMovementSet if movement is the same", () => {
    // @ts-ignore
    TargetMovement.mockClear();
    const enterTile = new Vector2(7, 7);
    mockTargetMovement.setNumberOfDirections.mockReset();
    mockTargetMovement.setCharacter.mockReset();

    mockChar.autoMovementSetSubject$.next(followMovement);
    targetChar.positionChangeStartedSubject$.next({ enterTile });

    expect(TargetMovement).toHaveBeenCalled();
  });

  it("should update added character with distance", () => {
    followMovement = new FollowMovement(
      mockChar,
      gridTilemapMock,
      targetChar,
      NumberOfDirections.EIGHT,
      7
    );
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      mockChar,
      gridTilemapMock,
      targetCharPos,
      {
        numberOfDirections: NumberOfDirections.EIGHT,
        distance: 8,
        config: { noPathFoundStrategy: NoPathFoundStrategy.STOP },
        ignoreBlockedTarget: true,
      }
    );
  });

  it("should update added character with distance and CLOSEST_REACHABLE", () => {
    followMovement = new FollowMovement(
      mockChar,
      gridTilemapMock,
      targetChar,
      NumberOfDirections.FOUR,
      7,
      NoPathFoundStrategy.CLOSEST_REACHABLE
    );
    followMovement.update(100);
    expect(TargetMovement).toHaveBeenCalledWith(
      mockChar,
      gridTilemapMock,
      targetCharPos,
      {
        numberOfDirections: NumberOfDirections.FOUR,
        distance: 8,
        config: { noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE },
        ignoreBlockedTarget: true,
      }
    );
  });
});
