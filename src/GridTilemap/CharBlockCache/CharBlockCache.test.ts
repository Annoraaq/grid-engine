import { CollisionStrategy } from "./../../Collisions/CollisionStrategy";
import { NumberOfDirections } from "./../../Direction/Direction";
import { GlobalConfig } from "./../../GlobalConfig/GlobalConfig";
import { NEVER, of, Subject } from "rxjs";
import {
  GridCharacter,
  PositionChange,
} from "../../GridCharacter/GridCharacter";
import { Vector2 } from "../../Utils/Vector2/Vector2";
import { CharBlockCache } from "./CharBlockCache";
import { GridEngineConfig } from "../../GridEngine";
import { Concrete } from "../../Utils/TypeUtils";
import { LayerPosition } from "../../Pathfinding/ShortestPathAlgorithm";
describe("CharBlockCache", () => {
  let charBlockCache: CharBlockCache;

  beforeEach(() => {
    charBlockCache = new CharBlockCache();
  });

  it("should detect blocking char after adding", () => {
    const char1Mock = <any>{
      ...createCharMock("player1"),
      getTilePos: () => ({ position: { x: 3, y: 3 }, layer: "someLayer" }),
      getNextTilePos: () => ({
        position: { x: 4, y: 3 },
        layer: "enterLayer",
      }),
    };

    charBlockCache.addCharacter(char1Mock);
    const hasBlockingCharOnOldPos = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosTileWidth = charBlockCache.isCharBlockingAt(
      new Vector2(7, 4),
      "someLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosOtherLayer = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "otherLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosOtherCGroup = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      ["unknownCGroup"]
    );
    const hasBlockingCharOnOldPosNoCGroup = charBlockCache.isCharBlockingAt(
      new Vector2(3, 3),
      "someLayer",
      []
    );
    const hasBlockingCharOnNextPos = charBlockCache.isCharBlockingAt(
      new Vector2(8, 4),
      "enterLayer",
      ["cGroup1"]
    );
    expect(hasBlockingCharOnOldPos).toBe(true);
    expect(hasBlockingCharOnOldPosTileWidth).toBe(true);
    expect(hasBlockingCharOnOldPosOtherLayer).toBe(false);
    expect(hasBlockingCharOnOldPosOtherCGroup).toBe(false);
    expect(hasBlockingCharOnOldPosNoCGroup).toBe(false);
    expect(hasBlockingCharOnNextPos).toBe(true);
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
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnNextPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4),
        "enterLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnNextPosTileWidth = charBlockCache.isCharBlockingAt(
        new Vector2(7, 5),
        "enterLayer",
        ["cGroup1"]
      );
      expect(hasBlockingCharOnOldPos).toBe(true);
      expect(hasBlockingCharOnNextPos).toBe(true);
      expect(hasBlockingCharOnNextPosTileWidth).toBe(true);
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
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnOldPosTileWidth = charBlockCache.isCharBlockingAt(
        new Vector2(4, 3),
        "someLayer",
        ["cGroup1"]
      );
      expect(hasBlockingCharOnOldPos).toBe(false);
      expect(hasBlockingCharOnOldPosTileWidth).toBe(false);
    });

    it("should unblock nextPos on tile pos change while moving", () => {
      const positionChangeStarted = new Subject<PositionChange>();
      const tilePosSet = new Subject<LayerPosition>();

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
        position: new Vector2(6, 6),
        layer: "someLayer",
      });

      const hasBlockingCharOnNewPos = charBlockCache.isCharBlockingAt(
        new Vector2(6, 6),
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnNewPosTileWidth = charBlockCache.isCharBlockingAt(
        new Vector2(10, 7),
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnNextPos = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4),
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnNextPosTileWidth = charBlockCache.isCharBlockingAt(
        new Vector2(7, 5),
        "someLayer",
        ["cGroup1"]
      );
      expect(hasBlockingCharOnNextPos).toBe(false);
      expect(hasBlockingCharOnNextPosTileWidth).toBe(false);
      expect(hasBlockingCharOnNewPos).toBe(true);
      expect(hasBlockingCharOnNewPosTileWidth).toBe(true);
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
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingCharOnOldPosTileWidth = charBlockCache.isCharBlockingAt(
        new Vector2(7, 4),
        "someLayer",
        ["cGroup1"]
      );
      const hasBlockingChar = charBlockCache.isCharBlockingAt(
        new Vector2(3, 4),
        "enterLayer",
        ["cGroup1"]
      );
      const hasBlockingCharTileWidth = charBlockCache.isCharBlockingAt(
        new Vector2(7, 5),
        "enterLayer",
        ["cGroup1"]
      );
      expect(hasBlockingCharOnOldPos).toBe(false);
      expect(hasBlockingCharOnOldPosTileWidth).toBe(false);
      expect(hasBlockingChar).toBe(true);
      expect(hasBlockingCharTileWidth).toBe(true);
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
      charBlockCache.isCharBlockingAt(new Vector2(3, 3), "someLayer", [
        "cGroup1",
      ])
    ).toBe(true);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(7, 4), "someLayer", [
        "cGroup1",
      ])
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
      "someLayer",
      ["cGroup1"]
    );
    const hasBlockingCharOnOldPosTileWidth = charBlockCache.isCharBlockingAt(
      new Vector2(7, 4),
      "someLayer",
      ["cGroup1"]
    );
    expect(hasBlockingCharOnOldPos).toBe(true);
    expect(hasBlockingCharOnOldPosTileWidth).toBe(true);
  });

  it("should find all characters", () => {
    const charMock1 = <any>{
      ...createCharMock("charMock1"),
      getTilePos: () => ({ position: { x: 0, y: 1 }, layer: "someLayer" }),
    };
    const charMock2 = <any>{
      ...createCharMock("charMock2"),
      getTilePos: () => ({ position: { x: 0, y: 1 }, layer: "someLayer" }),
    };
    const charMockDifferentLayer = <any>{
      ...createCharMock("charMockDifferentLayer"),
      getTilePos: () => ({ position: { x: 0, y: 1 }, layer: "otherLayer" }),
    };

    charBlockCache.addCharacter(charMock1);
    charBlockCache.addCharacter(charMock2);
    charBlockCache.addCharacter(charMockDifferentLayer);
    expect(
      charBlockCache.getCharactersAt(new Vector2(0, 1), "someLayer")
    ).toContain(charMock1);
    expect(
      charBlockCache.getCharactersAt(new Vector2(0, 1), "someLayer")
    ).toContain(charMock2);
    expect(
      charBlockCache.getCharactersAt(new Vector2(0, 1), "otherLayer")
    ).toContain(charMockDifferentLayer);
    expect(
      charBlockCache.getCharactersAt(new Vector2(5, 5), "someLayer").size
    ).toBe(0);
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
      getTilePos: () => ({ position: { x: 10, y: 2 }, layer: "someLayer" }),
      getNextTilePos: () => ({ position: { x: 10, y: 2 }, layer: "someLayer" }),
    };
    charBlockCache.addCharacter(charMock1);
    charBlockCache.addCharacter(charMock2);
    charBlockCache.removeCharacter(charMock1);

    expect(positionChangeStartedSub.unsubscribe).toHaveBeenCalled();
    expect(positionChangeFinishedSub.unsubscribe).toHaveBeenCalled();
    expect(tilePosChangedSub.unsubscribe).toHaveBeenCalled();
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(0, 1), "someLayer", [
        "cGroup1",
      ])
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(4, 2), "someLayer", [
        "cGroup1",
      ])
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(1, 1), "someLayer", [
        "cGroup1",
      ])
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(5, 2), "someLayer", [
        "cGroup1",
      ])
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
      charBlockCache.isCharBlockingAt(new Vector2(0, 1), "someLayer", [
        "cGroup1",
      ])
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(4, 2), "someLayer", [
        "cGroup1",
      ])
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(1, 1), "someLayer", [
        "cGroup1",
      ])
    ).toBe(false);
    expect(
      charBlockCache.isCharBlockingAt(new Vector2(5, 2), "someLayer", [
        "cGroup1",
      ])
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
      tilePositionSet: () => NEVER,
      getCollisionGroups: () => ["cGroup1"],
      getTileWidth: () => 5,
      getTileHeight: () => 2,
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
