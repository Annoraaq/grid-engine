import { CollisionStrategy } from "./../../Collisions/CollisionStrategy";
import { NumberOfDirections } from "./../../Direction/Direction";
import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import { of, Subject } from "rxjs";
import {
  GridCharacter,
  PositionChange,
} from "../../GridCharacter/GridCharacter";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache";
import { GridEngineConfig } from "../../GridEngine";
import { Concrete } from "../../Utils/TypeUtils";
describe("CharBlockCache", () => {
  let charBlockCache: CharBlockCache;

  beforeEach(() => {
    charBlockCache = new CharBlockCache();
  });

  it("should detect blocking char after adding", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ x: 3, y: 3 }),
    };

    charBlockCache.addCharacter(char1Mock);
    expect(charBlockCache.isCharBlockingAt(new Vector2(3, 3))).toBe(true);
  });

  it("should not detect non-colliding char after adding", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ x: 3, y: 3 }),
      isColliding: () => false,
    };

    charBlockCache.addCharacter(char1Mock);
    expect(charBlockCache.isCharBlockingAt(new Vector2(3, 3))).toBe(false);
  });

  describe("blocking strategy BLOCK_TWO_TILES", () => {
    beforeEach(() => {
      GlobalConfig.get = jest.fn(() => ({
        ...createMockConf(),
        characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      }));
    });

    it("should block new and old pos on movement", () => {
      const positionChangeStarted = new Subject<PositionChange>();

      const char1Mock = <any>{
        ...createCharMock("player1"),
        getTilePos: () => ({ x: 3, y: 3 }),
        positionChangeStarted: () => positionChangeStarted,
      };
      charBlockCache.addCharacter(char1Mock);
      positionChangeStarted.next({
        enterTile: new Vector2(3, 4),
        exitTile: new Vector2(3, 3),
      });

      const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 3)
      );
      const hasBlockingChar = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4)
      );
      expect(hasBlockingCharOnOldPos).toBe(true);
      expect(hasBlockingChar).toBe(true);
    });

    it("should unblock old pos", () => {
      const positionChangeFinished = new Subject<PositionChange>();

      const char1Mock = <any>{
        ...createCharMock("player1"),
        getTilePos: () => ({ x: 3, y: 3 }),
        positionChangeFinished: () => positionChangeFinished,
      };
      charBlockCache.addCharacter(char1Mock);

      positionChangeFinished.next({
        enterTile: new Vector2(3, 4),
        exitTile: new Vector2(3, 3),
      });

      const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 3)
      );
      expect(hasBlockingCharOnOldPos).toBe(false);
    });
  });

  describe("blocking strategy BLOCK_ONE_TILE_AHEAD", () => {
    beforeEach(() => {
      GlobalConfig.get = jest.fn(() => ({
        ...createMockConf(),
        characterCollisionStrategy: CollisionStrategy.BLOCK_ONE_TILE_AHEAD,
      }));
    });

    it("should block pos on movement and release old one", () => {
      const positionChangeStarted = new Subject<PositionChange>();

      const char1Mock = <any>{
        ...createCharMock("player1"),
        getTilePos: () => ({ x: 3, y: 3 }),
        positionChangeStarted: () => positionChangeStarted,
      };
      charBlockCache.addCharacter(char1Mock);
      positionChangeStarted.next({
        enterTile: new Vector2(3, 4),
        exitTile: new Vector2(3, 3),
      });

      const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 3)
      );
      const hasBlockingChar = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4)
      );
      expect(hasBlockingCharOnOldPos).toBe(false);
      expect(hasBlockingChar).toBe(true);
    });
  });

  it("should consider serveral chars for blocking after pos change", () => {
    const positionChangeStarted = new Subject<PositionChange>();
    const positionChangeFinished = new Subject<PositionChange>();

    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ x: 3, y: 3 }),
    };
    const char2Mock = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ x: 3, y: 2 }),
      positionChangeStarted: () => positionChangeStarted,
      positionChangeFinished: () => positionChangeFinished,
    };

    charBlockCache.addCharacter(char1Mock);
    charBlockCache.addCharacter(char2Mock);
    positionChangeStarted.next({
      enterTile: new Vector2(3, 3),
      exitTile: new Vector2(3, 2),
    });
    positionChangeFinished.next({
      enterTile: new Vector2(3, 3),
      exitTile: new Vector2(3, 2),
    });
    positionChangeStarted.next({
      enterTile: new Vector2(3, 4),
      exitTile: new Vector2(3, 3),
    });
    positionChangeFinished.next({
      enterTile: new Vector2(3, 4),
      exitTile: new Vector2(3, 3),
    });

    expect(charBlockCache.isCharBlockingAt(new Vector2(3, 3))).toBe(true);
  });

  it("should consider several chars for blocking", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ x: 3, y: 3 }),
    };
    const char2Mock = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ x: 3, y: 3 }),
    };

    charBlockCache.addCharacter(char1Mock);
    charBlockCache.addCharacter(char2Mock);

    charBlockCache.removeCharacter(char2Mock);

    const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3)
    );
    expect(hasBlockingCharOnOldPos).toBe(true);
  });

  it("should remove a character", () => {
    const positionChangeStartedSub = { unsubscribe: jest.fn() };
    const positionChangeStarted = {
      subscribe: () => positionChangeStartedSub,
    };
    const positionChangeFinishedSub = { unsubscribe: jest.fn() };
    const positionChangeFinished = {
      subscribe: () => positionChangeFinishedSub,
    };
    const charMock1 = <any>{
      ...createCharMock("player"),
      getTilePos: () => ({ x: 0, y: 1 }),
      getNextTilePos: () => ({ x: 1, y: 1 }),
      positionChangeStarted: () => positionChangeStarted,
      positionChangeFinished: () => positionChangeFinished,
    };
    const charMock2 = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ x: 2, y: 2 }),
      getNextTilePos: () => ({ x: 2, y: 2 }),
    };
    charBlockCache.addCharacter(charMock1);
    charBlockCache.addCharacter(charMock2);
    charBlockCache.removeCharacter(charMock1);

    expect(positionChangeStartedSub.unsubscribe).toHaveBeenCalled();
    expect(positionChangeFinishedSub.unsubscribe).toHaveBeenCalled();
    expect(charBlockCache.isCharBlockingAt(new Vector2(0, 1))).toBe(false);
    expect(charBlockCache.isCharBlockingAt(new Vector2(1, 1))).toBe(false);
  });

  function createCharMock(id = "player"): GridCharacter {
    return <any>{
      getId: () => id,
      isBlockingTile: () => false,
      getTilePos: () => ({ x: 1, y: 1 }),
      getNextTilePos: () => ({ x: 1, y: 1 }),
      positionChangeStarted: () => of([]),
      positionChangeFinished: () => of([]),
      isColliding: () => true,
    };
  }

  function createMockConf(): Concrete<GridEngineConfig> {
    return {
      characters: [],
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
    };
  }
});
