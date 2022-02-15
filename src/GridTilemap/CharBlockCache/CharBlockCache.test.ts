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
import { GridEngineConfig, Position } from "../../GridEngine";
import { Concrete } from "../../Utils/TypeUtils";
describe("CharBlockCache", () => {
  let charBlockCache: CharBlockCache;

  beforeEach(() => {
    charBlockCache = new CharBlockCache();
  });

  it("should detect blocking char after adding", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
    };

    charBlockCache.addCharacter(char1Mock);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(3, 3), "someLayer")
    ).toBe(true);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(3, 3), "otherLayer")
    ).toBe(false);
  });

  it("should not detect non-colliding char after adding", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
      collidesWithTiles: () => false,
    };

    charBlockCache.addCharacter(char1Mock);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(3, 3), "someLayer")
    ).toBe(false);
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
        getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
        positionChangeStarted: () => positionChangeStarted,
      };
      charBlockCache.addCharacter(char1Mock);
      positionChangeStarted.next({
        enterTile: new Vector2(3, 4),
        exitTile: new Vector2(3, 3),
        enterLayer: "enterLayer",
        exitLayer: "someLayer",
      });

      const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 3),
        "someLayer"
      );
      const hasBlockingChar = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4),
        "enterLayer"
      );
      expect(hasBlockingCharOnOldPos).toBe(true);
      expect(hasBlockingChar).toBe(true);
    });

    it("should unblock old pos", () => {
      const positionChangeFinished = new Subject<PositionChange>();

      const char1Mock = <any>{
        ...createCharMock("player1"),
        getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
        positionChangeFinished: () => positionChangeFinished,
      };
      charBlockCache.addCharacter(char1Mock);

      positionChangeFinished.next({
        enterTile: new Vector2(3, 4),
        exitTile: new Vector2(3, 3),
        enterLayer: "enterLayer",
        exitLayer: "someLayer",
      });

      const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 3),
        "someLayer"
      );
      expect(hasBlockingCharOnOldPos).toBe(false);
    });

    it("should unblock nextPos on pos change while moving", () => {
      const positionChangeStarted = new Subject<PositionChange>();
      const tilePosSet = new Subject<Position>();

      const char1Mock = <any>{
        ...createCharMock("player1"),
        getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
        getNextTilePos: () => ({
          position: { x: 3, y: 3 },
          layer: "someLayer",
        }),
        positionChangeStarted: () => positionChangeStarted,
        tilePositionSet: () => tilePosSet,
      };
      charBlockCache.addCharacter(char1Mock);

      char1Mock.getNextTilePos = () => ({
        position: { x: 3, y: 4 },
        layer: "someLayer",
      });

      positionChangeStarted.next({
        enterTile: new Vector2(3, 4),
        enterLayer: "someLayer",
        exitTile: new Vector2(3, 3),
        exitLayer: "someLayer",
      });

      tilePosSet.next({
        x: 6,
        y: 6,
      });

      const hasBlockingCharOnNextPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4),
        "someLayer"
      );
      expect(hasBlockingCharOnNextPos).toBe(false);
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
        getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
        positionChangeStarted: () => positionChangeStarted,
      };
      charBlockCache.addCharacter(char1Mock);
      positionChangeStarted.next({
        enterTile: new Vector2(3, 4),
        exitTile: new Vector2(3, 3),
        enterLayer: "enterLayer",
        exitLayer: "someLayer",
      });

      const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 3),
        "someLayer"
      );
      const hasBlockingChar = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4),
        "enterLayer"
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
      getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
    };
    const char2Mock = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ position: { x: 3, y: 2 }, layer: "someLayer" }),
      positionChangeStarted: () => positionChangeStarted,
      positionChangeFinished: () => positionChangeFinished,
    };

    charBlockCache.addCharacter(char1Mock);
    charBlockCache.addCharacter(char2Mock);
    positionChangeStarted.next({
      enterTile: new Vector2(3, 3),
      exitTile: new Vector2(3, 2),
      enterLayer: "someLayer",
      exitLayer: "someLayer",
    });
    positionChangeFinished.next({
      enterTile: new Vector2(3, 3),
      exitTile: new Vector2(3, 2),
      enterLayer: "someLayer",
      exitLayer: "someLayer",
    });
    positionChangeStarted.next({
      enterTile: new Vector2(3, 4),
      exitTile: new Vector2(3, 3),
      enterLayer: "someLayer",
      exitLayer: "someLayer",
    });
    positionChangeFinished.next({
      enterTile: new Vector2(3, 4),
      exitTile: new Vector2(3, 3),
      enterLayer: "someLayer",
      exitLayer: "someLayer",
    });

    expect(
      charBlockCache.isCharBlockingAt(new Vector2(3, 3), "someLayer")
    ).toBe(true);
  });

  it("should consider several chars for blocking", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
    };
    const char2Mock = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
    };

    charBlockCache.addCharacter(char1Mock);
    charBlockCache.addCharacter(char2Mock);

    charBlockCache.removeCharacter(char2Mock);

    const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer"
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
    const tilePosChangedSub = { unsubscribe: jest.fn() };
    const tilePosSet = {
      subscribe: () => tilePosChangedSub,
    };
    const charMock1 = <any>{
      ...createCharMock("player"),
      getTilePos: () => ({ position: { x: 0, y: 1 }, layer: "someLayer" }),
      getNextTilePos: () => ({ position: { x: 1, y: 1 }, layer: "someLayer" }),
      positionChangeStarted: () => positionChangeStarted,
      positionChangeFinished: () => positionChangeFinished,
      tilePositionSet: () => tilePosSet,
    };
    const charMock2 = <any>{
      ...createCharMock("player2"),
      getTilePos: () => ({ position: { x: 2, y: 2 }, layer: "someLayer" }),
      getNextTilePos: () => ({ position: { x: 2, y: 2 }, layer: "someLayer" }),
    };
    charBlockCache.addCharacter(charMock1);
    charBlockCache.addCharacter(charMock2);
    charBlockCache.removeCharacter(charMock1);

    expect(positionChangeStartedSub.unsubscribe).toHaveBeenCalled();
    expect(positionChangeFinishedSub.unsubscribe).toHaveBeenCalled();
    expect(tilePosChangedSub.unsubscribe).toHaveBeenCalled();
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(0, 1), "someLayer")
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(1, 1), "someLayer")
    ).toBe(false);
  });

  it("should remove both positions of a walking char", () => {
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
      getTilePos: () => ({ position: { x: 0, y: 1 }, layer: "someLayer" }),
      getNextTilePos: () => ({ position: { x: 1, y: 1 }, layer: "someLayer" }),
      positionChangeStarted: () => positionChangeStarted,
      positionChangeFinished: () => positionChangeFinished,
    };
    charBlockCache.addCharacter(charMock1);
    charBlockCache.removeCharacter(charMock1);

    expect(positionChangeStartedSub.unsubscribe).toHaveBeenCalled();
    expect(positionChangeFinishedSub.unsubscribe).toHaveBeenCalled();
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(0, 1), "someLayer")
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(1, 1), "someLayer")
    ).toBe(false);
  });

  function createCharMock(id = "player"): GridCharacter {
    return <any>{
      getId: () => id,
      isBlockingTile: () => false,
      getTilePos: () => ({ position: { x: 1, y: 1 }, layer: "someLayer" }),
      getNextTilePos: () => ({ position: { x: 1, y: 1 }, layer: "someLayer" }),
      positionChangeStarted: () => of([]),
      positionChangeFinished: () => of([]),
      collidesWithTiles: () => true,
      tilePositionSet: () => of([]),
    };
  }

  function createMockConf(): Concrete<GridEngineConfig> {
    return {
      characters: [],
      collisionTilePropertyName: "ge_collide",
      numberOfDirections: NumberOfDirections.FOUR,
      characterCollisionStrategy: CollisionStrategy.BLOCK_TWO_TILES,
      layerOverlay: false,
    };
  }
});
